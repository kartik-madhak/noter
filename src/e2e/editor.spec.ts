import { test, expect } from '@playwright/test'
import { getStyle } from '~/e2e/utils/styles'

test.describe('editor tests', () => {
  test('editor can type correctly', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    const text = 'Hello World, this is an e2e test'
    await page.keyboard.type(text)
    const textSelector = page.getByText(text)

    const fontSize = await getStyle(textSelector, 'font-size')
    const fontWeight = await getStyle(textSelector, 'font-weight')

    expect(fontSize).toBe('16px')
    expect(fontWeight).toBe('400')
  })

  test('can create headings', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('# This should be a heading')
    const headingSelector = page.getByText('This should be a heading')

    const fontSize = await getStyle(headingSelector, 'font-size')
    const fontWeight = await getStyle(headingSelector, 'font-weight')

    expect(fontWeight).toBe('700')
    expect(fontSize).toBe('24.8px')
  })

  test('can create bold text', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('**This should be bold**')

    const boldSelector = page.getByText('This should be bold')

    const fontWeight = await getStyle(boldSelector, 'font-weight')
    expect(fontWeight).toBe('700')

    await page.keyboard.press('Enter')

    await page.keyboard.type('This should be bold too')
    const boldSelector2 = page.getByText('This should be bold too')

    const fontWeight2 = await getStyle(boldSelector2, 'font-weight')
    expect(fontWeight2).toBe('400')

    await page.keyboard.press('Shift+Home')
    await page.keyboard.press('Control+b')

    const fontWeight3 = await getStyle(boldSelector2, 'font-weight')
    expect(fontWeight3).toBe('700')
  })

  test('can create italic text', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('*This should be italic*')
    const italicSelector = page.getByText('This should be italic')

    const fontStyle = await getStyle(italicSelector, 'font-style')
    expect(fontStyle).toBe('italic')

    await page.keyboard.press('Enter')

    await page.keyboard.type('This should be italic too')
    const italicSelector2 = page.getByText('This should be italic too')

    const fontStyle2 = await getStyle(italicSelector2, 'font-style')
    expect(fontStyle2).toBe('normal')

    await page.keyboard.press('Shift+Home')
    await page.keyboard.press('Control+i')

    const fontStyle3 = await getStyle(italicSelector2, 'font-style')
    expect(fontStyle3).toBe('italic')
  })

  test('can create strikethrough text', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('~~This should be strikethrough~~')
    const strikethroughSelector = page.getByText('This should be strikethrough')

    const textDecoration = await getStyle(
      strikethroughSelector,
      'text-decoration'
    )
    expect(textDecoration).toContain('line-through')

    await page.keyboard.press('Enter')

    await page.keyboard.type('This should be strikethrough too')
    const strikethroughSelector2 = page.getByText(
      'This should be strikethrough too'
    )

    const textDecoration2 = await getStyle(
      strikethroughSelector2,
      'text-decoration'
    )
    expect(textDecoration2).toContain('none')

    await page.keyboard.press('Shift+Home')
    await page.keyboard.press('Control+u')

    const textDecoration3 = await getStyle(
      strikethroughSelector2,
      'text-decoration'
    )
    expect(textDecoration3).toContain('line-through')
  })

  test('can create and check a checklist', async ({ page }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('- [ ] This should be a checklist')
    await page.keyboard.press('Enter')

    await expect(page.getByText('- [ ]')).toHaveCount(2)

    await page.keyboard.type('This must be checked')

    await page.keyboard.press('Control+Enter')

    await expect(page.getByText('- [ ]')).toHaveCount(1)
    await expect(page.getByText('- [x]')).toHaveCount(1)

    await page.keyboard.press('Shift+Enter')
    await page.keyboard.type('This is a new item')

    await expect(page.getByText('- [ ]')).toHaveCount(1)

    await page.keyboard.press('Control+Enter')

    await expect(page.getByText('- [ ]')).toHaveCount(2)
  })

  test('can create and check multiple checklists at the same time', async ({
    page,
  }) => {
    await page.goto('http://localhost:1420')

    await page.click('.cm-editor')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')

    await page.keyboard.type('This is check item 1')
    await page.keyboard.press('Enter')
    await page.keyboard.type('This is check item 2')
    await page.keyboard.press('Enter')
    await page.keyboard.type('This is check item 3')
    await page.keyboard.press('Enter')

    await page.keyboard.press('Shift+Home')
    await page.keyboard.press('Shift+ArrowUp')
    await page.keyboard.press('Shift+ArrowUp')
    await page.keyboard.press('Shift+ArrowUp')

    await page.keyboard.press('Control+Enter')

    await expect(page.getByText('- [ ]')).toHaveCount(3)

    await page.keyboard.press('Control+Enter')

    await expect(page.getByText('- [x]')).toHaveCount(3)
  })
})
