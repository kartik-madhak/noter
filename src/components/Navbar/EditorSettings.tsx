import { type ReactElement, useContext } from 'react'
import { Box, Checkbox } from '@chakra-ui/react'
import { EditorSettingsContext } from '~/context/EditorSettings'

const EditorSettings = (): ReactElement => {
  const { isSoftWrapEnabled, setIsSoftWrapEnabled } = useContext(
    EditorSettingsContext
  )

  return (
    <Box>
      <Checkbox
        mt={2}
        isChecked={isSoftWrapEnabled}
        onChange={() => {
          setIsSoftWrapEnabled(!isSoftWrapEnabled)
        }}
      >
        Enable soft wrap
      </Checkbox>
    </Box>
  )
}

export default EditorSettings
