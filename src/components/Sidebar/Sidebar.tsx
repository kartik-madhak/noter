import { Box } from '@chakra-ui/react'
import { useColors } from '~/hooks/useColors/useColors'

const Sidebar = (): JSX.Element => {
  const {
    theme: { sidebarColor },
  } = useColors()

  return (
    <Box w="100%" h="100%" background={sidebarColor}>
      Sidebar
    </Box>
  )
}

export default Sidebar
