import {
  EditorState,
  type Extension,
  type Transaction,
} from '@codemirror/state'
import { invoke } from '@tauri-apps/api/tauri'

export const autoSave = (openedFile: string): Extension => {
  return EditorState.transactionExtender.of((tr: Transaction) => {
    if (tr.docChanged) {
      const content = tr.newDoc.toString()
      void invoke('save_file', { path: openedFile, content })
    }

    const cursorPosition = tr?.state?.selection?.main?.head
    if (cursorPosition != null) {
      void invoke('save_metadata', {
        path: openedFile,
        cursor: cursorPosition,
      })
    }
    return null
  })
}
