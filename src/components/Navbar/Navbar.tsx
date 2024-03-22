import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import MainMenu from '~/components/MainMenu/MainMenu'
import SettingsDrawer from '~/components/Navbar/SettingsDrawer'

const Navbar = (): ReactElement => {
  const {
    theme: { navbarColor },
  } = useCustomTheme()
  const {
    isOpen: isSettingsDrawerOpen,
    onOpen: OnSettingsDrawerOpen,
    onClose: onSettingsDrawerClose,
  } = useDisclosure()

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
        <IconButton
          aria-label={'Settings'}
          icon={<SettingsIcon />}
          onClick={OnSettingsDrawerOpen}
        />
        <SettingsDrawer
          isOpen={isSettingsDrawerOpen}
          onClose={onSettingsDrawerClose}
        />
      </Flex>
    </Box>
  )
}

export default Navbar
