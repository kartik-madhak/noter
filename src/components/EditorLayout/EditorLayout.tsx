import { ResizableBox } from 'react-resizable'
import { Box, Container, Flex } from '@chakra-ui/react'
import { type ReactElement, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import Editor from '~/components/Editor/Editor'
import Sidebar from '~/components/Sidebar/Sidebar'
import { useWindowResize } from '~/hooks/useWindowResize'
import './index.css'
import 'react-resizable/css/styles.css'

const EditorLayout = (): ReactElement => {
  const [sidebarWidth, setSidebarWidth] = useLocalStorageState('sidebarWidth', {
    defaultValue: 200,
  })

  const [onFileClose, setOnFileClose] = useState(() => {
    return () => {}
  })

  const { width } = useWindowResize()

  const minWidth = 50

  const restrainedSidebarWidth = Math.max(
    minWidth,
    Math.min(sidebarWidth, width - minWidth)
  )

  return (
    <Container h="calc(100% - 50px)" px={0} maxW="100%">
      <Flex h="100%">
        <ResizableBox
          width={restrainedSidebarWidth}
          minConstraints={[minWidth, 0]}
          axis="x"
          onResize={(event, { size }) => {
            setSidebarWidth(size.width)
          }}
        >
          <Sidebar onFileClose={onFileClose} />
        </ResizableBox>
        <Box w={window.innerWidth - restrainedSidebarWidth}>
          <Editor setOnFileClose={setOnFileClose} />
        </Box>
      </Flex>
    </Container>
  )
}

export default EditorLayout
