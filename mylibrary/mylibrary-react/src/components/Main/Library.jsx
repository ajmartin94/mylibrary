import React,{useState,useEffect} from 'react';
import LibraryContent from './LibraryContent';
import styled from 'styled-components';

const LibraryDiv = styled.div`
    width: 75%;
`

const Tab = styled.div`
    cursor: pointer;
`

function Library(props) {
    const handleClick = (id) => {
        console.log(id)
        props.setActiveLibraryID(id)
    }

    return (
        <LibraryDiv>
            <ul className='nav nav-tabs' id='libraryTabs' role='tablist'>
                {props.libraryData.map((library,index) => {
                    return <li className='nav-item' role='presentation'>
                        <Tab
                            className={library.id===props.activeLibraryID ? 'nav-link active' : 'nav-link'}
                            data-toggle='tab'
                            role='tab'
                            aria-controls={'tab'+index}
                            aria-selected={index===0 ? 'true' : 'false'}
                            onClick={()=>handleClick(library.id)}
                        >{library.name}</Tab>
                    </li>
                })}
            </ul>
            <div className='tab-content' id='libraryContent'>
                {props.libraryData.map((library,index)=>{
                    return <div 
                        className={library.id===props.activeLibraryID ? 'tab-pane fade show active' : 'tab-pane fade'}
                        id={'tab'+index}
                        role='tabpanel'
                        aria-labelledby={'tab'+index}
                    >
                        <LibraryContent books={library.books} />
                    </div>
                })
                }
            </div>
        </LibraryDiv>
    )
}

export default Library;