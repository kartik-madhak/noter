import { Box } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import { useCustomTheme } from '~/hooks/useCustomTheme'

const Sidebar = (): ReactElement => {
  const {
    theme: { sidebarColor },
  } = useCustomTheme()

  return (
    <Box w="100%" h="100%" background={sidebarColor}>
      Sidebar
    </Box>
  )
}

export default Sidebar
