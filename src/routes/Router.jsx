import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home
 from '../pages/home/Home'
const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/AppLibrary' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router;
