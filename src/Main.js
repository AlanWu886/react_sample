import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import {CSSTransition, TransitionGroup, } from 'react-transition-group';
import axios from 'axios'

import Cart from './Cart'
import Home from './Home'
import Products from './Products'
import Contact from './Contact'
import About from './About'
import Footer from './Footer'
import Service from './Service'
import Login from './Login'
import Inventory from './Inventory'
import ProtectedRoute from './components/ProtectedRoute'

import './Main.css'

import { connect } from 'react-redux'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      isLoaded: false

    }

    this.style = {
      color:'white',
      margin:'0 40px 0 20px'
    }

    this.checkAuth = this.checkAuth.bind(this)
    this.getAuth = this.getAuth.bind(this)
  }

  componentDidMount(){
    this.checkAuth()
  }

  getAuth() {
    console.log(localStorage);
  }



  checkAuth(){
    var check;
    fetch('/api/users/authchecker', {
        method: "GET",
        mode: "cors",
        // Adding body or contents to send
        headers: {"Content-type": "charset=UTF-8"}
        // Adding headers to the request
      })
      .then(res => {
        if (res.ok) {
          console.log('user is logged in', res);
          this.setState(state => {
            return{
              isLoggedIn: true,
              isLoaded: true
            }
          })

        } else {
          this.setState(state => {
            return{
              isLoggedIn: false,
              isLoaded: true
            }
          })
          console.log('Redirect to login page...');
        }
      })
      .then(() => {
        console.log(this.state);
      })



  }

  render() {
    console.log(this.state)
    console.log(this.props);
    const currentPage = window.location.pathname.substring(1)
    console.log(currentPage);
    return(

      <>
        <div style={{paddingTop:'150px', width:'100%', flex: "1 0 auto"}}>
          <Container>
            <span className="sticky-cart">
              <Cart />
            </span>
            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/racquets" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/footwear" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/bags" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/service" render={(props) => <Service {...props} productList={this.props.products.string} />}></Route>
                    <Route exact path="/contact" component={Contact}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <ProtectedRoute exact path='/inventory' isLoaded={this.state.isLoaded} isLoggedIn={this.state.isLoggedIn} component={Inventory} />
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Main)
