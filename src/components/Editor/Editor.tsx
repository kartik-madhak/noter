import { Box, Spinner } from '@chakra-ui/react'
import { type ReactElement, useRef } from 'react'

import { useCustomTheme } from '~/hooks/useCustomTheme'
import { useEditorFileInit } from '~/components/Editor/helpers/useEditorFileInit'
import {
  onEditorKeyDown,
  onEditorWheel,
} from '~/components/Editor/helpers/zoomLogic'
import { useEditorCoreInit } from '~/components/Editor/helpers/useEditorCoreInit'
import { useEditorSetCurrentFile } from '~/components/Editor/helpers/useEditorSetCurrentFile'

const Editor = ({
  setOnFileClose,
}: {
  setOnFileClose: (_: () => void) => void
}): ReactElement => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { editorTheme } = useCustomTheme()

  const view = useEditorCoreInit(editorTheme)
  useEditorFileInit(view, setOnFileClose)
  useEditorSetCurrentFile(editorRef, view)

  if (view?.dom == null) return <Spinner />

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
