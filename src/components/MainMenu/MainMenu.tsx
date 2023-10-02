import { type ReactElement, useContext } from 'react'
import Menu from '~/design-system/components/Menu/Menu'
import { mainMenuOptions } from '~/components/MainMenu/options'
import { CurrentFileContext } from '~/context/CurrentFileContext'

const MainMenu = (): ReactElement => {
  const { setOpenedFile } = useContext(CurrentFileContext)

  const newFileAction = (fileName: string): void => {
    setOpenedFile(fileName)
  }

  const options = mainMenuOptions({ newFileCallback: newFileAction }).map(
    ({ name: optionName, callback }) => ({
      id: optionName,
      content: optionName,
      onClick: callback,
    })
  )

  return (
    <Menu
      options={options}
      buttonText="Menu"
      closeOnSelect={true}
      showCheckboxOnClick={false}
    />
  )
}

export default MainMenu
