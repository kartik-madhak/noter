export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeName {
  Default = 'Default',
  Lofi = 'Lofi',
  MintApple = 'Mint Apple',
  Sunset = 'Sunset',
  ChromaGlow = 'Chroma Glow',
  Forest = 'Forest',
  MidnightBlurple = 'Midnight Blurple',
  Mars = 'Mars',
  Sepia = 'Sepia',
}

export interface Theme {
  name: ThemeName
  type: ThemeType
  sidebarColor: string
  navbarColor: string
}

const allThemes: {
  [key in ThemeName]: Theme
} = {
  [ThemeName.Default]: {
    name: ThemeName.Default,
    type: ThemeType.Dark,
    sidebarColor: '#212121',
    navbarColor: '#303030',
  },
  [ThemeName.Lofi]: {
    name: ThemeName.Lofi,
    type: ThemeType.Light,
    sidebarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
    navbarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(179.52deg, rgb(164, 192, 247) 7.08%, rgb(169, 228, 232)34.94%, rgb(176, 226, 184) 65.12%, rgb(207, 223, 162) 96.23%)',
  },
  [ThemeName.MintApple]: {
    name: ThemeName.MintApple,
    type: ThemeType.Light,
    sidebarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(rgb(86, 182, 160) 6.15%, rgb(99, 188, 97) 48.7%, rgb(157, 202, 103) 93.07%)',
    navbarColor:
      'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(rgb(86, 182, 160) 6.15%, rgb(99, 188, 97) 48.7%, rgb(157, 202, 103) 93.07%)',
  },
  [ThemeName.Sunset]: {
    name: ThemeName.Sunset,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(141.68deg, rgb(72, 40, 140) 27.57%, rgb(219, 128, 75) 71.25%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(141.68deg, rgb(72, 40, 140) 27.57%, rgb(219, 128, 75) 71.25%)',
  },
  [ThemeName.ChromaGlow]: {
    name: ThemeName.ChromaGlow,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(128.92deg, rgb(14, 182, 191) 3.94%, rgb(76, 12, 224) 26.1%, rgb(162, 8, 167) 39.82%, rgb(155, 83, 255) 56.89%, rgb(33, 138, 224) 76.45%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(128.92deg, rgb(14, 182, 191) 3.94%, rgb(76, 12, 224) 26.1%, rgb(162, 8, 167) 39.82%, rgb(155, 83, 255) 56.89%, rgb(33, 138, 224) 76.45%)',
  },
  [ThemeName.Forest]: {
    name: ThemeName.Forest,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(162.27deg, rgb(20, 34, 21) 11.2%, rgb(45, 77, 57) 29.93%, rgb(69, 76, 50) 48.64%, rgb(90, 124, 88) 67.85%, rgb(169, 142, 75) 83.54%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(162.27deg, rgb(20, 34, 21) 11.2%, rgb(45, 77, 57) 29.93%, rgb(69, 76, 50) 48.64%, rgb(90, 124, 88) 67.85%, rgb(169, 142, 75) 83.54%)',
  },
  [ThemeName.MidnightBlurple]: {
    name: ThemeName.MidnightBlurple,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(48.17deg, rgb(83, 72, 202) 11.21%, rgb(20, 7, 48) 61.92%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(180.17deg, rgb(83, 72, 202) 11.21%, rgb(20, 7, 48) 61.92%)',
  },
  [ThemeName.Mars]: {
    name: ThemeName.Mars,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(170.82deg, rgb(137, 82, 64) 14.61%, rgb(143, 67, 67) 74.62%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(170.82deg, rgb(137, 82, 64) 14.61%, rgb(143, 67, 67) 74.62%)',
  },
  [ThemeName.Sepia]: {
    name: ThemeName.Sepia,
    type: ThemeType.Dark,
    sidebarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(69.98deg, rgb(133, 118, 100) 14.14%, rgb(91, 68, 33) 60.35%)',
    navbarColor:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(69.98deg, rgb(133, 118, 100) 14.14%, rgb(91, 68, 33) 60.35%)',
  },
}

export default allThemes
