import { PrimarySwatch, themes } from '~/config/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from '~/App'
import React from 'react'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'
import useLocalStorageState from 'use-local-storage-state'

const Root = (): JSX.Element => {
  const [colorScheme, setColorScheme] = useLocalStorageState<PrimarySwatch>(
    'colorScheme',
    {
      defaultValue: PrimarySwatch.Green,
    }
  )

  return (
    <ChakraProvider theme={themes[colorScheme]}>
      <ColorModeScript
        initialColorMode={themes[colorScheme].config.initialColorMode}
      />
      <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
        <App />
      </ColorSchemeContext.Provider>
    </ChakraProvider>
  )
}

export default Root
