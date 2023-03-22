import { Container } from "@chakra-ui/react";
import Editor from "./components/Editor/Editor";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Container maxW="container.xlg" h="100vh">
      <Navbar />
      <Editor />
    </Container>
  );
};

export default App;
