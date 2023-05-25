import { Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import {
  modifySelection,
  toggleBold,
  toggleItalic,
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
  ])
)
