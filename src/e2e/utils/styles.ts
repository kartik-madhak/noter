import { type Locator } from '@playwright/test'

/**
 * Retrieve a computed style for an element.
 *
 * @function getStyle
 * @async
 * @param locator {Locator} The Playwright locator to evaluate (see: https://playwright.dev/docs/locators)
 * @param property {string} The CSS property for the style to retrieve
 * @returns Promise<string> The style value
 */
export const getStyle = async (
  locator: Locator,
  property: string
): Promise<string> => {
  return await locator.evaluate(
    (el, property) => window.getComputedStyle(el).getPropertyValue(property),
    property
  )
}
