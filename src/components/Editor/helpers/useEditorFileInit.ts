import { type EditorView } from 'codemirror'
import { invoke } from '@tauri-apps/api/tauri'
import { Transaction } from '@codemirror/state'
import { useContext, useEffect, useState } from 'react'
import { getFontSize } from '~/components/Editor/helpers/zoomLogic'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const _setInitialFontSize = (editorElement: EditorView): void => {
  const storedFontSize = getFontSize()
  editorElement.dom.style.fontSize = `${storedFontSize}px`
}

const _initFile = async (
  view: EditorView | null,
  openedFile: string,
  states: Record<string, any>
): Promise<void> => {
  if (view === null) return
  _setInitialFontSize(view)

  const metaData: any = await invoke('read_metadata', {
    path: openedFile,
  }).catch(() => {})

  const file: string = await invoke('read_file', { path: openedFile })

  const cursorPosition = metaData?.cursor < file.length ? metaData?.cursor : 0
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: file,
    },
    selection: {
      anchor: cursorPosition ?? 0,
      head: cursorPosition ?? 0,
    },
    annotations: Transaction.addToHistory.of(false),
  })

  const currFileState = states[openedFile] ?? null

  if (currFileState != null) {
    view.setState(currFileState)
  }

  const { top } = view.coordsAtPos(cursorPosition ?? 0) ?? { top: 0 }
  view.focus()
  view.scrollDOM.scrollTop = top - view?.scrollDOM.clientHeight / 2
}

export const useEditorFileInit = (
  view: EditorView | null,
  setOnFileClose: (callback: () => void) => void
): void => {
  const { openedFile } = useContext(CurrentFileContext)

  const [states, setStates] = useState<Record<string, any>>({})

  useEffect(() => {
    void _initFile(view, openedFile, states).then()

    setOnFileClose(() => {
      return () => {
        if (view === null) return

        setStates({
          ...states,
          [openedFile]: view.state,
        })
      }
    })
  }, [view])
}
