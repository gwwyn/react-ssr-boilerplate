import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.hydrate(
  <BrowserRouter>
    <App initData={window.__INITIAL_DATA__ || null} />
  </BrowserRouter>,
  document.getElementById('app')
)
