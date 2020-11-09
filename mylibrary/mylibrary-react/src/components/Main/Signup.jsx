import React, {useState} from 'react';

function Signup(props) {

    return (
        <form className='form-signin'>
            <h1 className='h3 mb-3 font-weight-normal'>Sign up</h1>
            <input type='text' id='username' className='form-control' placeholder='username' required autoFocus />
            <input type='password' id='password' className='form-control' placeholder='password' required />
            <input type='email' id='email' className='form-control' placeholder='email' required />
            <input type='text' id='first_name' className='form-control' placeholder='first name' required />
            <input type='text' id='last_name' className='form-control' placeholder='last name' required />
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign up</button>
        </form>
    )
}

export default Signup;