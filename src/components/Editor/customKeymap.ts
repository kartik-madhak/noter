import { type Extension, Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { indentWithTab, redo } from '@codemirror/commands'
import { openSearchPanel } from '@codemirror/search'
import {
  modifyLines,
  modifySelection,
  toggleBold,
  toggleCheckList,
  toggleItalic,
  toggleStrikeThrough,
} from '~/components/Editor/commands'

export default (
  setCtrlTabPressed: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void
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
    ])
  )
