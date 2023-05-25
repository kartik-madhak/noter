import {
  type EditorState,
  type Transaction,
  type TransactionSpec,
} from '@codemirror/state'

export const modifySelection = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  textModifier: (text: string) => string
): TransactionSpec => {
  const text: string = state.doc
    .slice(state.selection.main.from, state.selection.main.to)
    .toString()

  const textToInsert = textModifier(text)

  dispatch(
    state.update({
      changes: {
        from: state.selection.main.from,
        to: state.selection.main.to,
        insert: textToInsert,
      },
    })
  )
  return {}
}

export const toggleBold = (text: string): string => {
  if (text.startsWith('**') && text.endsWith('**')) {
    return text.slice(2, -2)
  }
  return `**${text}**`
}

export const toggleItalic = (text: string): string => {
  if (text.startsWith('_') && text.endsWith('_')) {
    return text.slice(1, -1)
  }
  return `_${text}_`
}
