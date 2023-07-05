import { beforeEach, describe, it, vi } from 'vitest'
import { render, screen } from '~/utils/test-utils'
import Root from '~/Root'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'

vi.mock('~/hooks/useCustomTheme/useCustomTheme')

describe('Describe the Layout', () => {
  let themeChanged: boolean = false

  beforeEach((context) => {
    useCustomTheme.mockReturnValue({
      theme: {
        name: 'any_theme',
      },
      setThemeName: () => {
        themeChanged = true
      },
    })
    context.component = render(<Root />)
  })

  it('should have a navbar', async ({ expect, component }) => {
    const navbar = component.getByTestId('navbar')
    expect(navbar).toBeDefined()
    expect(await screen.findByText('Menu')).toBeDefined()
    expect(await screen.findByText('any_theme')).toBeDefined()
    expect(await screen.findByText('Green')).toBeDefined()
  })

  it('should have a sidebar', ({ expect, component }) => {
    const sidebar = component.getByTestId('sidebar')
    expect(sidebar).toBeTruthy()
  })
})
