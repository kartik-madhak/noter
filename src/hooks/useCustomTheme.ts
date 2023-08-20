import { useColorMode } from '@chakra-ui/react'
import useLocalStorageState from 'use-local-storage-state'
import { useEffect } from 'react'
import allThemes, { type Theme, ThemeName, ThemeType } from '~/config/allThemes'

export const useCustomTheme = (): {
  theme: Theme
  setThemeName: (themeName: ThemeName) => void
} => {
  const [themeName, setThemeName] = useLocalStorageState<ThemeName>('theme', {
    defaultValue: ThemeName.Default,
  })
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = allThemes[themeName]

  useEffect(() => {
    if (
      (theme.type === ThemeType.Light && colorMode === 'dark') ||
      (theme.type === ThemeType.Dark && colorMode === 'light')
    ) {
      toggleColorMode()
    }
  }, [theme.type, colorMode])

  return { theme, setThemeName }
}
