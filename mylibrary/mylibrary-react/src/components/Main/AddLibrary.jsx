import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

function AddLibrary(props) {
    const [name, setName] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8000/library/addlibrary',
            data: {
                name: name,
                username: props.user.username
            }
        })
        .then(resp => {
            setName('')
            props.setVisible(false)
            history.push('/library')
        })

    }

    const updateName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    return (
        <form className='form-inline' onSubmit={(e)=>handleSubmit(e)}>
            <input 
                type='text' 
                placeholder='library name'
                className='form-control mb-2 mr-sm-2' 
                onChange={(e)=>{updateName(e)}}
            />
            <button type='submit' className='btn btn-primary mb-2'>Add Library</button>
        </form>
    )
}

export default AddLibrary;