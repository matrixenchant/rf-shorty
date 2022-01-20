import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

export const Navbar = () => {
    const auth = useContext(AuthContext)

    return (
        <nav className="orange">
            <div className="nav-wrapper" style={{ padding: '0 50px' }}>
            <div className="brand-logo">Shorty</div>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Сократить ссылку</NavLink></li>
                <li><NavLink to="/links">Ваши ссылки</NavLink></li>
                <li><a href="/" onClick={auth.logout}><i className="large material-icons">exit_to_app</i></a></li>
            </ul>
            </div>
        </nav>
    )
}