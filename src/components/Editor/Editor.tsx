import { Box } from '@chakra-ui/react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import {
  defaultHighlightStyle,
  HighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language'
import { tags } from '@lezer/highlight'
import React from 'react'
import customKeymap from '~/components/Editor/customKeymap'

const code = `
# Heading level 1
## Heading level 2
### Heading level 3

Just ~~some~~ _**random**_ **_text_** here.

Normal test here for testing. Lorem Ipsum 

- [ ] Task 1
- [x] Task 2
`

const Editor = (): JSX.Element => {
  return (
    <Box w="100%" h="100%">
      <CodeMirror
        height="100vh"
        value={code}
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          syntaxHighlighting(defaultHighlightStyle),
          syntaxHighlighting(
            HighlightStyle.define([
              { tag: tags.heading1, fontSize: '150%' },
              { tag: tags.heading2, fontSize: '140%' },
              { tag: tags.heading3, fontSize: '130%' },
            ])
          ),
          customKeymap,
        ]}
      />
    </Box>
  )
}

export default Editor
