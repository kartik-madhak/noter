import { createContext } from 'react'

interface CurrentFileContextType {
  openedFile: string
  setOpenedFile: (file: string, isNewFile?: boolean) => void
  isNewFile: boolean
}

export const CurrentFileContext = createContext<CurrentFileContextType>({
  openedFile: '',
  setOpenedFile: () => {},
  isNewFile: false,
})
