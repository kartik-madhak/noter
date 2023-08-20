import { ResizableBox } from 'react-resizable'
import { Box, Container, Flex } from '@chakra-ui/react'
import { type ReactElement, useState } from 'react'
import Editor from '~/components/Editor/Editor'
import Sidebar from '~/components/Sidebar/Sidebar'
import './index.css'
import 'react-resizable/css/styles.css'

const EditorLayout = (): ReactElement => {
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const minWidth = 200

  const restrainedSidebarWidth = Math.max(
    minWidth,
    Math.min(sidebarWidth, window.innerWidth - minWidth)
  )

  return (
    <Container h="100%" px={0} maxW="100%">
      <Flex h="100%">
        <ResizableBox
          width={restrainedSidebarWidth}
          minConstraints={[minWidth, 0]}
          axis="x"
          onResize={(event, { size }) => {
            setSidebarWidth(size.width)
          }}
        >
          <Sidebar />
        </ResizableBox>
        <Box w={window.innerWidth - restrainedSidebarWidth}>
          <Editor />
        </Box>
      </Flex>
    </Container>
  )
}

export default EditorLayout
