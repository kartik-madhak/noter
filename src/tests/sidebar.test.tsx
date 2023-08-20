import { beforeEach, describe, it } from 'vitest'
import { render, screen } from '~/utils/test-utils'
import Sidebar from '~/components/Sidebar/Sidebar'

describe('Test the Sidebar', () => {
  beforeEach(() => {
    render(<Sidebar />)
  })

  it('should have a sidebar', ({ expect }) => {
    expect(screen.getByText('Sidebar')).toBeTruthy()
  })
})
