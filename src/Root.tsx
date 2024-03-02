import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React, { type ReactElement, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { PrimarySwatch, themes } from '~/config/theme'
import App from '~/App'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const Root = (): ReactElement => {
  const [colorScheme, setColorScheme] = useLocalStorageState<PrimarySwatch>(
    'colorScheme',
    {
      defaultValue: PrimarySwatch.Green,
    }
  )

  const [currentOpenedFile, setCurrentOpenedFile] =
    useLocalStorageState<string>('currentOpenedFile', {
      defaultValue: '',
    })

  const [isNewFile, setIsNewFile] = useState(false)

  const setOpenedFileHandler = (
    fileName: string,
    isNewFile?: boolean
  ): void => {
    setIsNewFile(isNewFile ?? false)
    if (fileName === '') return
    setCurrentOpenedFile(fileName)
  }

  return (
    <ChakraProvider theme={themes[colorScheme]}>
      <ColorModeScript
        initialColorMode={themes[colorScheme].config.initialColorMode}
      />
      <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
        <CurrentFileContext.Provider
          value={{
            openedFile: currentOpenedFile,
            setOpenedFile: setOpenedFileHandler,
            isNewFile,
          }}
        >
          <App />
        </CurrentFileContext.Provider>
      </ColorSchemeContext.Provider>
    </ChakraProvider>
  )
}

export default Root
