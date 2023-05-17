import { Box } from '@chakra-ui/react'
import { useColors } from '~/hooks/useColors/useColors'

const Editor = (): JSX.Element => {
  const {
    theme: { editorColor },
  } = useColors()

  return (
    <Box w="100%" h="100%" background={editorColor}>
      Editor
    </Box>
  )
}

export default Editor
