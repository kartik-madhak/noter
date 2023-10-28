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
import { Compartment, EditorState, type Transaction } from '@codemirror/state'
import { syntaxHighlighting } from '@codemirror/language'
import { invoke } from '@tauri-apps/api/tauri'
import customKeymap from '~/components/Editor/customKeymap'

import { useCustomTheme } from '~/hooks/useCustomTheme'

import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import { setZoomEvent } from '~/components/Editor/helpers/setZoomEvent'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const readFile = async (path: string): Promise<string> => {
  return await invoke('read_file', { path })
}

const themeCompartment = new Compartment()

const Editor = (): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { editorTheme } = useCustomTheme()

  const [view, setView] = useState<EditorView | null>(null)

  const { openedFile } = useContext(CurrentFileContext)

  const autoSave = EditorState.transactionExtender.of((tr: Transaction) => {
    if (tr.docChanged) {
      const content = tr.newDoc.toString()
      void invoke('save_file', { path: openedFile, content })
    }
    return null
  })

  useEffect(() => {
    if (view === null) return
    void readFile(openedFile).then((file) => {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: file,
        },
      })
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
          autoSave,
        ],
      }),
      parent: editorRef.current,
    })

    setZoomEvent(localStorage, view)
    setView(view)

    return () => {
      view.destroy()
    }
  }, [openedFile])

  return <Box w="100%" h="100%" ref={editorRef}></Box>
}

export default Editor
