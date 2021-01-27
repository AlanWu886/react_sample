import React from 'react'
import ItemCard from './components/ItemCard'
import Cart from './Cart'
import './Cart.css'

import {Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux'



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
    console.log(this.props);
    const productItems = this.props.categorizedProducts? this.props.categorizedProducts.map(item=>
      <Col key={item.id} style={{marginBottom:'30px'}} sm={12}><ItemCard key={item.id} item={item}/></Col>
    ) : null
    return(
      <div>
        <span className="sticky-cart">
          <Cart />
        </span>
        <h3 style={{textTransform: 'capitalize'}}>{this.props.title}</h3>
        <Row>
          {productItems}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Products)
