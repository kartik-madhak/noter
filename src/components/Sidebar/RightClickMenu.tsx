import { Menu, MenuItem, MenuList } from '@chakra-ui/react'
import { type ReactElement, useEffect, useRef, useState } from 'react'
import { type RightClickedItem } from '~/components/Sidebar/Sidebar'

const RightClickMenu = ({
  rightClickedItem,
  onRenameModalOpened,
  onDeleteModalOpened,
  onNewFileModalOpened,
  setDisableRightClickHighlight,
}: {
  rightClickedItem: RightClickedItem | null
  onRenameModalOpened: () => void
  onDeleteModalOpened: () => void
  onNewFileModalOpened: () => void
  setDisableRightClickHighlight: (_: boolean) => void
}): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rightClickedItem == null) {
      return
    }
    if (menuRef.current == null) {
      return
    }
    const parent = menuRef.current.parentElement

    if (parent != null) {
      parent.style.left = `${rightClickedItem.x}px`
      parent.style.top = `${rightClickedItem.y - 60}px`
    }

    setTimeout(() => {
      setIsOpen(true)
    }, 50)
  }, [rightClickedItem])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const current = menuRef.current
      if (current == null) {
        return
      }
      if (!current.contains(event.target as Node)) {
        setDisableRightClickHighlight(true)
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Menu
      isOpen={
        isOpen &&
        rightClickedItem != null &&
        rightClickedItem.x >= 0 &&
        rightClickedItem.y >= 0
      }
    >
      <MenuList ref={menuRef}>
        <MenuItem
          onClick={() => {
            setIsOpen(false)
            onNewFileModalOpened()
          }}
        >
          New File
        </MenuItem>
        {rightClickedItem?.file != null && (
          <>
            <MenuItem
              onClick={() => {
                setIsOpen(false)
                onRenameModalOpened()
              }}
            >
              Rename
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsOpen(false)
                onDeleteModalOpened()
              }}
            >
              Delete
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}

export default RightClickMenu
