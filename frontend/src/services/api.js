const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

async function request(path, options) {
  let response
  try {
    response = await fetch(`${apiBaseUrl}${path}`, options)
  } catch {
    throw new Error('Unable to reach the portfolio API. Please try again later.')
  }

  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'The portfolio API could not process your request.')
  }
  return result
}

export async function getProjects() {
  const result = await request('/projects')
  return result.data
}

export async function submitContactMessage(message) {
  return request('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}
