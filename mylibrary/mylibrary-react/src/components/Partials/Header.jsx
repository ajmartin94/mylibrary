import React,{useState} from 'react';
import AddLibrary from '../Main/AddLibrary';
import {Link} from 'react-router-dom';

function Header(props) {
    const [visible,setVisible] = useState(false)

    const flipVisible = () => {
        setVisible(!visible);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <Link className="navbar-brand" to="/library">MyLibrary</Link>
            {!visible ? 
                <button className='btn btn-secondary' onClick={flipVisible}>Add New Library</button>
            :
                <AddLibrary user={props.user} setVisible={setVisible}/>
            }
            {props.user ?
                <Link className='nav-link' to='#' onClick={props.handleLogout}>Log Out, {props.user.name}</Link>
            :
                <Link className='nav-link' to='/login'>Log in</Link>
            }
        </nav>
    )
}

export default Header;
