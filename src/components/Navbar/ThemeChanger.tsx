import { THEME_NAME } from '~/config/allThemes'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import Menu from '~/design-system/components/Menu/Menu'

const ThemeChanger = (): JSX.Element => {
  const {
    theme: { name: themeName },
    setThemeName,
  } = useCustomTheme()

  const options = Object.keys(THEME_NAME).map((themeName: string) => ({
    id: themeName,
    content: themeName,
    onClick: () => {
      setThemeName(themeName as THEME_NAME)
    },
  }))

  return (
    <Menu
      options={options}
      buttonText={themeName}
      defaultSelectedId={themeName}
    />
  )
}

export default ThemeChanger
