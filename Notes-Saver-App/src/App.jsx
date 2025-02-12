import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import ViewPaste from './components/ViewPaste'
import Pastes from './components/Pastes'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import Navbar from './components/NavBar'

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
      path: '/view/:id',
      element: 
      <div>
        <NavBar/>
        <ViewPaste/>
        <Footer/>
      </div>
    },
    {
      path: '*',
      element: 
      <div>
        <Navbar/>
        <PageNotFound/>
        <Footer/>
      </div>
    },
  ]
)

const App = () => {
  return (
    <div className='w-full h-screen bg-slate-950'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
