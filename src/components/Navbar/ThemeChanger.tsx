import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { THEME_NAME } from '~/config/allThemes'
import { useColors } from '~/hooks/useColors/useColors'

const ThemeChanger = (): JSX.Element => {
  const {
    theme: { name: themeName },
    setThemeName,
  } = useColors()

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
        {themeName} <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        {Object.keys(THEME_NAME).map((themeName: string) => (
          <MenuItem
            onClick={() => {
              setThemeName(themeName as THEME_NAME)
            }}
            key={themeName}
          >
            {themeName}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default ThemeChanger
