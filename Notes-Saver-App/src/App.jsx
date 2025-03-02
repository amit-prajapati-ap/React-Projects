import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import PageNotFound from './components/PageNotFound'
import HomePage from './pages/HomePage'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import PastesPage from './pages/PastesPage'
import ViewPage from './pages/ViewPage'
import AuthForm from './components/AuthForm'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: 
      <div>
        <Navbar/>
        <HomePage/>
        <Footer/>
      </div>
    },
    {
      path: '/login',
      element: 
      <div>
        <AuthLayout authentication = {false}>
        <Navbar/>
        <AuthForm/>
        <Footer/>
        </AuthLayout>
      </div>
    },
    {
      path: '/pastes',
      element: 
      <div>
        <AuthLayout authentication errorMessage = "Please Login for Accessing your Pastes">
        <Navbar/>
        <PastesPage/>
        <Footer/>
        </AuthLayout>
      </div>
    },
    {
      path: '/view/:id',
      element: 
      <div>
        <AuthLayout authentication errorMessage = "Please Login for View the Paste">
        <Navbar/>
        <ViewPage/>
        <Footer/>
        </AuthLayout>
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
    <div className='w-screen bg-gray-950'>
      <div className='w-full max-w-[1440px] h-full mx-auto'>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
