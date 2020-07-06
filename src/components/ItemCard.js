import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import './ItemCard.css'


class ItemCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
      order:{
        id: "",
        name: "",
        color: "",
        size: "",
        amount: ""
      },
      color:null,
      showModal:false
    }
    this.colorOptions = Object.keys(this.state.item.color).map(color =>
      <option key= {color} value={color}>{color}</option>
    )

    this.sizeOptions = this.state.item.color[this.state.order.color]?
    Object.keys(this.state.item.color[this.state.order.color]["size"]).map(size =>
      <option key= {size} value={size}>{size}</option>
    ) : null

    this.labelWidth = {
      minWidth: '60px'
    }

    this.setOrder = this.setOrder.bind(this)
    this.resetOrder = this.resetOrder.bind(this)
    this.showImg = this.showImg.bind(this)
    this.closeImg = this.closeImg.bind(this)
  }

  showImg(){
    this.setState(
      prevState=> {
        return{showModal:true}
      }, ()=>{
        console.log(this.state.showModal);
      }
    )
  }

  closeImg(){
    this.setState(
      prevState=> {
        return{showModal:false}
      }, ()=>{
        console.log(this.state.showModal);
      }
    )
  }


  setOrder(e){
    e.persist();
    console.log(e.target.id);
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        console.log(order[e.target.id]);
        if(order.color && e.target.id === "color") {
          console.log(Object.keys(order));
          Object.keys(order).map(key => order[key]="")
          console.log(order);
          order[e.target.id] = e.target.value
          return{ order }
        } else {
          order[e.target.id] = e.target.value
          return{ order }
        }
      }
      ,
      ()=>{
        console.log(this.state.order);
      }
    );
  }

  resetOrder(){
    console.log("reset");
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        Object.keys(order).map(key => order[key]="")
        return { order }
      },
      ()=>{
        console.log(this.state.order);
      }
    )
  }

  render() {
    const colorOptions = Object.keys(this.state.item.color).map(color =>
      <option key={color} value={color}>{color}</option>
    )

    const sizeOptions = this.state.item.color[this.state.order.color]?
    Object.keys(this.state.item.color[this.state.order.color]["size"]).map(size =>
      <option key= {size} value={size}>{size}</option>
    ) : null
    console.log(sizeOptions);

    const amountOptions = Array.from(Array(21), (_, i) => i).map(
      value=> <option key= {value} value={value}>{value}</option>
    )

    const zoomIcon = <FontAwesome
      className="super-crazy-colors"
      name="search"
      size="lg"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const carouselImgs = this.state.item.image.map(img=>
      <Carousel.Item key={img.path}>
        <img
          className="d-block w-100"
          src={require(`${img.path}`)}
          alt="IMG"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    )

    return(
      <div>
        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>

                <Image style={{ cursor: "zoom-in" }} onClick={()=>this.showImg()} className='product-image' src={require(`${this.state.item.image[0].path}`)} />
                <Modal centered show={this.state.showModal} onHide={()=>this.closeImg()} >

                  <Modal.Body style={{backgroundColor:"lightslategrey"}}>
                    <Carousel fade interval="25000" >
                      {carouselImgs}
                    </Carousel>
                  </Modal.Body>

                </Modal>
                <Col>
                  <Card.Title >{this.state.item.name}</Card.Title>
                  <Card.Text>{this.state.item.description.repeat(10)}</Card.Text>
                  <Row style={{verticalAlign:'bottom'}}>
                    <Card.Footer fluid>
                      <Form inline>
                        <Form.Group>
                          <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                            Color
                          </Form.Label>
                          <Form.Control size="sm" as="select"
                          id="color"
                          className="ml-2 mr-4"
                          value={this.state.order.color}
                          onChange={this.setOrder} >
                            <option key="" value="">Choose...</option>
                            {colorOptions}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                            Size
                          </Form.Label>
                          <Form.Control size="sm" as="select"
                          id="size"
                          className="ml-2 mr-4"
                          value={this.state.order.size}
                          onChange={this.setOrder}>
                            <option key="" value="">Choose...</option>
                            {sizeOptions}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                            Amount
                          </Form.Label>
                          <Form.Control size="sm" as="select"
                          id="amount"
                          custom
                          className="ml-2 mr-4"
                          value={this.state.order.amount}
                          onChange={this.setOrder}>
                            {amountOptions}

                          </Form.Control>
                        </Form.Group>

                        <Button size="sm" onClick={this.resetOrder}>Reset</Button>
                      </Form>
                    </Card.Footer>
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
