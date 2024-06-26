import { type Extension, Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { indentWithTab, redo } from '@codemirror/commands'
import { openSearchPanel } from '@codemirror/search'
import { invoke } from '@tauri-apps/api/tauri'
import {
  modifyLines,
  modifySelection,
  toggleBold,
  toggleCheckList,
  toggleItalic,
  toggleStrikeThrough,
} from '~/components/Editor/commands'
import { AbsoluteElements } from '~/context/AbsolutesController'

export default (
  setCtrlTabPressed: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void,
  openedFile: string,
  setOpenedFile: (fileName: string, value: boolean) => void,
  setActiveAbsoluteElement: (element: AbsoluteElements) => void
): Extension =>
  Prec.highest(
    keymap.of([
      indentWithTab,
      {
        key: 'Mod-i',
        run: (editor) => {
          modifySelection(editor.state, editor.dispatch, toggleItalic)
          return true
        },
        preventDefault: true,
      },
      {
        key: 'Mod-b',
        run: (editor) => {
          modifySelection(editor.state, editor.dispatch, toggleBold)
          return true
        },
      },
      {
        key: 'Mod-u',
        run: (editor) => {
          modifySelection(editor.state, editor.dispatch, toggleStrikeThrough)
          return true
        },
      },
      {
        key: 'Mod-Enter',
        run: (editor) => {
          modifyLines(editor.state, editor.dispatch, toggleCheckList)
          return true
        },
      },
      {
        key: 'Mod-Shift-z',
        run: (editor) => {
          redo({
            state: editor.state,
            dispatch: editor.dispatch,
          })
          return true
        },
      },
      {
        key: 'Mod-r',
        run: (editor) => {
          openSearchPanel(editor)
          const replaceInput = document
            .querySelector('.cm-search')
            ?.querySelector('input[name="replace"]') as HTMLInputElement
          replaceInput?.focus()
          return true
        },
      },
      {
        key: 'Mod-Tab',
        run: () => {
          setCtrlTabPressed(true)
          return true
        },
      },
      {
        key: 'Mod-n',
        run: () => {
          void invoke('new_file', { name: new Date().toISOString() }).then(
            (file) => {
              setOpenedFile(file as string, true)
            }
          )

          return true
        },
      },
      {
        key: 'Mod-m',
        run: () => {
          setOpenedFile(openedFile, true)

          return true
        },
      },
      {
        key: 'Mod-e',
        run: () => {
          setActiveAbsoluteElement(AbsoluteElements.RecentFiles)
          return true
        },
      },
    ])
  )
