import React from 'react'
import {Modal, Carousel} from 'react-bootstrap'

class ImgModal extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    )
  }
}

export default ImgModal
