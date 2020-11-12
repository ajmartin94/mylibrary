import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function Details(props) {
    const [show,setShow] = useState(true)

    const handleClose = () => {
        setShow(false)
        props.setActiveBook(null)
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.book.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>This is a test</Modal.Body>
        </Modal>
    )
}

export default Details;