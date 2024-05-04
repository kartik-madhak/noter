import { type RefObject, useContext, useEffect } from 'react'
import { type EditorView } from 'codemirror'
import { CurrentFileContext } from '~/context/CurrentFileContext'

export const useEditorSetCurrentFile = (
  editorRef: RefObject<HTMLDivElement>,
  view: EditorView | null
): void => {
  const { openedFile } = useContext(CurrentFileContext)

  useEffect(() => {
    if (openedFile === '' && editorRef.current != null) {
      editorRef.current.innerHTML = ''
      return
    }
    if (view?.dom != null && editorRef.current != null && openedFile !== '') {
      editorRef.current.appendChild(view.dom)
    }
  }, [view, openedFile])
}
