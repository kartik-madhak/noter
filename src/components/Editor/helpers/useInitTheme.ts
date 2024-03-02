import { useEffect } from 'react'
import { type EditorView } from 'codemirror'
import { Compartment } from '@codemirror/state'

export const themeCompartment = new Compartment()

export const useInitTheme = (
  view: EditorView | null,
  editorTheme: any
): void => {
  useEffect(() => {
    if (view === null) return

    view.dispatch({
      effects: themeCompartment.reconfigure(editorTheme),
    })
  }, [editorTheme, view])
}
