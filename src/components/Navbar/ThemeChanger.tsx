import { type ReactElement, useContext, useState } from 'react'
import * as theMirrorThemes from 'thememirror'
import { Checkbox, FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { ThemeName, ThemeType } from '~/config/allThemes'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import Menu from '~/design-system/components/Menu/Menu'
import { PrimarySwatch } from '~/config/theme'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'

const camelCaseToWords = (s: string): string => {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const darkThemes = [
  'amy',
  'barf',
  'bespin',
  'birdsOfParadise',
  'boysAndGirls',
  'cobalt',
  'clouds',
  'coolGlow',
  'dracula',
]

const lightThemes = Object.keys(theMirrorThemes).filter((themeName) => {
  return !darkThemes.includes(themeName)
})

const ThemeChanger = (): ReactElement => {
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)
  const [isIncompatibleSelected, setIsIncompatibleSelected] = useState(false)

  const {
    theme: { name: themeName, type },
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

  const themes = isIncompatibleSelected
    ? Object.keys(theMirrorThemes)
    : type === ThemeType.Dark
    ? darkThemes
    : lightThemes

  const editorThemes = themes
    .filter((themeName: string) => themeName !== 'createTheme')
    .map((themeName: string) => ({
      id: themeName,
      content: camelCaseToWords(themeName),
      onClick: () => {
        setEditorThemeName(themeName)
      },
    }))

  return (
    <VStack spacing={3} alignItems="flex-start">
      <FormControl>
        <FormLabel>Base Theme</FormLabel>
        <Menu
          options={baseThemes}
          buttonText={themeName}
          defaultSelectedId={themeName}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Color Scheme</FormLabel>
        <Menu
          options={colorSchemes}
          buttonText={colorScheme[0].toUpperCase() + colorScheme.slice(1)}
          defaultSelectedId={colorScheme}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Editor Theme</FormLabel>
        <Menu
          options={editorThemes}
          buttonText={camelCaseToWords(editorThemeName)}
          defaultSelectedId={editorThemeName}
        />
      </FormControl>
      <Checkbox
        mt={2}
        isChecked={isIncompatibleSelected}
        onChange={() => {
          setIsIncompatibleSelected(!isIncompatibleSelected)
        }}
      >
        Show Incompatible Themes
      </Checkbox>
    </VStack>
  )
}

export default ThemeChanger
