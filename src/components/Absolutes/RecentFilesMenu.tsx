import { type ReactElement, useContext, useEffect, useState } from 'react'
import { Box, forwardRef, Text } from '@chakra-ui/react'
import { invoke } from '@tauri-apps/api/tauri'
import { type File } from '~/components/Sidebar/Sidebar'
import {
  AbsoluteElements,
  AbsolutesContext,
} from '~/context/AbsolutesController'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import { ThemeType } from '~/config/allThemes'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const FileItem = ({
  file,
  isSelected,
}: {
  file: File
  isSelected: boolean
}): ReactElement => {
  return (
    <Box
      bg={isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'}
      borderRadius={4}
      p={1}
    >
      <Text>{file.name}</Text>
    </Box>
  )
}

const RecentFilesMenu = forwardRef((_, ref): ReactElement => {
  const [sortedFiles, setSortedFiles] = useState<File[]>([])
  const { activeAbsoluteElement, setActiveAbsoluteElement } =
    useContext(AbsolutesContext)
  const {
    theme: { type: themeType },
  } = useCustomTheme()
  const { setOpenedFile } = useContext(CurrentFileContext)

  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0)

  const shouldShow = activeAbsoluteElement === AbsoluteElements.RecentFiles

  useEffect(() => {
    if (shouldShow) return

    void invoke('get_all_files_sorted_by_date_modified')
      .then((files) => {
        setSortedFiles(files as File[])
      })
      .catch((e) => {
        console.error(e)
      })
  }, [shouldShow])

  return (
    <Box
      display={shouldShow ? 'block' : 'none'}
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width={500}
      zIndex={1000}
      bg={themeType === ThemeType.Light ? 'ghostwhite' : 'rgb(30, 31, 28)'}
      borderRadius={2}
      py={1}
      px={2}
      boxShadow="rgba(0, 0, 0, 0.6) 0px 0px 8px 2px"
      color={themeType === ThemeType.Light ? 'black' : 'rgb(204, 204, 204)'}
      onKeyDown={(e) => {
        e.preventDefault()
        if (
          e.ctrlKey &&
          !e.shiftKey &&
          (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'e')
        ) {
          setSelectedFileIndex((prev) => (prev + 1) % sortedFiles.length)
        } else if (
          e.ctrlKey &&
          ((e.shiftKey && (e.key === 'Tab' || e.key === 'E')) ||
            e.key === 'ArrowUp')
        ) {
          setSelectedFileIndex(
            (prev) => (prev - 1 + sortedFiles.length) % sortedFiles.length
          )
        }
      }}
      onKeyUp={(e) => {
        e.preventDefault()
        if (e.key === 'Control') {
          setSelectedFileIndex(0)
          setOpenedFile(sortedFiles[selectedFileIndex].path)
          setActiveAbsoluteElement(AbsoluteElements.None)
        }
      }}
      ref={ref}
      tabIndex={0}
    >
      {sortedFiles.length === 0 && <Text>No recent files</Text>}
      {sortedFiles.map((file) => (
        <FileItem
          key={file.name}
          file={file}
          isSelected={sortedFiles[selectedFileIndex].name === file.name}
        />
      ))}
    </Box>
  )
})

export default RecentFilesMenu
