import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home.jsx'
import Dogs from './pages/dogs.jsx'
import '/src/css/header.css';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import About from './pages/about.jsx'
import DogDetails from './pages/DogDetails.jsx'

const router = createHashRouter([
    {
        path: "/",
        element: <RootLayout />, // För samma header på alla sidor
        children: [
            {
                path: "/",
                element: <Home />
            },

            {
                path: "/home",
                element: <Home />
            },

            {
                path: "/dogs",
                element: <Dogs />
            },

                        {
                path: "/dogs/:chipNumber",
                element: <DogDetails />
            },
            
                        {
                path: "/about",
                element: <About />
            },
        ]
    }
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
