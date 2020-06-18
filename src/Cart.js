import React from 'react'
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'

class Cart extends React.Component {
  constructor(){
    super()
  }

  render(){
    const cartIcon = <FontAwesome
      className="super-crazy-colors"
      name="shopping-cart"
      size="2x"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIcon = <FontAwesome
      className="super-crazy-colors"
      name="remove"
      size="1x"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIconStyle = {float:'right',
                            marginRight:'5px'
                           }

    const dropdownItemStyle = {padding:'5px',

                              }
    return(

      <div>

        <DropdownButton alignRight id="cart" title={cartIcon}>
          <Dropdown.Header>Order Details</Dropdown.Header>
          <div style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
            <Dropdown.Item disabled>Item11 x 10</Dropdown.Item>
            <Button size='sm' variant='danger' style={removeIconStyle}>{removeIcon}</Button>
          </div>
          <div style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
            <Dropdown.Item disabled>Item1 x 1</Dropdown.Item>
            <Button size='sm' variant='danger' style={removeIconStyle}>{removeIcon}</Button>
          </div>

          <Dropdown.Divider />
          <Dropdown.Item disabled>Total: $123456</Dropdown.Item>
          <Button style={{margin:'10px', float:'right' , alignSelf: 'center'}}>Send Order!</Button>

        </DropdownButton>
      </div>
    )
  }
}

export default Cart
