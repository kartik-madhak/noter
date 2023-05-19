import { PrimarySwatch, themes } from '~/config/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from '~/App'
import React, { useState } from 'react'
import { ColorSchemeContext } from '~/context/ColorSchemeContext'

const Root = (): JSX.Element => {
  const [colorScheme, setColorScheme] = useState(PrimarySwatch.Green)

  console.log(colorScheme, '<<<')

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
