
import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import CreatePage from './pages/CreatePage'
import EditProduct from './pages/EditProduct'
import NavBar from './comonents/NavBar'

function App() {
    return (
        <div className='min-h-screen bg-base-100'>
            <NavBar />
            <main className='max-w-5xl mx-auto px-4 py-8'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create' element={<CreatePage />} />
                    <Route path='edit/:id' element={<EditProduct />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
