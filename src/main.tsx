import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import Root from '~/Root'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
