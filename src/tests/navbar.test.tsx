import { beforeEach, describe, it, vi } from 'vitest'
import { render, screen } from '~/utils/test-utils'
import { fireEvent } from '@testing-library/react'
import Navbar from '~/components/Navbar/Navbar'

vi.mock('~/hooks/useCustomTheme/useCustomTheme', () => ({
  useCustomTheme: () => ({
    theme: {
      name: 'any_theme',
    },
    setThemeName: () => {},
  }),
}))

describe('Test the Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('should have three menus', ({ expect }) => {
    expect(screen.getByText('Menu')).toBeDefined()
    expect(screen.getByText('any_theme')).toBeDefined()
    expect(screen.getByText('Green')).toBeDefined()
  })

  it('should have the contents of the Main menu dropdown', ({ expect }) => {
    expect(screen.queryByText('New File')).toBeNull()
    fireEvent.click(screen.getByTestId('menu-button-Menu'))
    expect(screen.queryByText('New File')).not.toBeNull()
  })

  it('should have the contents of the Theme menu dropdown', ({ expect }) => {
    expect(screen.queryByText('Default')).toBeNull()
    fireEvent.click(screen.getByTestId('menu-button-any_theme'))
    expect(screen.queryByText('Default')).not.toBeNull()
  })

  it('should have the contents of the Color menu dropdown', ({ expect }) => {
    expect(screen.queryByText('Red')).toBeNull()
    fireEvent.click(screen.getByTestId('menu-button-Green'))
    expect(screen.queryByText('Red')).not.toBeNull()
  })
})
