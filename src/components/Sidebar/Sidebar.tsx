import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { type ReactElement, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import SidebarItem from '~/components/Sidebar/SidebarItem'

const Sidebar = (): ReactElement => {
  const {
    theme: { sidebarColor, type: themeType },
  } = useCustomTheme()

  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    const getAllFiles = async (): Promise<void> => {
      const files: [string] = await invoke('read_main_directory')
      setFiles(files)
    }
    void getAllFiles()
  }, [])

  // TODO: Move this to theme
  const backgroundColor = themeType === 'light' ? '#CCC' : '#333'

  return (
    <Box w="100%" h="100%" background={sidebarColor}>
      <Accordion
        allowToggle
        defaultIndex={[0]}
        border={sidebarColor}
        fontSize="sm"
      >
        <AccordionItem border={0}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                _hover={{ background: backgroundColor }}
                border={sidebarColor}
              >
                {isExpanded ? (
                  <AccordionIcon transform="rotate(0deg)" />
                ) : (
                  <AccordionIcon transform="rotate(-90deg)" />
                )}
                <Box as="span" flex="1" textAlign="left">
                  {/* TODO: Maybe make this dynamic (and maybe later change-able)? */}
                  noter
                </Box>
              </AccordionButton>
              <AccordionPanel p={0}>
                {files.map((fileName, index) => (
                  <SidebarItem
                    backgroundColor={backgroundColor}
                    key={index}
                    fileName={fileName}
                  />
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Sidebar
