import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import ViewPaste from './components/ViewPaste'
import Pastes from './components/Pastes'
import Footer from './components/Footer'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: 
      <div>
        <NavBar/>
        <Home/>
        <Footer/>
      </div>
    },
    {
      path: '/pastes',
      element: 
      <div>
        <NavBar/>
        <Pastes/>
        <Footer/>
      </div>
    },
    {
      path: '/pastes/:id',
      element: 
      <div>
        <NavBar/>
        <ViewPaste/>
        <Footer/>
      </div>
    },
  ]
)

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
