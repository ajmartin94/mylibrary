import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import SearchResults from './SearchResults';

function SearchForm(props) {
    const [searchCriteria,setSearchCriteria] = useState('')
    const [searchData,setSearchData] = useState(null)
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()
        const encodedSearchCriteria = encodeURI(searchCriteria);
        axios.get(`http://openlibrary.org/search.json?title=${encodedSearchCriteria}`)
        .then(resp => {
            const relevant_data = resp.data.docs.slice(0,10)
            setSearchData(relevant_data)
        })
    }

    const handleChange = (e) => {
        setSearchCriteria(e.target.value);
    }

    return (
        <>
            <form className='form-inline' onSubmit={(e)=>handleSearch(e)}>
                <input 
                    type='text' 
                    className='form-control mb-2 mr-sm-2' 
                    id='search' 
                    placeholder='find a book' 
                    onChange={(e)=>handleChange(e)}
                />
                <button type='submit' className='btn btn-primary mb-2'>Search</button>
            </form>
            {searchData && <SearchResults searchData={searchData} handleAddToLibrary={props.handleAddToLibrary} setSearchData={setSearchData} />}
        </>
    )
}

export default SearchForm;