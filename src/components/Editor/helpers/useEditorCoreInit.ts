import { type RefObject, useContext, useEffect, useState } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { Compartment, EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { syntaxHighlighting } from '@codemirror/language'
import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import customKeymap from '~/components/Editor/customKeymap'
import { autoSave } from '~/components/Editor/helpers/extensions'
import { CurrentFileContext } from '~/context/CurrentFileContext'
import { AbsolutesContext } from '~/context/AbsolutesController'
import { EditorSettingsContext } from '~/context/EditorSettings'

const autoSaveCompartment = new Compartment()
const customKeymapCompartment = new Compartment()
const lineWrapCompartment = new Compartment()
export const themeCompartment = new Compartment()

export const useEditorCoreInit = (
  editorRef: RefObject<HTMLDivElement>,
  editorTheme: any
): EditorView | null => {
  const [view, setView] = useState<EditorView | null>(null)
  const { openedFile, setOpenedFile } = useContext(CurrentFileContext)
  const { setActiveAbsoluteElement } = useContext(AbsolutesContext)
  const { isSoftWrapEnabled } = useContext(EditorSettingsContext)

  const [openedFilesHistory, setOpenedFilesHistory] = useState<string[]>([
    openedFile,
  ])

  const [ctrlTabPressed, setCtrlTabPressed] = useState<boolean>(false)

  useEffect(() => {
    if (editorRef.current === null) return
    if (openedFile === '') return

    const view = new EditorView({
      state: EditorState.create({
        doc: '',
        extensions: [
          basicSetup,
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          syntaxHighlighting(customSyntaxHighlighting()),
          themeCompartment.of(editorTheme),
          customKeymapCompartment.of(
            customKeymap(
              setCtrlTabPressed,
              openedFile,
              setOpenedFile,
              setActiveAbsoluteElement
            )
          ),
          EditorView.theme({
            '&': {
              height: '100%',
            },
            '.cm-content': {
              fontFamily: "'Fira Code Variable', monospace",
            },
          }),
          lineWrapCompartment.of(
            isSoftWrapEnabled ? EditorView.lineWrapping : []
          ),
          autoSaveCompartment.of(autoSave(openedFile)),
        ],
      }),
      parent: editorRef.current,
    })

    setView(view)

    return () => {
      view.destroy()
    }
  }, [])

  useEffect(() => {
    if (view === null) return

    setOpenedFilesHistory((prev) => {
      if (openedFile in prev) {
        return [prev[1], prev[0]]
      }
      return [openedFile, prev[0]]
    })

    view.dispatch({
      effects: [
        autoSaveCompartment.reconfigure(autoSave(openedFile)),
        customKeymapCompartment.reconfigure(
          customKeymap(
            setCtrlTabPressed,
            openedFile,
            setOpenedFile,
            setActiveAbsoluteElement
          )
        ),
      ],
    })
  }, [openedFile])

  useEffect(() => {
    if (view === null || !ctrlTabPressed) return

    const currIndex = openedFilesHistory.indexOf(openedFile)
    if (currIndex === -1) return

    const nextIndex = currIndex === 0 ? 1 : 0

    setOpenedFile(openedFilesHistory[nextIndex])

    setCtrlTabPressed(false)
  }, [ctrlTabPressed])

  useEffect(() => {
    if (view === null) return

    view.dispatch({
      effects: [
        lineWrapCompartment.reconfigure(
          isSoftWrapEnabled ? EditorView.lineWrapping : []
        ),
      ],
    })
  }, [isSoftWrapEnabled])

  useEffect(() => {
    if (view === null) return

    view.dispatch({
      effects: themeCompartment.reconfigure(editorTheme),
    })
  }, [editorTheme, view])

  return view
}
