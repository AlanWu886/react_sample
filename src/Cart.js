import React from 'react'
import { Dropdown, DropdownButton, Button, Modal, Form } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'

class Cart extends React.Component {
  constructor(props){
    super(props)

    this.state={

      order:{
        buyerInfo:{
          name:"",
          email:"",
          cell:""
        },
        orderList:[
          
        ]
      },
      showCheckOut:false
    }
    this.openCheckOut = this.openCheckOut.bind(this)
    this.closeCheckOut = this.closeCheckOut.bind(this)
  }

  openCheckOut(){
    this.setState(
      prevState=> {
        return{showCheckOut:true}
      }, ()=>{
        console.log(this.state.showCheckOut);
      }
    )
  }

  closeCheckOut(){
    this.setState(
      prevState=> {
        return{showCheckOut:false}
      }, ()=>{
        console.log(this.state.showCheckOut);
      }
    )
  }

  render(){
    const cartIcon = <FontAwesome
      className="super-crazy-colors"
      name="shopping-cart"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIcon = <FontAwesome
      className="super-crazy-colors"
      name="remove"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIconStyle = {float:'right',
                            marginRight:'5px'
                           }

    const dropdownItemStyle = {padding:'5px',

                              }
    const modalStyle = {
      backgroundColor:"#3f3e4f",
      borderColor:"#3f3e4f"
    }
    return(

      <div>

        <DropdownButton alignRight id="cart" title={cartIcon}>
          <Dropdown.Header>Order Details</Dropdown.Header>
          <div style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
            <Dropdown.Item disabled>Item11 x 1012312412134123132qeweawd</Dropdown.Item>
            <Button size='sm' variant='danger' style={removeIconStyle}>{removeIcon}</Button>
          </div>
          <div style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
            <Dropdown.Item disabled>Item1 x 1</Dropdown.Item>
            <Button size='sm' variant='danger' style={removeIconStyle}>{removeIcon}</Button>
          </div>
          <Dropdown.Divider />
          <Dropdown.Item disabled>Total: $123456</Dropdown.Item>
          <Button onClick={()=>this.openCheckOut()} style={{margin:'10px', float:'right' , alignSelf: 'center'}}>Check Out!</Button>
        </DropdownButton>

        <Modal centered show={this.state.showCheckOut} onHide={()=>this.closeCheckOut()} >
          <Modal.Header closeButton style={modalStyle}>
            <Modal.Title>Last step!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyle}>
          Please fill in your email or cellphone number as contact info.<br />
          We should reach out to you within 24 hours!
          <Form style={{marginTop:"10px"}}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="anme" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formCell">
              <Form.Label>Cell #</Form.Label>
              <Form.Control type="cell" placeholder="Enter cellphone number" />
              <Form.Text className="text-muted">
                We'll never share your contact info with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer style={modalStyle}>
            <Button variant="danger" onClick={()=>this.closeCheckOut()}>Close</Button>
            <Button variant="primary">Send Order!</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Cart
