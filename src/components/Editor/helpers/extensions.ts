import {
  EditorState,
  type Extension,
  type Transaction,
} from '@codemirror/state'
import { invoke } from '@tauri-apps/api/tauri'

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
  return EditorState.transactionExtender.of((tr: Transaction) => {
    saveFile(tr, openedFile)
    saveMetadata(tr, openedFile)
    return null
  })
}
