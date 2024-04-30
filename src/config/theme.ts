import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import '@fontsource-variable/noto-sans-jp'
import '@fontsource-variable/fira-code'

export enum PrimarySwatch {
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  Blue = 'blue',
  Cyan = 'cyan',
  Teal = 'teal',
  Green = 'green',
  Yellow = 'yellow',
  Orange = 'orange',
}

const themes: Record<any, any> = {}

for (const primarySwatch of Object.values(PrimarySwatch)) {
  themes[primarySwatch] = extendTheme(
    withDefaultColorScheme({
      colorScheme: primarySwatch,
    }),
    {
      fonts: {
        heading: "'Noto Sans JP Variable', sans-serif",
        body: "'Noto Sans JP Variable', sans-serif",
      },
    }
  )
}

export { themes }
