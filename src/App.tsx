import { Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Container maxW="container.xlg" h="100vh">
      <Navbar />
      <Container maxW="container.xl">
      </Container>
    </Container>
  );
};

export default App;
