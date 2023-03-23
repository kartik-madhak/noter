import { Container, Flex } from "@chakra-ui/react";
import Editor from "./components/Editor/Editor";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Container px={0} maxW="container.xlg" h="100vh">
      <Flex h="100%" direction="column">
        <Navbar />
        <Editor />
      </Flex>
    </Container>
  );
};

export default App;
