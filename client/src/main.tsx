//packages
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

//component
import App from './App.tsx';

//css
import './index.css';

//state store
import { store } from "./app/store.tsx";



ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
