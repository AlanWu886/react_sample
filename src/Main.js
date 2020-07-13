import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import {CSSTransition, TransitionGroup, } from 'react-transition-group';


import Cart from './Cart'
import Home from './Home'
import Products from './Products'
import Contact from './Contact'
import About from './About'
import Footer from './Footer'
import Service from './Service'

import './Main.css'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 3,
      products: require('./product.json'),
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
    const currentPage = window.location.pathname.substring(1)
    console.log(currentPage);
    return(

      <>
        <div style={{margin:'-30px 0px 0px 0px', width:'100%', flex: "1 0 auto"}}>
          <Container>
            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/footwear" render={(props) => <Products {...props} productList={this.state.products[currentPage]} title={currentPage}/>}></Route>
                    <Route path="/bags" render={(props) => <Products {...props} productList={this.state.products[currentPage]} />}></Route>
                    <Route path="/service" render={(props) => <Service {...props} productList={this.state.products.string} />}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/about" component={About}></Route>
                    <Redirect from="*" to={"/home"} />
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
