import { Box } from '@chakra-ui/react'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import {
  type ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { Compartment, EditorState, Transaction } from '@codemirror/state'
import { syntaxHighlighting } from '@codemirror/language'
import { invoke } from '@tauri-apps/api/tauri'
import customKeymap from '~/components/Editor/customKeymap'

import { useCustomTheme } from '~/hooks/useCustomTheme'

import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import {
  initialize,
  onEditorKeyDown,
  onEditorWheel,
} from '~/components/Editor/helpers/initialize'
import { CurrentFileContext } from '~/context/CurrentFileContext'
import { autoSave } from '~/components/Editor/extensions'

const themeCompartment = new Compartment()

const Editor = ({
  setOnFileClose,
}: {
  setOnFileClose: (_: () => void) => void
}): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { editorTheme } = useCustomTheme()

  const [view, setView] = useState<EditorView | null>(null)
  const [states, setStates] = useState<Record<string, any>>({})

  const { openedFile } = useContext(CurrentFileContext)

  const init = async (): Promise<void> => {
    if (view === null) return
    initialize(view)

    const metaData: any = await invoke('read_metadata', {
      path: openedFile,
    }).catch(() => {})

    const file: string = await invoke('read_file', { path: openedFile })

    const cursorPosition = metaData?.cursor < file.length ? metaData?.cursor : 0

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: file,
      },
      selection: {
        anchor: cursorPosition ?? 0,
        head: cursorPosition ?? 0,
      },
      annotations: Transaction.addToHistory.of(false),
    })

    const currFileState = states[openedFile] ?? null

    if (currFileState != null) {
      view.setState(currFileState)
    }

    const { top } = view.coordsAtPos(cursorPosition ?? 0) ?? { top: 0 }
    view.focus()
    view.scrollDOM.scrollTop = top - view?.scrollDOM.clientHeight / 2
  }

  useEffect(() => {
    void init().then()
    setOnFileClose(() => {
      return () => {
        if (view === null) return

        setStates({
          ...states,
          [openedFile]: view.state,
        })
      }
    })
  }, [view])

  useEffect(() => {
    if (view === null) return

    view.dispatch({
      effects: themeCompartment.reconfigure(editorTheme),
    })
  }, [editorTheme])

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
          customKeymap,
          themeCompartment.of(editorTheme),
          EditorView.theme({
            '&': {
              height: '100%',
            },
          }),
          autoSave(openedFile),
        ],
      }),
      parent: editorRef.current,
    })

    setView(view)

    return () => {
      view.destroy()
    }
  }, [openedFile])

  return (
    <Box
      w="100%"
      h="100%"
      ref={editorRef}
      onWheel={(event) => {
        if (view == null) return
        onEditorWheel(event, view)
      }}
      onKeyDown={(event) => {
        if (view == null) return
        onEditorKeyDown(event, view)
      }}
    ></Box>
  )
}

export default Editor
