import React from 'react'
import ReactDOM from 'react-dom'
import App from './comps/App'

const root = document.getElementById('app')
ReactDOM.render(<App/>, root, _ =>
  root.replaceWith(root.firstChild))
