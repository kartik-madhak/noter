import { createContext } from 'react'

export enum AbsoluteElements {
  None,
  RecentFiles,
}

interface AbsolutesController {
  activeAbsoluteElement: AbsoluteElements
  setActiveAbsoluteElement: (element: AbsoluteElements) => void
}

export const AbsolutesContext = createContext<AbsolutesController>({
  activeAbsoluteElement: AbsoluteElements.None,
  setActiveAbsoluteElement: () => {},
})
