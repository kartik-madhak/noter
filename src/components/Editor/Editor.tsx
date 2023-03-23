import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import EditorWidthDivider from "./EditorWidthDivider";

export default () => {
  const [paddingX, setPaddingX] = useState(400);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  return (
    <Container h="100%" px={0} maxW="100%">
      <Flex h="100%">
        <Box p={10} w={paddingX} bg="blackAlpha.300">
          Side Menu Items
        </Box>
        <EditorWidthDivider
          setPaddingX={setPaddingX}
          setIsBeingDragged={setIsBeingDragged}
          isBeingDragged={isBeingDragged}
        />
        <Box p={10} w={window.innerWidth - paddingX} bg="blackAlpha.200">
          <Text>Editor</Text>
        </Box>
      </Flex>
    </Container>
  );
};
