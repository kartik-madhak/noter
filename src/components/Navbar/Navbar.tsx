import { Box, Flex } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import ThemeChanger from '~/components/Navbar/ThemeChanger'
import MainMenu from '~/components/MainMenu/MainMenu'

const Navbar = (): ReactElement => {
  const {
    theme: { navbarColor },
  } = useCustomTheme()

  return (
    <Box shadow="sm" background={navbarColor}>
      <Flex
        align="center"
        h="50px"
        w="100vw"
        justifyContent="space-between"
        px={8}
      >
        <MainMenu />
        <ThemeChanger />
      </Flex>
    </Box>
  )
}

export default Navbar
