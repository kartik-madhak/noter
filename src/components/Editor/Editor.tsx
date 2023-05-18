import { Box } from '@chakra-ui/react'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'

const Editor = (): JSX.Element => {
  const {
    theme: { editorColor },
  } = useCustomTheme()

  return (
    <Box w="100%" h="100%" background={editorColor}>
      Editor
    </Box>
  )
}

export default Editor
