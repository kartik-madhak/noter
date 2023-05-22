import { Box } from '@chakra-ui/react'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'

const Sidebar = (): JSX.Element => {
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
