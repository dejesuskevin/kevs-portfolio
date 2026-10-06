import { useState } from 'react'
import { FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { submitContactMessage } from '../services/api'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const nextErrors = {}
    if (form.name.trim().length < 2 || form.name.trim().length > 100) nextErrors.name = 'Please enter 2–100 characters.'
    if (form.email.trim().length > 254 || !/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (form.message.trim().length < 20 || form.message.trim().length > 5000) nextErrors.message = 'Please enter 20–5000 characters.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      return
    }

    setStatus('loading')
    setSubmitError('')
    try {
      await submitContactMessage({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
      setForm(initialForm)
      setStatus('ready')
    } catch (error) {
      setSubmitError(error.message)
      setStatus('error')
    }
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    if (status !== 'idle') setStatus('idle')
    if (submitError) setSubmitError('')
  }

  return (
    <section className="section contact-section container" id="contact" aria-labelledby="contact-title">
      <Reveal>
        <SectionHeading eyebrow="Start a conversation" title="Let’s build something together." copy="Have a project, an idea, or an opportunity in mind? Share a few details and let’s see where it can go." />
      </Reveal>
      <div className="contact-layout">
        <Reveal className="contact-aside">
          <div className="contact-note glass-panel">
            <span className="contact-note-icon"><FiMail aria-hidden="true" /></span>
            <h3>Open to thoughtful work.</h3>
            <p>I&apos;m interested in web development opportunities, collaborative projects, and products with a meaningful purpose.</p>
            <div className="availability"><i className="status-dot" /> Typically replies within 1–2 days</div>
          </div>
          <div className="social-links">
            <a href="https://github.com/dejesuskevin" target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /><span>GitHub<small>github.com/dejesuskevin</small></span><FiArrowUpRight aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/kevin-de-jesus-607a72295/?isSelfProfile=true" target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /><span>LinkedIn<small>Kevin De Jesus</small></span><FiArrowUpRight aria-hidden="true" /></a>
            <a href="mailto:dejesus.kevinkevin2004@gmail.com"><FiMail aria-hidden="true" /><span>Email<small>dejesus.kevinkevin2004@gmail.com</small></span><FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </Reveal>

        <Reveal className="contact-form-wrap glass-panel" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <label className={errors.name ? 'has-error' : ''}>
                <span>Name</span>
                <input name="name" value={form.name} onChange={updateField} placeholder="Your name" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <small id="name-error" role="alert">{errors.name}</small>}
              </label>
              <label className={errors.email ? 'has-error' : ''}>
                <span>Email</span>
                <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <small id="email-error" role="alert">{errors.email}</small>}
              </label>
            </div>
            <label className={errors.message ? 'has-error' : ''}>
              <span>Message</span>
              <textarea name="message" rows="6" value={form.message} onChange={updateField} placeholder="Tell me about your idea, timeline, or the problem you want to solve..." maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
              {errors.message && <small id="message-error" role="alert">{errors.message}</small>}
            </label>
            <div className="form-footer">
              <p>Submitting saves your message to the portfolio database; no email is sent.</p>
              <button className="button button--primary" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? <><span className="spinner" /> Sending…</> : 'Send message'}
                {status !== 'loading' && <FiArrowUpRight aria-hidden="true" />}
              </button>
            </div>
            <div className="form-status" aria-live="polite">
              {status === 'ready' && <p className="status-ready"><FiCheck aria-hidden="true" /> Your message was saved. No email was sent.</p>}
              {status === 'error' && <p className="status-error">{submitError || 'Please correct the highlighted fields and try again.'}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
