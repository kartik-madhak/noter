import React, { type ReactElement } from 'react'
import { Box, Text } from '@chakra-ui/react'

const SidebarItem = ({
  fileName,
  backgroundColor,
  hoverBackgroundColor,
  onClick,
}: {
  fileName: string
  backgroundColor: string
  hoverBackgroundColor: string
  onClick: () => void
}): ReactElement => {
  const extension = fileName.split('.').pop()

  const icon = extension === 'md' ? '📝' : '📄'

  return (
    <Box
      ms={6}
      mb={2}
      height={5}
      backgroundColor={backgroundColor}
      _hover={{ background: hoverBackgroundColor, cursor: 'pointer' }}
      onClick={onClick}
    >
      <Text display="flex" whiteSpace="nowrap">
        {icon}
        {fileName}
      </Text>
    </Box>
  )
}

export default SidebarItem
