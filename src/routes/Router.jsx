import React, { createContext, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import PrivatedRoutes from './PrivatedRoutes'
import PublicRoutes from './publicRoutes'

/**CREACION DE USE CONTECT */
export const AppContext = createContext({});

const Router = () => {
  const [isUsserLogged, setIsUserLogged] = useState(true);
  return (
    <BrowserRouter basename='/AppLibrary'>
        <AppContext.Provider value={{isUsserLogged, setIsUserLogged}}>
          <Routes>
            <Route element={<Layout  />}>
              <Route element= {<PrivatedRoutes isAutenticate={isUsserLogged}/>} >
                  <Route index element={<Home/>}/>
              </Route>
              <Route element={<PublicRoutes isAutenticate={isUsserLogged}/>}>
                  <Route path='login' element={<Login/>}/>
                  <Route path='Register' element={<Register/>}/>
              </Route>
            </Route>
          </Routes>
        </AppContext.Provider>
    </BrowserRouter>
  )
}

export default Router;
