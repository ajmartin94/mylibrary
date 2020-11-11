import React from 'react';
import styled from 'styled-components';

const BookCard = styled.div`
    width: 25%;
`

function LibraryContent(props) {
    return (
        <>
        {props.books.map(book => {
            return <BookCard className='card'>
                <img 
                    src={`http://covers.openlibrary.org/b/id/${book.data.covers[0]}-M.jpg`} 
                    className='card-img-top'
                    alt={`cover for ${book.title}`}    
                />
                <div className='card-body'>
                    <h5 className='card-title'>{book.title}</h5>
                    <p className='card-text'>{book.data.description}</p>
                </div>
            </BookCard>
        })}
        </>
    )
}

export default LibraryContent;