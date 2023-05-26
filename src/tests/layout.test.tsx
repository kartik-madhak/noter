import { beforeEach, describe, it } from 'vitest'
import Root from '~/Root'
import { render } from '~/utils/test-utils'

describe.concurrent('Describe the Layout', () => {
  beforeEach((context) => {
    context.component = render(<Root />)
  })

  it('should have a navbar', ({ expect, component }) => {
    const navbar = component.getByTestId('navbar')
    expect(navbar).toBeTruthy()
  })

  it('should have a sidebar', ({ expect, component }) => {
    const sidebar = component.getByTestId('sidebar')
    expect(sidebar).toBeTruthy()
  })
})
