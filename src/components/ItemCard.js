import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form} from 'react-bootstrap'
import './ItemCard.css'
class ItemCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
      order:{
        id: null,
        name: null,
        color: null,
        size: null,
        quantity: null
      },
      color:null,
    }
    this.colorOptions = Object.keys(this.state.item.color).map(color =>
      <option key= {color} value={color}>{color}</option>
    )
    this.sizeOptions = null
    console.log(this.colorOptions);
    console.log(this.state.item.color);
    this.setColor = this.setColor.bind(this)
  }

  setColor(e){
    e.persist();
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        order.color = e.target.value
        return{ order }
      }
      ,
      ()=>{
        if(this.state.order.color) {
          console.log(this.state.order);
          let selectedColor = this.state.item.color[this.state.order.color];
          console.log(Object.keys(selectedColor.size));
          this.sizeOptions = Object.keys(selectedColor.size).map(size =>
            <option key={size} value={size}>{size}</option>
          )
          console.log(this.sizeOptions);
        }

      }
    );
  }

  render() {
    console.log(this.sizeOptions);
    let sizeOptions = ()=>{
      if(this.state.order.color){

      }else{
        return null
      }
    }
    console.log(sizeOptions);
    return(
      <div>
        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>
                <Image className='product-image' src={require(`${this.state.item.image[0].path}`)} />
                <Col>
                  <Card.Title>{this.state.item.name}</Card.Title>
                  <Card.Text>{this.state.item.description.repeat(10)}</Card.Text>
                  <Row>
                    <Form inline>
                      <Form.Group>
                        <Form.Label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectPref">
                          Color
                        </Form.Label>
                        <Form.Control size="sm" as="select"
                        value={this.state.order.color}
                        onChange={this.setColor} >
                          <option value={null}>Choose...</option>
                          {this.colorOptions}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="ml-4 mr-2" htmlFor="inlineFormCustomSelectPref">
                          Size
                        </Form.Label>
                        <Form.Control size="sm" as="select" placeholder="Choose..." >
                          <option value={null}>Choose...</option>
                          {this.sizeOptions}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Row>
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
