import { type WheelEvent } from 'react'
import { type EditorView } from 'codemirror'
import type React from 'react'

const minFontSize = 8
const maxFontSize = 60

export const getFontSize = (): number => {
  return parseInt(localStorage.getItem('fontSize') ?? '14')
}

const _changeFontSize = (
  event: { preventDefault: () => void },
  editorElement: EditorView,
  isIncrement: boolean
): void => {
  const storedFontSize = getFontSize()

  let fontSize = parseFloat(editorElement.dom.style.fontSize)
  if (isNaN(fontSize)) {
    fontSize = storedFontSize
  }

  if (isIncrement) {
    fontSize = Math.min(fontSize + 1, maxFontSize)
  } else {
    fontSize = Math.max(fontSize - 1, minFontSize)
  }

  editorElement.dom.style.fontSize = `${fontSize}px`
  localStorage.setItem('fontSize', `${fontSize}`)
}

export const onEditorWheel = (
  event: WheelEvent,
  editorElement: EditorView
): void => {
  if (!(event.ctrlKey || event.metaKey)) return

  _changeFontSize(event, editorElement, event.deltaY < 0)
}

export const onEditorKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editorElement: EditorView
): void => {
  if (!(event.ctrlKey || event.metaKey)) return
  if (event.key !== '+' && event.key !== '-' && event.key !== '=') return

  const isIncrement = event.key === '+' || event.key === '='
  _changeFontSize(event, editorElement, isIncrement)
}
