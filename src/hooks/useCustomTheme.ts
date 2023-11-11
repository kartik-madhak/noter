import { useColorMode } from '@chakra-ui/react'
import useLocalStorageState from 'use-local-storage-state'
import { useEffect } from 'react'
import * as theMirrorThemes from 'thememirror'
import allThemes, { type Theme, ThemeName, ThemeType } from '~/config/allThemes'

export const useCustomTheme = (): {
  theme: Theme
  setThemeName: (themeName: ThemeName) => void
  editorTheme: any
  editorThemeName: string
  setEditorThemeName: (editorThemeName: string) => void
} => {
  const [themeName, setThemeName] = useLocalStorageState<ThemeName>('theme', {
    defaultValue: ThemeName.Default,
  })
  const [editorThemeName, setEditorTheme] = useLocalStorageState<string>(
    'editorTheme',
    {
      defaultValue: 'barf',
    }
  )
  const { colorMode, toggleColorMode } = useColorMode()

  let themeKey = ThemeName[themeName as keyof typeof ThemeName]
  if (!(themeKey in allThemes)) {
    themeKey = ThemeName.Default
  }

  const theme = allThemes[themeKey]
  const editorTheme =
    theMirrorThemes[editorThemeName as keyof typeof theMirrorThemes]

  useEffect(() => {
    if (
      (theme.type === ThemeType.Light && colorMode === 'dark') ||
      (theme.type === ThemeType.Dark && colorMode === 'light')
    ) {
      toggleColorMode()
    }
  }, [theme.type, colorMode])

  return {
    theme,
    setThemeName,
    editorTheme,
    editorThemeName,
    setEditorThemeName: setEditorTheme,
  }
}
