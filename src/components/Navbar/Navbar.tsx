import { Box, chakra, Flex, HStack, Spacer } from '@chakra-ui/react'
import FileMenu from './FileMenu'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import ThemeChanger from '~/components/Navbar/ThemeChanger'

const Navbar = (): JSX.Element => {
  const {
    theme: { navbarColor },
  } = useCustomTheme()

  return (
    <chakra.header shadow="sm" zIndex="99" m="0" background={navbarColor}>
      <Box position="relative" backdropFilter="auto" backdropBlur="100px">
        <Flex px="6" py="2" align="center">
          <HStack as="nav" spacing="5" width="100vw">
            <FileMenu />
            <Spacer />
            <ThemeChanger />
          </HStack>
        </Flex>
      </Box>
    </chakra.header>
  )
}

export default Navbar
