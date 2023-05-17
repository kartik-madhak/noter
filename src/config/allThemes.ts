export enum THEME_TYPE {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum THEME_NAME {
  Default = 'Default',
  Lofi = 'Lofi',
}

export interface THEME {
  name: THEME_NAME
  type: THEME_TYPE
  sidebarColor: string
  navbarColor: string
  editorColor: string
}

const allThemes: {
  [key in THEME_NAME]: THEME
} = {
  [THEME_NAME.Default]: {
    name: THEME_NAME.Default,
    type: THEME_TYPE.DARK,
    sidebarColor: '#212121',
    navbarColor: '#303030',
    editorColor: '#292929',
  },
  [THEME_NAME.Lofi]: {
    name: THEME_NAME.Lofi,
    type: THEME_TYPE.LIGHT,
    sidebarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
    navbarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
    editorColor:
      'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232) 34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
  },
}

export default allThemes
