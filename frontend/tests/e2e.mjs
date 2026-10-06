import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const baseURL = process.env.E2E_BASE_URL || 'http://127.0.0.1:5173'
const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const resultsDirectory = new URL('../test-results/', import.meta.url)

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function assertVisible(locator, message) {
  await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
  assert(await locator.isVisible(), message)
}

const browser = await chromium.launch({ executablePath, headless: true })
const failures = []
const checks = []

try {
  await mkdir(resultsDirectory, { recursive: true })

  const viewports = [
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'tablet-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-430', width: 430, height: 932 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-375', width: 375, height: 812 },
  ]

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    const runtimeErrors = []
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`)
    })
    page.on('pageerror', (error) => runtimeErrors.push(`page: ${error.message}`))

    try {
      await page.goto(baseURL, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await assertVisible(page.locator('#hero-title'), `${viewport.name}: hero heading is not visible`)
      const resume = page.locator('#resume')
      await assertVisible(resume.locator('#resume-title'), `${viewport.name}: resume heading is not visible`)
      await assertVisible(resume.getByRole('heading', { name: 'Professional Summary' }), `${viewport.name}: resume summary is not visible`)
      await assertVisible(resume.getByRole('heading', { name: 'Certifications & Training' }), `${viewport.name}: certifications section is not visible`)
      await assertVisible(resume.getByRole('heading', { name: 'Education' }), `${viewport.name}: resume education is not visible`)
      assert(await page.locator('#skills').count() === 0, `${viewport.name}: old skills section is still present`)
      await assertVisible(page.getByRole('heading', { name: /Products made to solve real problems/i }), `${viewport.name}: projects heading is not visible`)

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      assert(overflow.scrollWidth <= overflow.clientWidth + 1, `${viewport.name}: horizontal overflow (${overflow.scrollWidth}px > ${overflow.clientWidth}px)`)

      const desktopLinksVisible = await page.locator('.nav-links').isVisible()
      assert(desktopLinksVisible === (viewport.width > 900), `${viewport.name}: responsive navigation visibility is incorrect`)
      assert(runtimeErrors.length === 0, `${viewport.name}: runtime errors: ${runtimeErrors.join(' | ')}`)

      if (viewport.name === 'desktop-1440' || viewport.name === 'mobile-390') {
        await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}-hero.png`, resultsDirectory)) })
        if (viewport.name === 'mobile-390') {
          await page.getByRole('button', { name: 'Open navigation menu' }).click()
          const mobileSidebar = page.getByRole('dialog', { name: 'Site navigation' })
          await assertVisible(mobileSidebar, 'mobile-390: sidebar does not open')
          await page.waitForTimeout(500)
          const mobileSidebarBox = await mobileSidebar.boundingBox()
          assert(mobileSidebarBox?.width > viewport.width * 0.6, 'mobile-390: sidebar does not expand to a usable width')
          await page.screenshot({ path: fileURLToPath(new URL('mobile-390-sidebar.png', resultsDirectory)) })
          await page.keyboard.press('Escape')
          const mobileCard = page.getByRole('button', { name: 'View MindCare case study' })
          await mobileCard.scrollIntoViewIfNeeded()
          await mobileCard.click()
          const mobileDialog = page.getByRole('dialog', { name: 'MindCare' })
          await assertVisible(mobileDialog, 'mobile-390: case study does not open')
          await page.waitForTimeout(500)
          const mobileDialogOverflow = await mobileDialog.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)
          assert(mobileDialogOverflow, 'mobile-390: project detail has horizontal overflow')
          await page.screenshot({ path: fileURLToPath(new URL('mobile-390-case-study.png', resultsDirectory)) })
          await mobileDialog.getByRole('button', { name: 'Back to projects' }).click()
        }
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.reload({ waitUntil: 'networkidle' })
        await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}.png`, resultsDirectory)), fullPage: true })
      }

      checks.push(`${viewport.name}: layout, content, overflow, and console`)
    } catch (error) {
      failures.push(error.message)
    } finally {
      await context.close()
    }
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const runtimeErrors = []
  page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(message.text()) })
  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  await page.goto(baseURL, { waitUntil: 'networkidle' })

  try {
    const developerId = page.getByRole('button', { name: /Interactive developer ID card/ })
    const idStart = await developerId.boundingBox()
    assert(idStart, 'Interactive developer ID card is not measurable')
    await page.mouse.move(idStart.x + idStart.width / 2, idStart.y + idStart.height / 2)
    await page.mouse.down()
    await page.mouse.move(idStart.x + idStart.width / 2 + 58, idStart.y + idStart.height / 2 + 16, { steps: 6 })
    const idDragged = await developerId.boundingBox()
    assert(idDragged && idDragged.x > idStart.x + 20, 'Developer ID does not follow pointer dragging')
    await page.mouse.up()
    await page.waitForTimeout(1500)
    const idSettled = await developerId.boundingBox()
    assert(idSettled && Math.abs(idSettled.x - idStart.x) < 10, 'Developer ID does not spring back after release')
    await developerId.focus()
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(80)
    const idKeyboardMoved = await developerId.boundingBox()
    assert(idKeyboardMoved && idKeyboardMoved.x > idSettled.x + 6, 'Developer ID does not respond to keyboard controls')
    await page.waitForTimeout(700)
    checks.push('developer ID: pointer drag, spring return, and keyboard control')

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' })
    await menuButton.click()
    const desktopSidebar = page.getByRole('dialog', { name: 'Site navigation' })
    await assertVisible(desktopSidebar, 'Sidebar does not open')
    await page.waitForTimeout(500)
    const desktopSidebarBox = await desktopSidebar.boundingBox()
    assert(desktopSidebarBox?.width >= 400, 'Sidebar does not reach its intended desktop width')
    await page.screenshot({ path: fileURLToPath(new URL('desktop-1440-sidebar.png', resultsDirectory)) })
    assert(await menuButton.getAttribute('aria-expanded') === 'true', 'Menu does not expose expanded state')
    await page.keyboard.press('Escape')
    await page.getByRole('dialog', { name: 'Site navigation' }).waitFor({ state: 'detached' })
    assert(await menuButton.evaluate((element) => element === document.activeElement), 'Focus does not return to the menu trigger after Escape')

    await menuButton.click()
    await page.locator('.sidebar-scrim').click({ position: { x: 1200, y: 400 } })
    await page.getByRole('dialog', { name: 'Site navigation' }).waitFor({ state: 'detached' })

    await menuButton.click()
    await page.locator('.sidebar-nav a[href="#resume"]').click()
    await page.getByRole('dialog', { name: 'Site navigation' }).waitFor({ state: 'detached' })
    assert(page.url().endsWith('#resume'), 'Sidebar link does not navigate to its section')
    checks.push('sidebar: open, Escape, outside click, link close, focus return')

    for (const projectName of ['MindCare', 'Lakbay', 'IskolarVault']) {
      const card = page.getByRole('button', { name: `View ${projectName} case study` })
      await card.scrollIntoViewIfNeeded()
      await card.click()
      const dialog = page.getByRole('dialog', { name: projectName })
      await assertVisible(dialog, `${projectName}: case study does not open`)
      await assertVisible(dialog.getByRole('heading', { name: projectName }), `${projectName}: detail heading missing`)
      await assertVisible(dialog.getByRole('heading', { name: 'The problem' }), `${projectName}: problem section missing`)
      assert(await page.locator('body').evaluate((element) => element.style.overflow === 'hidden'), `${projectName}: background scroll is not locked`)
      if (projectName === 'MindCare') {
        await page.waitForTimeout(500)
        await page.screenshot({ path: fileURLToPath(new URL('desktop-1440-case-study.png', resultsDirectory)) })
      }
      await dialog.getByRole('button', { name: 'Back to projects' }).click()
      await dialog.waitFor({ state: 'detached' })
      assert(await card.evaluate((element) => element === document.activeElement), `${projectName}: focus does not return to its project card`)
    }
    checks.push('project details: all cards open, required content, scroll lock, close, focus return')

    let submittedContact = null
    let contactShouldFail = false
    await page.route('**/api/contact', async (route) => {
      const headers = {
        'access-control-allow-origin': new URL(baseURL).origin,
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
      }
      if (route.request().method() === 'OPTIONS') {
        await route.fulfill({ status: 204, headers })
        return
      }
      submittedContact = route.request().postDataJSON()
      await route.fulfill({
        status: contactShouldFail ? 200 : 201,
        headers: { ...headers, 'content-type': 'application/json' },
        body: JSON.stringify(contactShouldFail
          ? { success: false, message: 'Database unavailable. Please try again later.' }
          : { success: true, message: 'Message sent successfully.' }),
      })
    })

    const form = page.locator('.contact-form')
    await form.scrollIntoViewIfNeeded()
    await form.getByRole('button', { name: 'Send message' }).click()
    await assertVisible(form.getByText('Please correct the highlighted fields'), 'Contact form error state is missing')
    assert(await form.locator('input[name="name"]').getAttribute('aria-invalid') === 'true', 'Invalid input is not announced')
    await form.locator('input[name="name"]').fill('Portfolio Reviewer')
    await form.locator('input[name="email"]').fill('reviewer@example.com')
    await form.locator('textarea[name="message"]').fill('This is a contact API test for the portfolio contact form experience.')
    await form.getByRole('button', { name: 'Send message' }).click()
    await assertVisible(form.getByText(/Your message was saved/), 'Contact form success state is missing')
    assert(submittedContact?.name === 'Portfolio Reviewer' && submittedContact?.email === 'reviewer@example.com', 'Contact form did not submit the expected API payload')
    await assertVisible(form.getByText(/no email is sent/i), 'Contact form does not disclose that no email is sent')
    contactShouldFail = true
    await form.locator('input[name="name"]').fill('Portfolio Reviewer')
    await form.locator('input[name="email"]').fill('reviewer@example.com')
    await form.locator('textarea[name="message"]').fill('This is another contact API test that should show an error.')
    await form.getByRole('button', { name: 'Send message' }).click()
    await assertVisible(form.getByText(/Database unavailable/), 'Contact form API error state is missing')
    checks.push('contact: validation, API submission, success, and server error states')

    assert(runtimeErrors.length === 0, `Interaction test runtime errors: ${runtimeErrors.join(' | ')}`)
    checks.push('interaction run: no console or page errors')
  } catch (error) {
    failures.push(error.message)
  } finally {
    await context.close()
  }

  const reducedContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })
  const reducedPage = await reducedContext.newPage()
  try {
    await reducedPage.goto(baseURL, { waitUntil: 'networkidle' })
    const durations = await reducedPage.locator('.project-card').first().evaluate((element) => ({
      transition: getComputedStyle(element).transitionDuration,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      idAnimation: getComputedStyle(document.querySelector('.developer-id-rig')).animationName,
    }))
    assert(parseFloat(durations.transition) <= 0.001, `Reduced motion transition is not minimized (${durations.transition})`)
    assert(durations.scrollBehavior === 'auto', 'Reduced motion does not disable smooth scrolling')
    assert(durations.idAnimation === 'none', 'Reduced motion does not disable the developer ID idle sway')
    checks.push('reduced motion: transitions and smooth scrolling minimized')
  } catch (error) {
    failures.push(error.message)
  } finally {
    await reducedContext.close()
  }
} finally {
  await browser.close()
}

if (failures.length) {
  console.error(`E2E verification failed:\n- ${failures.join('\n- ')}`)
  process.exitCode = 1
} else {
  console.log(`E2E verification passed (${checks.length} checks):\n- ${checks.join('\n- ')}`)
}
