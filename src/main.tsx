import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import Root from '~/Root'

// The below code removes the default Tauri ctrl-R behavior of refreshing the window
document.addEventListener('keydown', function (event) {
  // Prevent F5 or Ctrl+R (Windows/Linux) and Command+R (Mac) from refreshing the page
  if (
    event.key === 'F5' ||
    (event.ctrlKey && event.key === 'r') ||
    (event.metaKey && event.key === 'r')
  ) {
    event.preventDefault()
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
