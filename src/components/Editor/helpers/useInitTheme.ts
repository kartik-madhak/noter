import { useEffect } from 'react'
import { type EditorView } from 'codemirror'
import { Compartment } from '@codemirror/state'

const themeCompartment = new Compartment()

export const useInitTheme = (
  view: EditorView | null,
  editorTheme: any
): Compartment => {
  useEffect(() => {
    if (view === null) return

    view.dispatch({
      effects: themeCompartment.reconfigure(editorTheme),
    })
  }, [editorTheme])

  return themeCompartment
}
