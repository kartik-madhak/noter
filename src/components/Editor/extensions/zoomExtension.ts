import { type EditorView } from 'codemirror'
import { type WheelEvent } from 'react'

const minFontSize = 8
const maxFontSize = 60

export const setZoomEvent = (
  localStorage: Storage,
  editorElement: EditorView
): void => {
  const storedFontSize = parseInt(localStorage.getItem('fontSize') ?? '14')
  editorElement.dom.style.fontSize = `${storedFontSize}px`

  const element = editorElement.dom.querySelector('.cm-scroller')
  if (element == null) return

  element.addEventListener('wheel', (e) => {
    const event = e as unknown as WheelEvent
    if (!event.ctrlKey) return

    event.preventDefault()

    let fontSize = parseFloat(editorElement.dom.style.fontSize)
    if (isNaN(fontSize)) {
      fontSize = storedFontSize
    }

    if (event.deltaY < 0) {
      fontSize = Math.min(fontSize + 1, maxFontSize)
    } else {
      fontSize = Math.max(fontSize - 1, minFontSize)
    }

    editorElement.dom.style.fontSize = `${fontSize}px`
    localStorage.setItem('fontSize', `${fontSize}`)
  })
}
