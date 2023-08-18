import { cleanup, render, type RenderResult } from '@testing-library/react'
import { afterEach } from 'vitest'
import { type ReactElement } from 'react'

afterEach(() => {
  cleanup()
})

const customRender = (ui: ReactElement, options = {}): RenderResult =>
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
