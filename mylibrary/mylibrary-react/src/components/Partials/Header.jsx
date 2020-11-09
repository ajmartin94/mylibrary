import React from 'react';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">MyLibrary</a>
            <a className='nav-link' href='/login'>Log in</a>
        </nav>
    )
}

export default Header;
