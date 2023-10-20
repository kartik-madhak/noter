import { Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { redo, indentWithTab } from '@codemirror/commands'
import {
  modifyLines,
  modifySelection,
  toggleBold,
  toggleCheckList,
  toggleCheckListAll,
  toggleItalic,
  toggleStrikeThrough,
} from '~/components/Editor/commands'

export default Prec.highest(
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
      key: 'Mod-Shift-Enter',
      run: (editor) => {
        modifyLines(editor.state, editor.dispatch, toggleCheckListAll)
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
  ])
)
