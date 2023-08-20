import { type ReactElement } from 'react'
import Menu from '~/design-system/components/Menu/Menu'
import { MainMenuOption } from '~/components/MainMenu/options'

const MainMenu = (): ReactElement => {
  const options = Object.entries(MainMenuOption).map(([, optionName]) => ({
    id: optionName,
    content: optionName,
    onClick: () => {
      console.log(optionName)
    },
  }))

  return <Menu options={options} buttonText="Menu" />
}

export default MainMenu
