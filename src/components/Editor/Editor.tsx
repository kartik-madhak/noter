import { Box } from '@chakra-ui/react'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import React, { type ReactElement, useEffect, useRef } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import customKeymap from '~/components/Editor/customKeymap'
import customStyling from '~/components/Editor/customStyling'

import { sampleNote } from '~/components/Editor/sampleNote'

interface EditorProps {
  _onInit?: (_: EditorView) => void
  _onUpdate?: () => void
}

const Editor = ({
  _onInit = (_: EditorView) => {},
  _onUpdate = () => {},
}: EditorProps): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const view = new EditorView({
      state: EditorState.create({
        doc: sampleNote,
        extensions: [
          basicSetup,
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          syntaxHighlighting(defaultHighlightStyle),
          customStyling,
          customKeymap,
          EditorView.theme({
            '&': {
              height: '100%',
            },
          }),
        ],
      }),
      parent: editorRef.current as HTMLDivElement,
    })
    if (editorRef.current !== null) {
      _onInit(view)
    }
    return () => {
      view.destroy()
    }
  }, [])

  return <Box w="100%" h="100%" ref={editorRef}></Box>
}

export default Editor
