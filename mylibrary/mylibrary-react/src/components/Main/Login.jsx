import React,{useState} from 'react';

function Login(props) {
    const [formData,setFormData] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin(formData);
    }

    return (
        <form className='form-signin' onSubmit={(e)=>handleSubmit(e)}>
            <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
            <input 
                type='text' 
                id='username' 
                className='form-control' 
                placeholder='username' 
                required autoFocus 
                name='username'
                onChange={(e)=>handleUpdate(e)}
            />
            <input 
                type='password' 
                id='password' 
                className='form-control' 
                placeholder='password' 
                required 
                name='password'
                onChange={(e)=>handleUpdate(e)}
            />
            {props.loginError && <p className='text-danger'>{props.loginError}</p>}
            <a href='/signup'><p className='mt-3'>don't have an account? sign up here!</p></a>
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign In</button>
        </form>
    )
}

export default Login;