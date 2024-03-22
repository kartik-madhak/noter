import { type ReactElement } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import ThemeChanger from '~/components/Navbar/ThemeChanger'
import { useCustomTheme } from '~/hooks/useCustomTheme'

interface SettingsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsDrawer = ({
  isOpen,
  onClose,
}: SettingsDrawerProps): ReactElement => {
  const {
    theme: { sidebarColor },
  } = useCustomTheme()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg={sidebarColor}>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <ThemeChanger />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default SettingsDrawer
