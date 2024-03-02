import { type Extension, type Transaction } from '@codemirror/state'
import { invoke } from '@tauri-apps/api/tauri'
import { EditorView } from 'codemirror'

const saveMetadata = (tr: Transaction, openedFile: string): void => {
  const cursorPosition = tr?.state?.selection?.main?.head
  if (cursorPosition != null) {
    void invoke('save_metadata', {
      path: openedFile,
      cursor: cursorPosition,
    })
  }
}

const saveFile = (tr: Transaction, openedFile: string): void => {
  if (tr.docChanged) {
    const content = tr.newDoc.toString()
    void invoke('save_file', { path: openedFile, content })
  }
}

export const autoSave = (openedFile: string): Extension => {
  return EditorView.updateListener.of(
    ({ transactions, state, selectionSet, startState, view }) => {
      if (transactions.length === 0) return
      const tr = transactions[0]
      saveFile(tr, openedFile)
      saveMetadata(tr, openedFile)
    }
  )
}
