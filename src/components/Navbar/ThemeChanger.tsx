import { type ReactElement, useContext } from 'react'
import * as theMirrorThemes from 'thememirror'
import { HStack } from '@chakra-ui/react'
import { ThemeName } from '~/config/allThemes'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import Menu from '~/design-system/components/Menu/Menu'
import { PrimarySwatch } from '~/config/theme'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'

const camelCaseToWords = (s: string): string => {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const ThemeChanger = (): ReactElement => {
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)

  const {
    theme: { name: themeName },
    setThemeName,
    editorThemeName,
    setEditorThemeName,
  } = useCustomTheme()

  const baseThemes = Object.keys(ThemeName).map((themeName: string) => ({
    id: ThemeName[themeName as keyof typeof ThemeName],
    content: ThemeName[themeName as keyof typeof ThemeName],
    onClick: () => {
      setThemeName(themeName as ThemeName)
    },
  }))

  const colorSchemes = Object.entries(PrimarySwatch).map(([color, value]) => ({
    id: color,
    content: color,
    onClick: () => {
      setColorScheme(value)
    },
  }))

  const editorThemes = Object.keys(theMirrorThemes)
    .filter((themeName: string) => themeName !== 'createTheme')
    .map((themeName: string) => ({
      id: themeName,
      content: camelCaseToWords(themeName),
      onClick: () => {
        setEditorThemeName(themeName)
      },
    }))

  return (
    <HStack spacing={5}>
      <Menu
        options={baseThemes}
        buttonText={themeName}
        defaultSelectedId={themeName}
      />
      <Menu
        options={colorSchemes}
        buttonText={colorScheme[0].toUpperCase() + colorScheme.slice(1)}
        defaultSelectedId={colorScheme}
      />
      <Menu
        options={editorThemes}
        buttonText={camelCaseToWords(editorThemeName)}
        defaultSelectedId={editorThemeName}
      />
    </HStack>
  )
}

export default ThemeChanger
