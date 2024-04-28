import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../src/componnents/LogIn';
import Home from '../src/componnents/Home';

const AppRoutes = () => {
    return (
        <Routes>
                <Route path='/' element={<LogIn/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='*' element={<h1 className='text-4xl'>404 not found</h1>} />
        </Routes>
    )
}

export default AppRoutes