import React,{useState} from 'react';
import styled from 'styled-components';
import Details from './Details';

const BookCard = styled.div`
    width: 25%;
    cursor: pointer;
`

function LibraryContent(props) {
    const [activeBook,setActiveBook] = useState(null)

    return (
        <>
            {props.books.map(book => {
                return <BookCard className='card'>
                    <img 
                        src={`http://covers.openlibrary.org/b/id/${book.data.covers[0]}-L.jpg`} 
                        className='card-img-top'
                        alt={`cover for ${book.title}`}  
                        data-toggle='modal' 
                        data-target='detailsModal' 
                        onClick={()=>setActiveBook(book)}  
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{book.title}</h5>
                        {/* <p className='card-text'>{typeof book.data.description !== 'string' && Object.keys(book.data.description).length > 0 ? book.data.description.value : book.data.description}</p> */}
                    </div>
                </BookCard>
            })}
            {activeBook && <Details book={activeBook} setActiveBook={setActiveBook}/>}
        </>
    )
}

export default LibraryContent;