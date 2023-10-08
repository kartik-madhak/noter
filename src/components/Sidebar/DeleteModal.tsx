import React, { type ReactElement, useContext } from 'react'
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { invoke } from '@tauri-apps/api/tauri'
import { type RightClickedItem } from '~/components/Sidebar/Sidebar'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const DeleteModal = ({
  rightClickedItem,
  isOpen,
  onClose,
}: {
  rightClickedItem: RightClickedItem | null
  isOpen: boolean
  onClose: () => void
}): ReactElement => {
  const { setOpenedFile } = useContext(CurrentFileContext)

  const onDelete = async (): Promise<void> => {
    await invoke('delete_file', {
      path: rightClickedItem?.file?.path ?? '',
    }).then((res) => {
      console.log(res)
      setOpenedFile('')
      onClose()
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to delete{' '}
          {rightClickedItem?.file?.name ?? '???'}?
        </ModalHeader>
        <ModalCloseButton tabIndex={2} />

        <ModalFooter>
          <Button tabIndex={3} colorScheme="red" me={2} onClick={onDelete}>
            Delete
          </Button>
          <Button tabIndex={1} colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default DeleteModal
