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
import { EditorState } from '@codemirror/state'
import { syntaxHighlighting } from '@codemirror/language'
import customKeymap from '~/components/Editor/customKeymap'

import { useCustomTheme } from '~/hooks/useCustomTheme'

import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import { useEditorInitFile } from '~/components/Editor/helpers/initialize'
import { CurrentFileContext } from '~/context/CurrentFileContext'
import { autoSave } from '~/components/Editor/extensions'
import {
  onEditorKeyDown,
  onEditorWheel,
} from '~/components/Editor/helpers/zoomLogic'
import { useInitTheme } from '~/components/Editor/helpers/useInitTheme'

const Editor = ({
  setOnFileClose,
}: {
  setOnFileClose: (_: () => void) => void
}): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { editorTheme } = useCustomTheme()

  const [view, setView] = useState<EditorView | null>(null)

  useEditorInitFile(view, setOnFileClose)

  const themeCompartment = useInitTheme(view, editorTheme)

  const { openedFile } = useContext(CurrentFileContext)

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
