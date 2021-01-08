import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = document.getElementById('app')
ReactDOM.render(<App/>, root, _ =>
  root.replaceWith(root.firstChild))
