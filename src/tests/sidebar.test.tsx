import { beforeEach, describe, it, vitest } from 'vitest'
import { render, screen } from '~/utils/test-utils'
import Sidebar from '~/components/Sidebar/Sidebar'

vitest.mock('@tauri-apps/api/tauri', () => ({
  invoke: async () => [['testFile.md']],
}))

describe.skip('Test the Sidebar', () => {
  beforeEach(() => {
    render(<Sidebar />)
  })

  it('should have a sidebar', async ({ expect }) => {
    expect(
      await screen.findByText('testFile.md', { exact: false })
    ).toBeTruthy()
  })
})
