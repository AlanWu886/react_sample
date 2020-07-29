import React from 'react'
import { Dropdown, DropdownButton, Button, Modal, Form } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import * as actions from './actionLookup'
import {deleteOrder} from './action'

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
        orderList:this.props.order
      },
      showCheckOut:false
    }
    this.openCheckOut = this.openCheckOut.bind(this)
    this.closeCheckOut = this.closeCheckOut.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }
  removeFromCart(order){
    this.forceUpdate()
    this.props.removeFromCart(order)
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
    console.log(this.props);
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
    console.log(this.props, this.state);
    const orderItems = this.props.order.length != 0? this.props.order.map(order=> <div key={order.id} style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
      <Dropdown.Item disabled>{order.name} + {order.color} + {order.size} x {order.amount}</Dropdown.Item>
      <Button size='sm' variant='danger' style={removeIconStyle} onClick={()=>this.removeFromCart(order)}>{removeIcon}</Button>
    </div> ) : <Dropdown.Item disabled>Empty Cart</Dropdown.Item>

    return(

      <div>
        <DropdownButton alignRight id="cart" title={cartIcon}>
          <Dropdown.Header>Order Details</Dropdown.Header>
          {orderItems}
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

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (order) => {
      console.log("delete")
      dispatch(deleteOrder(order))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
