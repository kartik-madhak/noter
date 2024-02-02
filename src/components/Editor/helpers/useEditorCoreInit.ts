import { type RefObject, useContext, useEffect, useState } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { syntaxHighlighting } from '@codemirror/language'
import { customSyntaxHighlighting } from '~/components/Editor/customSyntaxHighlighting'
import customKeymap from '~/components/Editor/customKeymap'
import { autoSave } from '~/components/Editor/helpers/extensions'
import { CurrentFileContext } from '~/context/CurrentFileContext'
import { themeCompartment } from '~/components/Editor/helpers/useInitTheme'

export const useEditorCoreInit = (
  editorRef: RefObject<HTMLDivElement>,
  editorTheme: any
): EditorView | null => {
  const [view, setView] = useState<EditorView | null>(null)
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

  return view
}
