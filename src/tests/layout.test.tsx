import { beforeEach, describe, it, vi } from 'vitest'
import { render, screen } from '~/utils/test-utils'
import Root from '~/Root'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import { fireEvent } from '@testing-library/react'
import { ThemeName } from '~/config/allThemes'

vi.mock('~/hooks/useCustomTheme/useCustomTheme')

describe('Describe the Layout', () => {
  let themeName: string = ''

  beforeEach((context) => {
    useCustomTheme.mockReturnValue({
      theme: {
        name: 'any_theme',
      },
      setThemeName: (_themeName: string) => {
        themeName = _themeName
      },
    })
    context.component = render(<Root />)
  })

  it('should have a navbar', async ({ expect, component }) => {
    const navbar = component.getByTestId('navbar')
    expect(navbar).toBeDefined()
    // Testing the content of the navbar
    expect(await screen.findByText('Menu')).toBeDefined()
    expect(await screen.findByText('any_theme')).toBeDefined()
    expect(await screen.findByText('Green')).toBeDefined()

    // Testing the theme change dropdown menu
    fireEvent.click(screen.getByText('any_theme'))
    expect(await screen.findByText(ThemeName.Default)).toBeDefined()

    // Testing the theme change click event
    fireEvent.click(screen.getByText(ThemeName.Default))
    expect(themeName).toBe(ThemeName.Default)

    // TODO: simulate the state change event
  })

  it('should have a sidebar', ({ expect, component }) => {
    const sidebar = component.getByTestId('sidebar')
    expect(sidebar).toBeTruthy()
  })
})
