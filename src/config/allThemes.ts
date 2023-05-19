export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeName {
  Default = 'Default',
  Lofi = 'Lofi',
}

export interface Theme {
  name: ThemeName
  type: ThemeType
  sidebarColor: string
  navbarColor: string
  editorColor: string
}

const allThemes: {
  [key in ThemeName]: Theme
} = {
  [ThemeName.Default]: {
    name: ThemeName.Default,
    type: ThemeType.Dark,
    sidebarColor: '#212121',
    navbarColor: '#303030',
    editorColor: '#292929',
  },
  [ThemeName.Lofi]: {
    name: ThemeName.Lofi,
    type: ThemeType.Light,
    sidebarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
    navbarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
    editorColor:
      'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232) 34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
  },
}

export default allThemes
