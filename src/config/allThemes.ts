export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeName {
  Default = 'Default',
  Lofi = 'Lofi',
  PastelLight = 'PastelLight',
  MidnightDark = 'MidnightDark',
  SunsetGradient = 'SunsetGradient',
  OceanGradient = 'OceanGradient',
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
  [ThemeName.MidnightDark]: {
    name: ThemeName.MidnightDark,
    type: ThemeType.Dark,
    sidebarColor: '#1a1a2e',
    navbarColor: '#16213e',
    editorColor: '#0f3460',
  },
  [ThemeName.SunsetGradient]: {
    name: ThemeName.SunsetGradient,
    type: ThemeType.Light,
    sidebarColor: 'linear-gradient(to right, #ff9966, #ff5e62)',
    navbarColor: 'linear-gradient(to right, #ff5e62, #ff9966)',
    editorColor: '#ffffff',
  },
  [ThemeName.OceanGradient]: {
    name: ThemeName.OceanGradient,
    type: ThemeType.Dark,
    sidebarColor: 'linear-gradient(to right, #373b44, #4286f4)',
    navbarColor: 'linear-gradient(to right, #4286f4, #373b44)',
    editorColor: '#0f3460',
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
  [ThemeName.PastelLight]: {
    name: ThemeName.PastelLight,
    type: ThemeType.Light,
    sidebarColor: '#f8f0f5',
    navbarColor: '#f0e0f5',
    editorColor: '#ffffff',
  },
  [ThemeName.MidnightDark]: {
    name: ThemeName.MidnightDark,
    type: ThemeType.Dark,
    sidebarColor: '#1a1a2e',
    navbarColor: '#16213e',
    editorColor: '#0f3460',
  }
export default allThemes
