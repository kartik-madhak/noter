import { type ReactElement } from 'react'
import { Icon } from '@chakra-ui/icons'

const FolderIcon = (): ReactElement => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" boxSize={4}>
      <path
        fill="#444D42"
        d="M67.5 36.5c-15.34-.17-30.67 0-46 .5-5.18 1.35-8.51 4.52-10 9.5-.33-5.1.17-10.1 1.5-15 1.5-2.83 3.67-5 6.5-6.5a340.8 340.8 0 0 1 37 0c3.87 3.7 7.54 7.54 11 11.5Z"
      />
      <path
        fill="#2f362e"
        d="M67.5 36.5c20.34-.17 40.67 0 61 .5 4.17 1.5 7 4.33 8.5 8.5.67 23.33.67 46.67 0 70a15.6 15.6 0 0 1-7.5 8.5c-37.42.99-74.75.65-112-1a15.3 15.3 0 0 1-5.5-7.5c-.5-23-.67-46-.5-69 1.49-4.98 4.82-8.15 10-9.5 15.33-.5 30.66-.67 46-.5Z"
      />
    </Icon>
  )
}

export default FolderIcon
