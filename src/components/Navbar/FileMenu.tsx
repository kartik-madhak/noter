import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export default () => {
  return (
    <Menu>
      <MenuButton
        px={3}
        height="32px"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
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
  );
};
