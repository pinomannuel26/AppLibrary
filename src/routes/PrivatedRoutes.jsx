import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivatedRoutes = ({isAutenticate, redirectPath='/login', children}) => {
    if(!isAutenticate) return <Navigate to={redirectPath} replace/> /*Si no hay un usuario autenyicado me manda al login */
  return (
    <div>{children? children: <Outlet/>}</div> /**si est autenticado entonces muestre todos los compnente hijo q tiene */
  )
}

export default PrivatedRoutes