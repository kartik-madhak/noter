import { Box } from '@chakra-ui/react'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import React, { useEffect, useRef } from 'react'
import customKeymap from '~/components/Editor/customKeymap'
import customStyling from '~/components/Editor/customStyling'

import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { sampleNote } from '~/components/Editor/sampleNote'

const Editor = (): JSX.Element => {
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
    return () => {
      view.destroy()
    }
  }, [])

  return <Box w="100%" h="100%" ref={editorRef} data-testid="editor"></Box>
}

export default Editor
