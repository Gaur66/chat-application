import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

export const serverUrl= "https://chat-application-backend-fjd8.onrender.com"

createRoot(document.getElementById('root')).render(
 
<BrowserRouter>
<Provider store={store}>
    <App />
    </Provider>
</BrowserRouter>

)
