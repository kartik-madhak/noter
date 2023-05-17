import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

const FileMenu = (): JSX.Element => {
  return (
    <Menu>
      <MenuButton
        px={3}
        height="32px"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _focus={{ boxShadow: 'outline' }}
      >
        File <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>New File</MenuItem>
        <MenuItem>Open...</MenuItem>
        <MenuItem>Save File</MenuItem>
        <MenuItem>Exit</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileMenu
