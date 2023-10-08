import React, {
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { invoke } from '@tauri-apps/api/tauri'
import { type RightClickedItem } from '~/components/Sidebar/Sidebar'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const RenameModal = ({
  rightClickedItem,
  isOpen,
  onClose,
}: {
  rightClickedItem: RightClickedItem | null
  isOpen: boolean
  onClose: () => void
}): ReactElement => {
  const [newFileName, setNewFileName] = useState('')
  const { setOpenedFile } = useContext(CurrentFileContext)

  useEffect(() => {
    setNewFileName(rightClickedItem?.file?.name.split('.')[0] ?? '')
  }, [rightClickedItem])

  const isFileNameInvalid = newFileName === ''

  const onRename = async (): Promise<void> => {
    if (isFileNameInvalid) {
      return
    }
    await invoke('rename_file', {
      path: rightClickedItem?.file?.path ?? '',
      newName: newFileName,
    }).then((filePath) => {
      setOpenedFile(filePath as string)
      onClose()
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Rename {rightClickedItem?.file?.name ?? '???'}
        </ModalHeader>
        <ModalCloseButton tabIndex={4} />
        <ModalBody>
          <FormControl isInvalid={isFileNameInvalid} isRequired>
            <FormLabel>Rename file</FormLabel>
            <Input
              tabIndex={1}
              defaultValue={newFileName}
              onChange={(e) => {
                setNewFileName(e.target.value)
              }}
            />
            {isFileNameInvalid && (
              <FormErrorMessage>File name cannot be empty</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button tabIndex={2} colorScheme="red" me={2} onClick={onRename}>
            Rename
          </Button>
          <Button tabIndex={3} colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RenameModal
