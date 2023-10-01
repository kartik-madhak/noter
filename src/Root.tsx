import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React, { type ReactElement } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { PrimarySwatch, themes } from '~/config/theme'
import App from '~/App'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'
import { FileContext } from '~/context/FileContext'

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

  return (
    <ChakraProvider theme={themes[colorScheme]}>
      <ColorModeScript
        initialColorMode={themes[colorScheme].config.initialColorMode}
      />
      <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
        <FileContext.Provider
          value={{
            currentOpenedFile,
            setCurrentOpenedFile,
          }}
        >
          <App />
        </FileContext.Provider>
      </ColorSchemeContext.Provider>
    </ChakraProvider>
  )
}

export default Root
