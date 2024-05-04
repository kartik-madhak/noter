import { createContext } from 'react'

interface EditorSettings {
  isSoftWrapEnabled: boolean
  setIsSoftWrapEnabled: (isSoftWrapEnabled: boolean) => void
}

export const EditorSettingsContext = createContext<EditorSettings>({
  isSoftWrapEnabled: false,
  setIsSoftWrapEnabled: () => {},
})
