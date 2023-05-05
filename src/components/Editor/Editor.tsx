import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {useState} from "react";
import './index.css'

export default () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const minWidth = 200;

  const restrainedSidebarWidth = Math.max(minWidth, Math.min(sidebarWidth, window.innerWidth - minWidth));

  return (
    <Container h="100%" px={0} maxW="100%">
      <Flex h="100%">
        <ResizableBox
          width={restrainedSidebarWidth}
          minConstraints={[minWidth, 0]}
          axis="x"
          onResize={(event, { size }) => setSidebarWidth(size.width)}
        >
          <Box p={10}>
            Sidebar
          </Box>
        </ResizableBox>
        <Box p={10} w={window.innerWidth - restrainedSidebarWidth} bg="blackAlpha.200">
          <Text>Editor</Text>
        </Box>
      </Flex>
    </Container>
  );
};
