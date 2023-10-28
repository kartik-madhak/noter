import {
  Button,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import React, { type ReactElement } from 'react'

interface Option {
  id?: string
  content: React.ReactNode
  onClick: () => void
}

interface MenuProps {
  buttonText: string
  options: Option[]
  defaultSelectedId?: string
  closeOnSelect?: boolean
  showCheckboxOnClick?: boolean
}

const Menu = ({
  buttonText,
  options,
  defaultSelectedId,
  closeOnSelect = false,
  showCheckboxOnClick = true,
}: MenuProps): ReactElement => {
  let MenuItemComponent: React.ElementType = MenuItem
  if (showCheckboxOnClick) {
    MenuItemComponent = MenuItemOption
  }

  return (
    <ChakraMenu closeOnSelect={closeOnSelect} isLazy={true}>
      <MenuButton as={Button} size="sm">
        {buttonText} <ChevronDownIcon />
      </MenuButton>
      <MenuList maxHeight="90vh" overflowY="auto">
        <MenuOptionGroup defaultValue={defaultSelectedId} type="radio">
          {options.map((option, index) => (
            <MenuItemComponent
              value={option.id}
              key={option?.id ?? index}
              onClick={option.onClick}
            >
              {option.content}
            </MenuItemComponent>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </ChakraMenu>
  )
}

export default Menu
