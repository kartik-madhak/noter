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
import EditorSettings from '~/components/Navbar/EditorSettings'

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
            <EditorSettings />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default SettingsDrawer
