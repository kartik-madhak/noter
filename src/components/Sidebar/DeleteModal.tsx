import React, {
  type MouseEventHandler,
  type ReactElement,
  useContext,
} from 'react'
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

  const onDelete = async (e: React.KeyboardEvent): Promise<void> => {
    if (e instanceof MouseEvent || (e instanceof KeyboardEvent && e.key === 'Enter')) {
      void invoke('delete_file', {
        path: rightClickedItem?.file?.path ?? '',
      })
      .then(() => {
        setOpenedFile('')
        onClose()
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onDelete()
      }
    }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to delete{' '}
          {rightClickedItem?.file?.name ?? '???'}?
        </ModalHeader>
        <ModalCloseButton tabIndex={2} />

        <ModalFooter>
          <Button
            tabIndex={3}
            colorScheme="red"
            me={2}
            onClick={onDelete as MouseEventHandler<HTMLButtonElement>}
            onKeyDown={onDelete}
          >
            Delete
          </Button>
          <Button
            tabIndex={1}
            colorScheme="blue"
            mr={3}
            onClick={onClose as MouseEventHandler}
            onKeyDown={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default DeleteModal
