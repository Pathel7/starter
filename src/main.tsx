
import { createRoot } from 'react-dom/client'
import './global.css'
import './index.css'


import App from './App.tsx'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from './Redux/store.ts'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={Store}>
    <Router>
      <App/>
    </Router>

  </Provider>
    
</React.StrictMode>,
)
