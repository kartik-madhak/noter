import { Menu, MenuItem, MenuList } from '@chakra-ui/react'
import { type ReactElement, useEffect, useRef, useState } from 'react'
import { type RightClickedItem } from '~/components/Sidebar/Sidebar'

const RightClickMenu = ({
  rightClickedItem,
  onRenameModalOpened,
  onDeleteModalOpened,
}: {
  rightClickedItem: RightClickedItem | null
  onRenameModalOpened: () => void
  onDeleteModalOpened: () => void
}): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rightClickedItem == null) {
      return
    }
    if (ref.current == null) {
      return
    }
    const parent = ref.current.parentElement

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
      const current = ref.current
      if (current == null) {
        return
      }
      if (!current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Menu isOpen={isOpen && rightClickedItem != null}>
      <MenuList ref={ref}>
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
      </MenuList>
    </Menu>
  )
}

export default RightClickMenu
