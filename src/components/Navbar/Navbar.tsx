import { Button, chakra, Flex, HStack, useColorMode } from "@chakra-ui/react";
import FileMenu from "./FileMenu";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="2" align="center" justify="space-between">
        <HStack as="nav" spacing="5">
          <FileMenu />
        </HStack>
        <HStack>
          <Button onClick={toggleColorMode} size="sm">
            🌓 Toggle dark mode
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
};
