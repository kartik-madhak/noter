import { createContext } from 'react'

interface FileContextType {
  currentOpenedFile: string
  setCurrentOpenedFile: (file: string) => void
}

export const FileContext = createContext<FileContextType>({
  currentOpenedFile: '',
  setCurrentOpenedFile: () => {},
})
