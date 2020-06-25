import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route} from 'react-router-dom'
import {CSSTransition, TransitionGroup, } from 'react-transition-group';


import Cart from './Cart'
import Home from './Home'
import Footwear from './Footwear'
import Contact from './Contact'
import About from './About'

import './Main.css'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 3,
      products: require('./product.json')
    }
    console.log(this.state.products);

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
          <Container>
            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/footwear" render={(props) => <Footwear {...props} productList={this.state.products.footwear} />}></Route>
                    <Route path="/product" component={Contact}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/about" component={About}></Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}>
            </Route>
          </Container>
        </div>
      </>



    )
  }
}



export default Main
