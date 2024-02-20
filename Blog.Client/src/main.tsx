import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.module.scss'
import './style/global.scss'
import {Provider} from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
