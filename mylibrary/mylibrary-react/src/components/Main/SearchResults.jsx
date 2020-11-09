import Axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    flex-wrap: wrap;
`

function SearchResults(props) {
    const handleClick = (key) => {
        const identifier = key.replace('/works/','');
        axios.get(`http://localhost:8000/library/select/${identifier}`)
        .then(resp => {
            console.log(resp)
        })
    }

    return (
        <CardWrapper>
            {props.searchData.map(result => {
                return (
                    <div className='card w-25'>
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