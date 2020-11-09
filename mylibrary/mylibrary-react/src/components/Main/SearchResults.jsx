import Axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    flex-wrap: wrap;
`

function SearchResults(props) {
    const history = useHistory();

    const handleClick = (key) => {
        const identifier = key.replace('/works/','');
        axios.get(`http://localhost:8000/library/select/${identifier}`)
        .then(resp => {
            history.push('/')
        })
    }

    return (
        <CardWrapper>
            {props.searchData.map((result,index) => {
                return (
                    <div className='card w-25' key={index}>
                        <div className='card-body'>
                            <h5 className='card-title'>{result.title_suggest}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>{result.author_name}</h6>
                            <button 
                                onClick={()=>handleClick(result.key)} 
                                className='btn btn-primary'
                            >Add to Library</button>
                        </div>
                    </div>
                )
            })}
        </CardWrapper>
    )
}

export default SearchResults;