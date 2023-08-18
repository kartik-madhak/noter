import { type ReactElement, useContext } from 'react'
import { ThemeName } from '~/config/allThemes'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import Menu from '~/design-system/components/Menu/Menu'
import { PrimarySwatch } from '~/config/theme'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'

const ThemeChanger = (): ReactElement => {
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)

  const {
    theme: { name: themeName },
    setThemeName,
  } = useCustomTheme()

  const options = Object.keys(ThemeName).map((themeName: string) => ({
    id: themeName,
    content: themeName,
    onClick: () => {
      setThemeName(themeName as ThemeName)
    },
  }))

  const options2 = Object.entries(PrimarySwatch).map(([color, value]) => ({
    id: color,
    content: color,
    onClick: () => {
      setColorScheme(value)
    },
  }))

  return (
    <>
      <Menu
        options={options}
        buttonText={themeName}
        defaultSelectedId={themeName}
      />
      <Menu
        options={options2}
        buttonText={colorScheme[0].toUpperCase() + colorScheme.slice(1)}
        defaultSelectedId={colorScheme}
      />
    </>
  )
}

export default ThemeChanger
