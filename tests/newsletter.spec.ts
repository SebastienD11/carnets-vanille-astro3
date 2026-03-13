import { test, expect } from '@playwright/test'

const HOME_URL = '/'

const MAILERLITE_GROUPS = {
  saintMalo: '88968404275299938',
  quebec: '88968404285785703',
}

test.describe('Newsletter subscription modal', () => {
  test('newsletter modal opens when toggle is clicked', async ({ page }) => {
    await page.goto(HOME_URL)

    const modal = page.locator('#newsletter-modal')
    await expect(modal).toBeHidden()

    await page.locator('[toggle-newsletter-modal]').first().click()

    await expect(modal).toBeVisible()
  })

  test('newsletter form has required fields and group checkboxes', async ({ page }) => {
    await page.goto(HOME_URL)

    await page.locator('[toggle-newsletter-modal]').first().click()
    const modal = page.locator('#newsletter-modal')
    await expect(modal).toBeVisible()

    const form = modal.locator('form')
    await expect(form.locator('input[name="firstName"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()

    const groupCheckboxes = form.locator('input[name="groups"]')
    await expect(groupCheckboxes).toHaveCount(2)

    await expect(groupCheckboxes.nth(0)).toHaveValue(MAILERLITE_GROUPS.saintMalo)
    await expect(groupCheckboxes.nth(1)).toHaveValue(MAILERLITE_GROUPS.quebec)
  })

  test('submitting with checked groups sends correct payload to /api/mailerlite', async ({
    page,
  }) => {
    await page.goto(HOME_URL)

    await page.locator('[toggle-newsletter-modal]').first().click()
    const modal = page.locator('#newsletter-modal')
    await expect(modal).toBeVisible()

    const form = modal.locator('form')
    await form.locator('input[name="firstName"]').fill('TestUser')
    await form.locator('input[name="email"]').fill('test@example.com')

    const saintMaloCheckbox = form.locator(`input[name="groups"][value="${MAILERLITE_GROUPS.saintMalo}"]`)
    await saintMaloCheckbox.check()

    const mailerliteRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/mailerlite') && req.method() === 'POST'
    })

    await page.route('**/api/mailerlite', async (route) => {
      const body = route.request().postDataJSON()

      expect(body.email).toBe('test@example.com')
      expect(body.fields.name).toBe('TestUser')
      expect(body.fields.cv_source).toBe('newsletterModal')
      expect(body.groups).toContain(MAILERLITE_GROUPS.saintMalo)

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 'fake-subscriber' } }),
      })
    })

    await form.locator('button[type="submit"]').click()

    const req = await mailerliteRequest
    const payload = req.postDataJSON()

    expect(payload.groups).toEqual([MAILERLITE_GROUPS.saintMalo])
  })

  test('submitting with both groups checked sends both group IDs', async ({ page }) => {
    await page.goto(HOME_URL)

    await page.locator('[toggle-newsletter-modal]').first().click()
    const modal = page.locator('#newsletter-modal')
    await expect(modal).toBeVisible()

    const form = modal.locator('form')
    await form.locator('input[name="firstName"]').fill('TestUser')
    await form.locator('input[name="email"]').fill('test@example.com')

    await form.locator(`input[name="groups"][value="${MAILERLITE_GROUPS.saintMalo}"]`).check()
    await form.locator(`input[name="groups"][value="${MAILERLITE_GROUPS.quebec}"]`).check()

    await page.route('**/api/mailerlite', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 'fake-subscriber' } }),
      })
    })

    const mailerliteRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/mailerlite') && req.method() === 'POST'
    })

    await form.locator('button[type="submit"]').click()

    const req = await mailerliteRequest
    const payload = req.postDataJSON()

    expect(payload.groups).toContain(MAILERLITE_GROUPS.saintMalo)
    expect(payload.groups).toContain(MAILERLITE_GROUPS.quebec)
    expect(payload.groups).toHaveLength(2)
  })
})
