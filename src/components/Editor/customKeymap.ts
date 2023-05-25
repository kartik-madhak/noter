import { Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
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
    {
      key: 'Ctrl-i',
      run: (editor) => {
        modifySelection(editor.state, editor.dispatch, toggleItalic)
        return true
      },
      preventDefault: true,
    },
    {
      key: 'Ctrl-b',
      run: (editor) => {
        modifySelection(editor.state, editor.dispatch, toggleBold)
        return true
      },
    },
    {
      key: 'Ctrl-u',
      run: (editor) => {
        modifySelection(editor.state, editor.dispatch, toggleStrikeThrough)
        return true
      },
    },
    {
      key: 'Ctrl-Enter',
      run: (editor) => {
        modifyLines(editor.state, editor.dispatch, toggleCheckList)
        return true
      },
    },
    {
      key: 'Ctrl-Shift-Enter',
      run: (editor) => {
        modifyLines(editor.state, editor.dispatch, toggleCheckListAll)
        return true
      },
    },
  ])
)
