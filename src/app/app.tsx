/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initApp } from '@widgets/data'
import { NotificationsStuck } from '@shared/notifications'

import { Router } from './router'
import './app.css'

const App = () => {
  return (
    <React.StrictMode>
      <Router />
      <initApp.InitApp />
      <NotificationsStuck />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
