import React from 'react'
import './styles.css'
import { Link, Outlet, Route, Routes, useLocation, useMatch } from 'react-router-dom'
 

function Admin() {
    const {pathname} = useLocation
    console.log(pathname)
    return (
        <div>
            <nav>
                <ul className='admin-menu'>
                    <li>
                        <Link to={'/admin'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/admin/orders'}>Orders</Link>
                    </li>
                    <li>
                        <Link to={'/admin/products'}>Products</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Admin