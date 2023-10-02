import { createContext } from 'react'

interface CurrentFileContextType {
  openedFile: string
  setOpenedFile: (file: string) => void
}

export const CurrentFileContext = createContext<CurrentFileContextType>({
  openedFile: '',
  setOpenedFile: () => {},
})
