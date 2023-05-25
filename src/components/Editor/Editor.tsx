import { Box } from '@chakra-ui/react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import React from 'react'
import customKeymap from '~/components/Editor/customKeymap'
import customStyling from '~/components/Editor/customStyling'

const code = `
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6


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
          customStyling,
          customKeymap,
        ]}
      />
    </Box>
  )
}

export default Editor
