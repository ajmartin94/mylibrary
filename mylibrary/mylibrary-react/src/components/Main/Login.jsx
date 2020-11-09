import React from 'react';

function Login(props) {
    return (
        <form className='form-signin'>
            <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
            <input type='text' id='username' className='form-control' placeholder='username' required autoFocus />
            <input type='password' id='password' className='form-control' placeholder='password' required />
            <a href='/signup'><p className='mt-3'>don't have an account? sign up here!</p></a>
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign In</button>
        </form>
    )
}

export default Login;