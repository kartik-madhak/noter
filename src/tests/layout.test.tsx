import { describe, it } from 'vitest'
import Root from '~/Root'
import { render } from '~/utils/test-utils'

describe.concurrent('Describe the Layout', () => {
  it('should have a navbar', ({ expect }) => {
    const app = render(<Root />)
    expect(app.getByText('Menu')).toBeTruthy()
  })
})
