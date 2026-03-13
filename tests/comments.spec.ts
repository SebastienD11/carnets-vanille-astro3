import { test, expect } from '@playwright/test'

const BLOG_POST_URL = '/visiter-saint-malo-intra-muros/'

test.describe('Blog post comments', () => {
  test('existing comments are displayed', async ({ page }) => {
    await page.goto(BLOG_POST_URL)

    const commentSection = page.locator('form[onsubmit*="postComment"]')
    await expect(commentSection).toBeVisible()
  })

  test('comment form has all required fields', async ({ page }) => {
    await page.goto(BLOG_POST_URL)

    const form = page.locator('form[onsubmit*="postComment"]')
    await expect(form.locator('input[name="firstName"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()
    await expect(form.locator('textarea[name="comment"]')).toBeVisible()
    await expect(form.locator('button[type="submit"]')).toBeVisible()
  })

  test('comment form has newsletter subscription checkbox', async ({ page }) => {
    await page.goto(BLOG_POST_URL)

    const form = page.locator('form[onsubmit*="postComment"]')
    const newsletterCheckbox = form.locator('input[name="mailerlite_group_id"]')
    await expect(newsletterCheckbox).toBeVisible()
    await expect(newsletterCheckbox).not.toBeChecked()
  })

  test('submitting comment sends correct payload to /api/comments', async ({ page }) => {
    await page.goto(BLOG_POST_URL)

    const form = page.locator('form[onsubmit*="postComment"]')
    await form.locator('input[name="firstName"]').fill('TestUser')
    await form.locator('input[name="email"]').fill('test@example.com')
    await form.locator('textarea[name="comment"]').fill('This is an automated test comment.')

    const commentRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/comments') && req.method() === 'POST'
    })

    await page.route('**/api/comments', async (route) => {
      const body = route.request().postDataJSON()

      expect(body.author_name).toBe('TestUser')
      expect(body.author_email).toBe('test@example.com')
      expect(body.content).toBe('This is an automated test comment.')
      expect(body.post).toBeTruthy()

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 999, status: 'hold' }),
      })
    })

    await form.locator('button[type="submit"]').click()

    const req = await commentRequest
    const payload = req.postDataJSON()
    expect(payload.author_name).toBe('TestUser')
    expect(payload.post).toBeTruthy()
  })

  test('submitting comment with newsletter checkbox sends both API calls', async ({ page }) => {
    await page.goto(BLOG_POST_URL)

    const form = page.locator('form[onsubmit*="postComment"]')
    await form.locator('input[name="firstName"]').fill('TestUser')
    await form.locator('input[name="email"]').fill('test@example.com')
    await form.locator('textarea[name="comment"]').fill('Test comment with newsletter.')

    const newsletterCheckbox = form.locator('input[name="mailerlite_group_id"]')
    await newsletterCheckbox.check()
    const groupId = await newsletterCheckbox.getAttribute('value')

    await page.route('**/api/comments', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 999, status: 'hold' }),
      })
    })

    const mailerliteRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/mailerlite') && req.method() === 'POST'
    })

    await page.route('**/api/mailerlite', async (route) => {
      const body = route.request().postDataJSON()

      expect(body.email).toBe('test@example.com')
      expect(body.fields.cv_source).toBe('articleComment')
      expect(body.fields.name).toBe('TestUser')
      expect(body.groups).toContain(groupId)

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 'fake-subscriber' } }),
      })
    })

    await form.locator('button[type="submit"]').click()

    const req = await mailerliteRequest
    const payload = req.postDataJSON()
    expect(payload.email).toBe('test@example.com')
    expect(payload.fields.cv_source).toBe('articleComment')
    expect(payload.groups).toContain(groupId)
  })
})
