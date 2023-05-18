import Menu from '~/design-system/components/Menu/Menu'

const FileMenu = (): JSX.Element => {
  const optionsNames = ['New File', 'Open', 'Save File', 'Exit']

  const options = optionsNames.map((optionName) => ({
    id: optionName,
    content: optionName,
    onClick: () => {
      console.log(optionName)
    },
  }))

  return <Menu options={options} buttonText="Menu" />
}

export default FileMenu
