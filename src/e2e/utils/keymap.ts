export const getCtrlOrMetaKey = (): string => {
  if (process.env.OS === undefined || process.env.OS === null) {
    return process.platform === 'darwin' ? 'Meta' : 'Control'
  }
  return process.env.OS === 'macOS' ? 'Meta' : 'Control'
}
