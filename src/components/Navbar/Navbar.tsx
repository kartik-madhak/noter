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
  const { toggleColorMode } = useColorMode();

  return (
    <chakra.header bg="blackAlpha.400" shadow="lg" zIndex="99" m="0">
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
