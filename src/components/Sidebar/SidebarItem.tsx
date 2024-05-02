import React, { type ReactElement } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { type File, type RightClickedItem } from '~/components/Sidebar/Sidebar'
import FileIcon from '~/assets/icons/fileIcon'

const SidebarItem = ({
  fileInfo,
  isSelected,
  onClick,
  setRightClickedItem,
  isRightClicked,
  onSelectBackgroundColor,
  setDisableRightClickHighlight,
}: {
  fileInfo: File
  isSelected: boolean
  onClick: () => void
  setRightClickedItem: (_: RightClickedItem) => void
  isRightClicked: boolean
  onSelectBackgroundColor: string
  setDisableRightClickHighlight: (_: boolean) => void
}): ReactElement => {
  const fileName = fileInfo.name

  return (
    <Box
      ms={3}
      px={2}
      py={1}
      backgroundColor={
        isSelected || isRightClicked ? onSelectBackgroundColor : 'transparent'
      }
      borderRadius={4}
      _hover={{ cursor: 'default' }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault()
        setRightClickedItem({
          file: fileInfo,
          x: e.clientX,
          y: e.clientY,
        })
        setDisableRightClickHighlight(false)
      }}
    >
      <Text as="div" display="flex" whiteSpace="nowrap" alignItems="center">
        <FileIcon />
        <Text ms={1}>{fileName}</Text>
      </Text>
    </Box>
  )
}

export default SidebarItem
