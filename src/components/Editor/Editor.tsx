import { Box } from '@chakra-ui/react'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import React, { type ReactElement, useEffect, useRef } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { barf, noctisLilac } from 'thememirror'
import { syntaxHighlighting } from '@codemirror/language'
import customKeymap from '~/components/Editor/customKeymap'
import { sampleNote } from '~/components/Editor/sampleNote'

import { useCustomTheme } from '~/hooks/useCustomTheme'

import { ThemeType } from '~/config/allThemes'
import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import { setZoomEvent } from '~/components/Editor/extensions/zoomExtension'

const Editor = (): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)
  const {
    theme: { type: themeType },
  } = useCustomTheme()

  useEffect(() => {
    if (editorRef.current === null) return

    const view = new EditorView({
      state: EditorState.create({
        doc: sampleNote,
        extensions: [
          basicSetup,
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          syntaxHighlighting(customSyntaxHighlighting()),
          customKeymap,
          themeType === ThemeType.Dark ? barf : noctisLilac,
          EditorView.theme({
            '&': {
              height: '100%',
            },
            '&.cm-focused .cm-activeLine': {
              backgroundColor: 'transparent !important',
            },
          }),
        ],
      }),
      parent: editorRef.current,
    })

    setZoomEvent(localStorage, view)

    return () => {
      view.destroy()
    }
  }, [themeType])

  return <Box w="100%" h="100%" ref={editorRef}></Box>
}

export default Editor
