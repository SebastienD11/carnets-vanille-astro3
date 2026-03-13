import { test, expect } from '@playwright/test'

const EBOOK_URL = '/ebook-saint-malo/'

test.describe('Ebook Saint-Malo product page', () => {
  test('page loads and displays product info', async ({ page }) => {
    await page.goto(EBOOK_URL)

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Saint-Malo')
  })

  test('buy button is visible and triggers Stripe checkout', async ({ page }) => {
    await page.goto(EBOOK_URL)

    const buyButton = page.locator('[create-checkout]')
    await expect(buyButton).toBeVisible()
    await expect(buyButton).toContainText('Acheter')

    const checkoutRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/stripe/checkout') && req.method() === 'POST'
    })

    await page.route('**/api/stripe/checkout', async (route) => {
      const request = route.request()
      const body = request.postDataJSON()

      expect(body).toHaveProperty('stripePriceId')
      expect(body).toHaveProperty('page')
      expect(body).toHaveProperty('mlGroup')
      expect(body.customPrice).toBeNull()

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'https://checkout.stripe.com/fake-session' }),
      })
    })

    await buyButton.click()

    const req = await checkoutRequest
    expect(req.method()).toBe('POST')

    const payload = req.postDataJSON()
    expect(payload.stripePriceId).toBeTruthy()
    expect(payload.customPrice).toBeNull()
  })

  test('no price slider is present (fixed price product)', async ({ page }) => {
    await page.goto(EBOOK_URL)

    await expect(page.locator('[price-slider]')).not.toBeAttached()
  })
})
