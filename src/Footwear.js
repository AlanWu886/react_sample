import React from 'react'
import ItemCard from './components/ItemCard'

import {Row, Col} from 'react-bootstrap'


class Footwear extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList:{
        id: null,
        name: null,
        color: null,
        size: null,
        quantity: null,
        contact_name: null,
        contact_phone: null,
        contact_email: null
      },
      products: this.props.productList
    }
  }

  render() {
    return(
      <div>
        <h3>Footwear</h3>
        <Row>
          <Col sm={12}><ItemCard item={this.state.products[0]}/></Col>
        </Row>
      </div>
    )
  }
}

export default Footwear
