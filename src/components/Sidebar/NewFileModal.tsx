import React, {
  type MouseEventHandler,
  type ReactElement,
  useCallback,
  useContext,
  useState,
  useEffect,
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
import { CurrentFileContext } from '~/context/CurrentFileContext'

const NewFileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}): ReactElement => {
  const [newFileName, setNewFileName] = useState('')
  const [customError, setCustomError] = useState('')
  const { setOpenedFile } = useContext(CurrentFileContext)

  const clearEverything = (): void => {
    setNewFileName('')
    setCustomError('')
  }

  const onNewFile = async (): Promise<void> => {
    await invoke('new_file', {
      name: newFileName,
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

  const onCloseWithClear = useCallback(() => {
    clearEverything()
    onClose()
  }, [])

  // use the synthetic react keyboard event
  const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onNewFile()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseWithClear} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New file</ModalHeader>
        <ModalCloseButton tabIndex={4} />
        <ModalBody>
          <FormControl isInvalid={customError !== ''} isRequired>
            <FormLabel>File name</FormLabel>
            <Input
              tabIndex={1}
              defaultValue={newFileName}
              onChange={(e) => {
                setNewFileName(e.target.value)
              }}
              onKeyDown={(e) => handleKeyDownEvent(e)}
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
            onClick={onNewFile as MouseEventHandler}
          >
            Create
          </Button>
          <Button
            tabIndex={3}
            colorScheme="blue"
            mr={3}
            onClick={onCloseWithClear}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewFileModal
