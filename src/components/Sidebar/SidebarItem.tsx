import React, { type ReactElement } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { type File, type RightClickedItem } from '~/components/Sidebar/Sidebar'

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
  const extension = fileName.split('.').pop()
  const icon = extension === 'md' ? '📝' : '📄'

  return (
    <Box
      ms={6}
      py={1}
      backgroundColor={
        isSelected || isRightClicked ? onSelectBackgroundColor : 'transparent'
      }
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
      <Text display="flex" whiteSpace="nowrap">
        {icon}
        {fileName}
      </Text>
    </Box>
  )
}

export default SidebarItem
