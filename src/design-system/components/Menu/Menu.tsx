import {
  Button,
  Menu as ChakraMenu,
  MenuButton,
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
}

const Menu = ({
  buttonText,
  options,
  defaultSelectedId,
}: MenuProps): ReactElement => {
  return (
    <ChakraMenu closeOnSelect={false} isLazy={true}>
      <MenuButton as={Button} size="sm">
        {buttonText} <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={defaultSelectedId} type="radio">
          {options.map((option, index) => (
            <MenuItemOption
              value={option.id}
              key={option?.id ?? index}
              onClick={option.onClick}
            >
              {option.content}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </ChakraMenu>
  )
}

export default Menu
