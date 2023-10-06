import React, { type ReactElement } from 'react'
import { Box, Text } from '@chakra-ui/react'

const SidebarItem = ({
  fileName,
  backgroundColor,
  onClick,
}: {
  fileName: string
  backgroundColor: string
  onClick: () => void
}): ReactElement => {
  const extension = fileName.split('.').pop()

  const icon = extension === 'md' ? '📝' : '📄'

  return (
    <Box
      ms={6}
      py={1}
      backgroundColor={backgroundColor}
      _hover={{ cursor: 'default' }}
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
