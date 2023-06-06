import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { Provider } from 'react-redux'
import store from '../store.js'
import ZoomImage from './ZoomImage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ZoomImage />
    <App />
  </Provider>
)
