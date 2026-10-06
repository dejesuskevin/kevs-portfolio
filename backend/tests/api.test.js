import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import mongoose from 'mongoose'
import app, { app as namedApp } from '../src/server.js'
import ContactMessage from '../src/models/ContactMessage.js'
import Project from '../src/models/Project.js'

let server
let baseUrl
const originalMongoUri = process.env.MONGODB_URI

before(async () => {
  process.env.MONGODB_URI = ''
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  if (originalMongoUri === undefined) delete process.env.MONGODB_URI
  else process.env.MONGODB_URI = originalMongoUri
  mongoose.connection.readyState = 0
  await new Promise((resolve) => server.close(resolve))
})

test('Vercel entry point exports the Express app', () => {
  assert.equal(app, namedApp)
  assert.equal(typeof app, 'function')
})

test('requests share one on-demand MongoDB connection', async () => {
  const originalConnect = mongoose.connect
  let attempts = 0
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
  mongoose.connect = async () => {
    attempts += 1
    await new Promise((resolve) => setTimeout(resolve, 10))
    mongoose.connection.readyState = 1
  }

  try {
    const responses = await Promise.all([
      fetch(`${baseUrl}/api/health`),
      fetch(`${baseUrl}/api/health`),
    ])
    assert.deepEqual(responses.map((response) => response.status), [200, 200])
    assert.equal(attempts, 1)
  } finally {
    mongoose.connect = originalConnect
    mongoose.connection.readyState = 0
    process.env.MONGODB_URI = ''
  }
})

test('health responds when a MongoDB connection stalls', async () => {
  const originalConnect = mongoose.connect
  let releaseConnection
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
  mongoose.connect = () => new Promise((resolve) => { releaseConnection = resolve })

  try {
    const response = await fetch(`${baseUrl}/api/health`)
    assert.equal(response.status, 503)
    assert.equal((await response.json()).database, 'disconnected')
  } finally {
    releaseConnection?.()
    await new Promise((resolve) => setImmediate(resolve))
    mongoose.connect = originalConnect
    process.env.MONGODB_URI = ''
  }
})

test('MongoDB connection failures return an API response instead of crashing', async () => {
  const originalConnect = mongoose.connect
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
  mongoose.connect = async () => { throw new Error('Simulated connection failure') }

  try {
    const response = await fetch(`${baseUrl}/api/health`)
    assert.equal(response.status, 503)
    assert.equal((await response.json()).api, 'available')
  } finally {
    mongoose.connect = originalConnect
    process.env.MONGODB_URI = ''
  }
})

test('health reports a running API and unavailable database without credentials', async () => {
  const response = await fetch(`${baseUrl}/api/health`, { headers: { origin: 'http://localhost:5173' } })
  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), {
    success: false,
    message: 'API is running; database unavailable',
    api: 'available',
    database: 'disconnected',
  })
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173')
  assert.ok(response.headers.get('x-content-type-options'))
})

test('invalid contact data is rejected before database access', async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'A', email: 'bad', message: 'short' }),
  })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).success, false)
})

test('models enforce required fields and contact status values', async () => {
  const contact = new ContactMessage({ name: 'Valid Name', email: 'valid@example.com', message: 'A sufficiently detailed contact message.' })
  await contact.validate()
  assert.equal(contact.status, 'new')
  await assert.rejects(new ContactMessage({ name: 'A', email: 'invalid', message: 'short', status: 'other' }).validate())
  await assert.rejects(new Project({ title: '', slug: 'invalid slug', description: '' }).validate())
})

test('database requests report an unavailable database clearly', async () => {
  const [projects, contact] = await Promise.all([
    fetch(`${baseUrl}/api/projects`),
    fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Example Visitor', email: 'visitor@example.com', message: 'Hello, I would like to discuss a project.' }),
    }),
  ])
  assert.equal(projects.status, 503)
  assert.equal(contact.status, 503)
  assert.match((await projects.json()).message, /Database unavailable/)
  assert.match((await contact.json()).message, /Database unavailable/)
})

test('project reads and contact storage return the documented responses when connected', async () => {
  const originalFind = Project.find
  const originalFindOne = Project.findOne
  const originalCreate = ContactMessage.create
  let storedMessage
  const project = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Real Project',
    slug: 'real-project',
    description: 'A portfolio project',
    technologies: ['React'],
    features: ['Accessible UI'],
  }

  mongoose.connection.readyState = 1
  Project.find = () => ({ sort: () => ({ lean: async () => [project] }) })
  Project.findOne = () => ({ lean: async () => project })
  ContactMessage.create = async (message) => { storedMessage = message }

  try {
    const health = await fetch(`${baseUrl}/api/health`)
    assert.equal(health.status, 200)
    assert.deepEqual(await health.json(), {
      success: true,
      message: 'API and database are running',
      api: 'available',
      database: 'connected',
    })

    const list = await fetch(`${baseUrl}/api/projects`)
    assert.equal(list.status, 200)
    assert.equal((await list.json()).data[0].id, 'real-project')

    const single = await fetch(`${baseUrl}/api/projects/real-project`)
    assert.equal(single.status, 200)
    assert.deepEqual((await single.json()).data.details.features, ['Accessible UI'])

    Project.findOne = () => ({ lean: async () => null })
    const missing = await fetch(`${baseUrl}/api/projects/missing-project`)
    assert.equal(missing.status, 404)
    assert.deepEqual(await missing.json(), { success: false, message: 'Project not found' })

    const contact = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: ' Example Visitor ', email: 'VISITOR@example.com', message: 'Hello, I would like to discuss a project.' }),
    })
    assert.equal(contact.status, 201)
    assert.deepEqual(await contact.json(), { success: true, message: 'Message sent successfully.' })
    assert.equal(storedMessage.name, 'Example Visitor')
    assert.equal(storedMessage.email, 'visitor@example.com')
  } finally {
    Project.find = originalFind
    Project.findOne = originalFindOne
    ContactMessage.create = originalCreate
    mongoose.connection.readyState = 0
  }
})
