import React,{useState} from 'react';
import AddLibrary from '../Main/AddLibrary';
import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <Link className="navbar-brand" to="/library">MyLibrary</Link>
            {props.user ?
                <Link className='nav-link' to='#' onClick={props.handleLogout}>Log Out, {props.user.username}</Link>
            :
                <Link className='nav-link' to='/login'>Log in</Link>
            }
        </nav>
    )
}

export default Header;
