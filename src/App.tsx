import {
  Box,
  Button,
  Center,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react";
const App = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.xl" h="100vh">
      <Center p="10px">
        <Box me="20px">
          <Text fontSize="30px">Navbar</Text>
        </Box>
        <Button onClick={toggleColorMode}>Toggle darkness!</Button>
      </Center>
      This is an app with dark theme toggle
    </Container>
  );
};

export default App;
