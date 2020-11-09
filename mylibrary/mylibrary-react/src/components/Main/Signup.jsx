import React, {useState} from 'react';

function Signup(props) {
    const [formData,setFormData] = useState(null)

    const handleUpdate = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSignUp(formData);
    }

    return (
        <form className='form-signin' onSubmit={(e)=>handleSubmit(e)}>
            <h1 className='h3 mb-3 font-weight-normal'>Sign up</h1>
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
            <input 
                type='email' 
                id='email' 
                className='form-control' 
                placeholder='email' 
                required 
                name='email'
                onChange={(e)=>handleUpdate(e)} 
            />
            <input 
                type='text' 
                id='first_name' 
                className='form-control' 
                placeholder='first name' 
                required 
                name='first_name'
                onChange={(e)=>handleUpdate(e)} 
            />
            <input 
                type='text' 
                id='last_name' 
                className='form-control' 
                placeholder='last name' 
                required 
                name='last_name'
                onChange={(e)=>handleUpdate(e)} 
            />
            <button 
                className='btn btn-lg btn-primary btn-block mt-3' 
                type='submit'
            >Sign up</button>
        </form>
    )
}

export default Signup;