import { createBrowserRouter, RouterProvider } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "./"
import './index.css'
import App from './App.tsx'
import UserWallet from './components/UserWallet.tsx'
import Hello from './Pages/Hello.tsx'
import OAuth2Callback from './Pages/Oauth2callback.tsx'
import About from './components/About.tsx'
// import Login from './Pages/Login.tsx'
import { Buffer } from "buffer";

// Make Buffer available globally
// if (!window.Buffer) {
//   window.Buffer = Buffer;
// }
let router = createBrowserRouter([
  {
    path: "/Pages/Hello",
    element: <Hello />,
  },
  {
    path: "/Pages/Oauth2callback",
    element: <OAuth2Callback />
  },
  {
    path: "/mainpage/:usersession?",
    element: <About />
  },
  {
    path: "/wc",
    element: <UserWallet />
  },
  {
    path: "",
    element: <App />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
