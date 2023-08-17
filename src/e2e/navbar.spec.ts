import { test, expect } from '@playwright/test'

test.describe('navbar tests', () => {
  test('main menu item is clickable', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.getByRole('button', { name: /menu/i }).click()
    await page.getByRole('menuitemradio', { name: 'New File' }).click()
  })

  test('theme changer works correctly', async ({ page }) => {
    await page.goto('http://localhost:1420')

    expect(await page.getAttribute('html', 'data-theme')).toBe('dark')

    await page.getByRole('button', { name: /Default/i }).click()
    await page.getByRole('menuitemradio', { name: 'Lofi' }).click()

    expect(await page.getAttribute('html', 'data-theme')).toBe('light')
  })

  test('color changer works correctly', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.getByRole('button', { name: /Green/i }).click()
    await page.getByRole('menuitemradio', { name: 'Blue' }).click()
    await page.getByRole('button', { name: /Blue/i }).click()

    // TODO: remove this timeout. It is added because the menu close is not instant
    await page.waitForTimeout(1000)

    //  make sure the menu has been closed
    await expect(page.getByRole('menuitemradio')).not.toBeVisible()
  })
})
