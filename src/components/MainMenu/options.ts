import { invoke } from '@tauri-apps/api/tauri'
import { exit } from '@tauri-apps/api/process'

interface Option {
  name: string
  callback: () => void
}

export const mainMenuOptions = ({
  newFileCallback,
}: {
  newFileCallback: (file: string) => void
}): Option[] => [
  {
    name: 'New File',
    callback: () => {
      void invoke('new_file', { name: new Date().toISOString() }).then(
        (file) => {
          newFileCallback(file as string)
        }
      )
    },
  },
  {
    name: 'Exit',
    callback: () => {
      void exit()
    },
  },
]
