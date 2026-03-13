import { test, expect } from '@playwright/test'

const CARNET_URL = '/carnet-jeux-saint-malo-enfants/'

test.describe('Carnet Enfants product page', () => {
  test('page loads and displays product info', async ({ page }) => {
    await page.goto(CARNET_URL)

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Saint-Malo')
  })

  test('price slider is present and functional', async ({ page }) => {
    await page.goto(CARNET_URL)

    const slider = page.locator('[price-slider]')
    await expect(slider).toBeVisible()
    await expect(slider).toHaveAttribute('min', '0')
    await expect(slider).toHaveAttribute('max', '10')
  })

  test('slider at default value shows buy button and hides download', async ({ page }) => {
    await page.goto(CARNET_URL)

    const slider = page.locator('[price-slider]')
    const sliderValue = await slider.inputValue()

    if (Number(sliderValue) > 0) {
      const buyButton = page.locator('[create-checkout]')
      const downloadButton = page.locator('[download-button]')

      await expect(buyButton).toBeVisible()
      await expect(downloadButton).toBeHidden()
    }
  })

  test('slider at 0 hides buy button and shows download button', async ({ page }) => {
    await page.goto(CARNET_URL)

    const slider = page.locator('[price-slider]')
    await slider.fill('0')
    await slider.dispatchEvent('change')

    const buyButton = page.locator('[create-checkout]')
    const downloadButton = page.locator('[download-button]')

    await expect(buyButton).toBeHidden()
    await expect(downloadButton).toBeVisible()
    await expect(downloadButton).toContainText('Télécharger')
  })

  test('slider at value > 0 triggers Stripe checkout with custom price', async ({ page }) => {
    await page.goto(CARNET_URL)

    const slider = page.locator('[price-slider]')
    await slider.fill('7')
    await slider.dispatchEvent('change')

    const buyButton = page.locator('[create-checkout]')
    await expect(buyButton).toBeVisible()

    const checkoutRequest = page.waitForRequest((req) => {
      return req.url().includes('/api/stripe/checkout') && req.method() === 'POST'
    })

    await page.route('**/api/stripe/checkout', async (route) => {
      const body = route.request().postDataJSON()

      expect(body).toHaveProperty('stripeProductId')
      expect(body.customPrice).toBe(7)
      expect(body).toHaveProperty('mlGroup')

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'https://checkout.stripe.com/fake-session' }),
      })
    })

    await buyButton.click()

    const req = await checkoutRequest
    const payload = req.postDataJSON()
    expect(payload.customPrice).toBe(7)
  })
})
