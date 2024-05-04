import React, {
  type MouseEventHandler,
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
  const [customError, setCustomError] = useState('')
  const { setOpenedFile, isNewFile } = useContext(CurrentFileContext)

  useEffect(() => {
    const initName = rightClickedItem?.file?.name.split('.')[0] ?? ''
    setNewFileName(initName)
    setCustomError('')
  }, [rightClickedItem])

  const clearEverything = (): void => {
    setNewFileName('')
    setCustomError('')
  }

  const onRename = async (): Promise<void> => {
    setOpenedFile(null, false)

    await invoke('rename_file', {
      path: rightClickedItem?.file?.path ?? '',
      newName: newFileName,
    })
      .then((filePath) => {
        setOpenedFile(filePath as string)
        clearEverything()
        onClose()
      })
      .catch((err) => {
        setCustomError(err)
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
          <FormControl isInvalid={customError !== ''} isRequired>
            <FormLabel>Rename file</FormLabel>
            <Input
              onFocus={(e) => {
                if (isNewFile) {
                  setTimeout(e.target.select.bind(e.target), 20)
                }
              }}
              tabIndex={1}
              defaultValue={newFileName}
              onChange={(e) => {
                setNewFileName(e.target.value)
              }}
              onKeyDown={(event): void => {
                if (event.key === 'Enter') {
                  void onRename().then()
                }
              }}
            />
            {customError !== '' && (
              <FormErrorMessage>{customError}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            tabIndex={2}
            colorScheme="red"
            me={2}
            onClick={onRename as MouseEventHandler}
          >
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
