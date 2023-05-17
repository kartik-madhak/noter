import allThemes, {
  type THEME,
  THEME_NAME,
  THEME_TYPE,
} from '~/config/allThemes'
import { useColorMode } from '@chakra-ui/react'
import useLocalStorageState from 'use-local-storage-state'
import { useEffect } from 'react'

export const useColors = (): {
  theme: THEME
  setThemeName: (themeName: THEME_NAME) => void
} => {
  const [themeName, setThemeName] = useLocalStorageState<THEME_NAME>('theme', {
    defaultValue: THEME_NAME.Default,
  })
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = allThemes[themeName]

  useEffect(() => {
    if (
      (theme.type === THEME_TYPE.LIGHT && colorMode === 'dark') ||
      (theme.type === THEME_TYPE.DARK && colorMode === 'light')
    ) {
      toggleColorMode()
    }
  }, [theme.type, colorMode])

  return { theme, setThemeName }
}
