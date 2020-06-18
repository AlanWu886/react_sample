import React from 'react'
import ItemCard from './components/ItemCard'

import {Row, Col} from 'react-bootstrap'


class Footwear extends React.Component {
  constructor() {
    super()

  }

  render() {
    const products = require('./product.json')
    console.log(products);
    return(
      <div>
        <h3>Footwear</h3>
        <Row>
          <Col sm={12}><ItemCard /></Col>

        </Row>

      </div>
    )
  }
}

export default Footwear
