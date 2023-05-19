import { ThemeName } from '~/config/allThemes'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import Menu from '~/design-system/components/Menu/Menu'
import { PrimarySwatch } from '~/config/theme'
import { useContext } from 'react'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'

const ThemeChanger = (): JSX.Element => {
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
        buttonText={colorScheme}
        defaultSelectedId={colorScheme}
      />
    </>
  )
}

export default ThemeChanger
