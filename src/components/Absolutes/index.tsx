import React, { type ReactElement, useContext, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import RecentFilesMenu from '~/components/Absolutes/RecentFilesMenu'
import {
  AbsoluteElements,
  AbsolutesContext,
} from '~/context/AbsolutesController'

const Index = (): ReactElement => {
  const { activeAbsoluteElement } = useContext(AbsolutesContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeAbsoluteElement === AbsoluteElements.None) return
    ref.current?.focus()
  }, [activeAbsoluteElement])

  // render a backdrop with a blur effect which takes up the whole screen and all keyboard events
  return (
    <Box
      display={
        activeAbsoluteElement === AbsoluteElements.RecentFiles
          ? 'block'
          : 'none'
      }
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      backdropFilter="blur(3px)"
      onKeyDown={(e) => {
        e.preventDefault()
      }}
      tabIndex={-1}
    >
      <RecentFilesMenu ref={ref} />
    </Box>
  )
}

export default Index
