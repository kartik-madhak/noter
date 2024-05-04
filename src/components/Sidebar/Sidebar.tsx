import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  type ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useCustomTheme } from '~/hooks/useCustomTheme'
import SidebarItem from '~/components/Sidebar/SidebarItem'
import { CurrentFileContext } from '~/context/CurrentFileContext'
import RightClickMenu from '~/components/Sidebar/RightClickMenu'
import RenameModal from '~/components/Sidebar/RenameModal'
import DeleteModal from '~/components/Sidebar/DeleteModal'
import NewFileModal from '~/components/Sidebar/NewFileModal'
import FolderIcon from '~/assets/icons/folderIcon'

export interface File {
  name: string
  path: string
}

export interface RightClickedItem {
  file: File | null
  x: number
  y: number
}

const Sidebar = ({
  onFileClose,
}: {
  onFileClose: () => void
}): ReactElement => {
  const {
    theme: { sidebarColor },
  } = useCustomTheme()

  const [files, setFiles] = useState<File[]>([])
  const { openedFile, setOpenedFile, isNewFile } =
    useContext(CurrentFileContext)
  const [rightClickedItem, setRightClickedItem] =
    useState<RightClickedItem | null>(null)
  const [disableRightClickHighlight, setDisableRightClickHighlight] =
    useState(false)

  const {
    isOpen: isRenameModalOpened,
    onOpen: onRenameModalOpen,
    onClose: onRenameModalClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpened,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure()
  const {
    isOpen: isNewFileModalOpened,
    onOpen: onNewFileModalOpen,
    onClose: onNewFileModalClose,
  } = useDisclosure()

  const {
    theme: { type: themeType },
  } = useCustomTheme()

  const filesAreaRef = useRef<HTMLDivElement>(null)

  // TODO: Move this to theme
  const backgroundColor = themeType === 'light' ? '#CCC' : '#333'

  useEffect(() => {
    const getAllFiles = async (): Promise<void> => {
      const files: [File] = await invoke('read_main_directory')
      setFiles(files)
      if (isNewFile) {
        const toRenameFile = files.find((file) => file.path === openedFile)
        if (toRenameFile != null) {
          setRightClickedItem({
            file: toRenameFile,
            x: -1,
            y: -1,
          })
          onRenameModalOpen()
        }
      }
    }
    void getAllFiles()
  }, [openedFile, isNewFile])

  return (
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      background={sidebarColor}
      onContextMenu={(event) => {
        event.preventDefault()
        if (
          filesAreaRef.current == null ||
          filesAreaRef.current.contains(event.target as Node)
        ) {
          return
        }
        setRightClickedItem({
          file: null,
          x: event.clientX,
          y: event.clientY,
        })
      }}
    >
      <Accordion
        allowToggle
        defaultIndex={[0]}
        border={sidebarColor}
        fontSize="sm"
      >
        <AccordionItem border={0}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                _hover={{ background: backgroundColor }}
                border={sidebarColor}
              >
                {isExpanded ? (
                  <AccordionIcon transform="rotate(0deg)" />
                ) : (
                  <AccordionIcon transform="rotate(-90deg)" />
                )}
                <Text
                  as="div"
                  display="flex"
                  whiteSpace="nowrap"
                  alignItems="center"
                >
                  <FolderIcon />
                  <Text ms={1}>noter</Text>
                </Text>
              </AccordionButton>
              <AccordionPanel p={0} ref={filesAreaRef}>
                {files.map((file, index) => {
                  return (
                    <SidebarItem
                      key={index}
                      isSelected={openedFile === file.path}
                      fileInfo={file}
                      onClick={(): void => {
                        onFileClose()
                        setOpenedFile(file.path)
                      }}
                      isRightClicked={
                        rightClickedItem?.file?.name === file.name &&
                        !disableRightClickHighlight
                      }
                      setRightClickedItem={setRightClickedItem}
                      onSelectBackgroundColor={backgroundColor}
                      setDisableRightClickHighlight={
                        setDisableRightClickHighlight
                      }
                    />
                  )
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <RightClickMenu
        rightClickedItem={rightClickedItem}
        onRenameModalOpened={onRenameModalOpen}
        onDeleteModalOpened={onDeleteModalOpen}
        onNewFileModalOpened={onNewFileModalOpen}
        setDisableRightClickHighlight={setDisableRightClickHighlight}
      />
      <RenameModal
        rightClickedItem={rightClickedItem}
        isOpen={isRenameModalOpened}
        onClose={onRenameModalClose}
      />
      <DeleteModal
        rightClickedItem={rightClickedItem}
        isOpen={isDeleteModalOpened}
        onClose={onDeleteModalClose}
      />
      <NewFileModal
        isOpen={isNewFileModalOpened}
        onClose={onNewFileModalClose}
      />
    </Box>
  )
}

export default Sidebar
