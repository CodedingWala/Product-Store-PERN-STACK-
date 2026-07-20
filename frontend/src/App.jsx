
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import CreatePage from './pages/CreatePage'
import NavBar from './components/NavBar'
import useAuthReq from './hooks/useAuthReq'
import useUserSync from './hooks/useUserSync'
import EditProductPage from './pages/EditProductPage'






function App() {
    const { isClerkLoaded, isSignedIn } = useAuthReq()
    const {isSynced}=useUserSync()
    if (!isClerkLoaded) return null;
    return (
        <div className='min-h-screen bg-base-100'>
            <NavBar />
            <main className='max-w-5xl mx-auto px-4 py-8'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                    <Route path='/profile' element={isSignedIn?<Profile />:<Navigate to={"/"} />} />
                    <Route path='/create' element={isSignedIn? <CreatePage />:<Navigate to={"/"} />} />
                    <Route path='edit/:id' element={isSignedIn?<EditProductPage/>:<Navigate to={"/"} />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
