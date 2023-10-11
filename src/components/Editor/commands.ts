import {
  type EditorState,
  type Transaction,
  type TransactionSpec,
} from '@codemirror/state'

export const modifyLines = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  textModifier: (text: string) => string
): TransactionSpec => {
  const { from, to } = state.selection.main
  const lineFrom = state.doc.lineAt(from)
  const lineTo = state.doc.lineAt(to)
  const text = state.doc.sliceString(lineFrom.from, lineTo.to)

  const textToInsert = textModifier(text)

  dispatch(
    state.update({
      changes: {
        from: lineFrom.from,
        to: lineTo.to,
        insert: textToInsert,
      },
      selection: {
        anchor: lineFrom.from + textToInsert.length,
        head: lineFrom.from + textToInsert.length,
      },
    })
  )

  return {}
}

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

export const toggleStrikeThrough = (text: string): string => {
  if (text.startsWith('~~') && text.endsWith('~~')) {
    return text.slice(2, -2)
  }
  return `~~${text}~~`
}

const toggleCheckbox = (text: string): string => {
  if (text.startsWith('- [x] ')) {
    return text.replace('- [x] ', '- [ ] ')
  }
  if (text.startsWith('- [ ] ')) {
    return text.replace('- [ ] ', '- [x] ')
  }
  return `- [ ] ${text}`
}

export const toggleCheckList = (text: string): string => {
  return text.split('\n').map(toggleCheckbox).join('\n')
}

export const toggleCheckListAll = (text: string): string => {
  return toggleCheckbox(text)
}
