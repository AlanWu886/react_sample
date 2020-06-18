import React from 'react'
import {Card, CardDeck, Image, Row, Col} from 'react-bootstrap'
import './ItemCard.css'
class ItemCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>


            <Card.Body >
              <Row>
                <Image className='product-image' src={require('./productImage/SHBELSX-TY.jpg')} />
                <Col>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    )
  }
}

export default ItemCard
