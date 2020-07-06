import React from 'react'
import ItemCard from './components/ItemCard'

import {Row, Col} from 'react-bootstrap'


class Products extends React.Component {
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
      productList: this.props.productList
    }
  }

  render() {
    console.log(this.state.productList);
    const productItems = this.props.productList.map(item=>
      <Col key={item.id} style={{marginBottom:'10px'}} sm={12}><ItemCard key={item.id} item={item}/></Col>
    )
    return(
      <div>
        <h3 style={{textTransform: 'capitalize'}}>{this.props.title}</h3>
        <Row>
          {productItems}
        </Row>
      </div>
    )
  }
}

export default Products
