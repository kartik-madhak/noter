import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import FileMenu from "./FileMenu";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.header
      bg="blue"
      shadow="xl"
      position="fixed"
      zIndex="99"
      top="0"
      left="0"
      width="100vw"
      m="0"
    >
      <Box position="relative">
        <Flex px="6" py="2" align="center">
          <HStack as="nav" spacing="5" width="100vw">
            <FileMenu />
            <Spacer />
            <Button onClick={toggleColorMode} size="sm">
              🌓 Toggle dark mode
            </Button>
          </HStack>
        </Flex>
      </Box>
    </chakra.header>
  );
};
