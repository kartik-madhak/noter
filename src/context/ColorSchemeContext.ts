import { createContext, type Dispatch, type SetStateAction } from 'react'
import { PrimarySwatch } from '~/config/theme'

interface ColorSchemeContextType {
  colorScheme: PrimarySwatch
  setColorScheme: Dispatch<SetStateAction<PrimarySwatch>>
}

export const ColorSchemeContext = createContext<ColorSchemeContextType>({
  colorScheme: PrimarySwatch.Green,
  setColorScheme: () => {},
})
