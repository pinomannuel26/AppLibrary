import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../routes/Router';
import './NavBar.scss'

const NavBar = () => {
    const links =[
        {
            id: 1,
            link:'/',
            label:'Home',
            AuthRequired:true /**Para decirle a rect si se meseta esta o no autenticado para acceder a esta pag */
        },
        {
            id: 2,
            link:'/login',
            label:'Login',
            AuthRequired:false /**Para decirle a rect si se meseta esta o no autenticado para acceder a esta pag */
        },
        {
            id: 3,
            link:'/register',
            label:'Register',
            AuthRequired:false /**Para decirle a rect si se meseta esta o no autenticado para acceder a esta pag */
        }
    ];

    const {isUsserLogged} =useContext(AppContext);
  return (
    <div className='navContainer'>
        {
            links.map(link => <NavLink key={link.id} to={link.link} className={isUsserLogged === link.AuthRequired? 'navContainer__link':'navContainer__link hidder' }>{link.label} </NavLink>)
        }
    </div>
  )
}

export default NavBar