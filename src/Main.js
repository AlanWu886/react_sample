import React, {Component} from 'react'
import { Row, Col } from 'react-bootstrap';



import Menu from './Menu'
import Cart from './Cart'
class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 3
    }

    this.style = {
      color:'white',
      margin:'0 40px 0 20px'
    }

    this.increOne = this.increOne.bind(this)

  }

  increOne() {
    this.setState(xyz => {
      console.log(xyz);
      return{
        count: xyz.count + 1
      }

    })

  }

  render() {
    console.log(this.state)

    return(

      <>
        <div style={{margin:'0px', width:'100%'}}>
          <Menu />

        </div>
        <div style = {this.style}>



        </div>
      </>



    )
  }
}



export default Main
