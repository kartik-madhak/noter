import React, { type ReactElement } from 'react'
import { Box, Text } from '@chakra-ui/react'

const SidebarItem = ({
  fileName,
  backgroundColor,
}: {
  fileName: string
  backgroundColor: string
}): ReactElement => {
  const extension = fileName.split('.').pop()

  const icon = extension === 'md' ? '📝' : '📄'

  return (
    <Box
      ms={6}
      mb={2}
      height={5}
      _hover={{ background: backgroundColor, cursor: 'pointer' }}
    >
      <Text display="flex" whiteSpace="nowrap">
        {icon}
        {fileName}
      </Text>
    </Box>
  )
}

export default SidebarItem
