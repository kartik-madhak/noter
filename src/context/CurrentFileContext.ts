import { createContext } from 'react'

interface CurrentFileContextType {
  openedFile: string
  isSaved: boolean
  setOpenedFile: (file: string) => void
  setIsSaved: (isSaved: boolean) => void
}

export const CurrentFileContext = createContext<CurrentFileContextType>({
  openedFile: '',
  isSaved: true,
  setOpenedFile: () => {},
  setIsSaved: () => {},
})
