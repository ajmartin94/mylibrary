import React,{useState} from 'react';
import styled from 'styled-components';

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
            {/* <div className="modal show fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailsModalLabel">{activeBook.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="media">
                                <img src={`http://covers.openlibrary.org/b/id/${activeBook.data.covers[0]}-M.jpg`} className="mr-3" alt="..." />
                                <div className="media-body">
                                    {activeBook.data.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default LibraryContent;