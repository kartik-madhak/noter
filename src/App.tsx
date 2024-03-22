import { Container, Flex } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import Navbar from '~/components/Navbar/Navbar'
import EditorLayout from '~/components/EditorLayout/EditorLayout'
import Absolutes from '~/components/Absolutes'

const App = (): ReactElement => (
  <Container px={0} maxW="container.xlg" h="100vh">
    <Flex h="100%" direction="column">
      <Navbar />
      <EditorLayout />
      <Absolutes />
    </Flex>
  </Container>
)

export default App
