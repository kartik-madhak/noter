import { cleanup, render, type RenderResult } from '@testing-library/react'
import { afterEach, type ExpectStatic } from 'vitest'

afterEach(() => {
  cleanup()
})

const customRender = (ui: JSX.Element, options = {}): RenderResult =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// eslint-disable-next-line import/export
export { customRender as render }

declare module 'vitest' {
  export interface TestContext {
    component: RenderResult
    expect: ExpectStatic
  }
}
