import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import {CSSTransition, TransitionGroup, } from 'react-transition-group';
import axios from 'axios'

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
      isLoggedIn: true,
      isLoaded: true,
      showChatWindow: false

    }

    this.style = {
      color:'white',
      margin:'0 40px 0 20px'
    }

    this.checkAuth = this.checkAuth.bind(this)
    this.getAuth = this.getAuth.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  componentDidMount(){
    console.log(this.props.products);
    this.props.products.forEach(element => console.log(element));
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
              isLoggedIn: true, //change back
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

  toggleDisplay(target){
    console.log(target);
    this.setState(
      prevState=> {
        console.log(prevState);
        return {[target]:!prevState[target]}
      }, ()=>{
        console.log(this.state[target]);
      }
    )
  }

  render() {
    console.log(this.state)
    console.log(this.props);
    const categories = [...new Set(this.props.productList.map(item => item.category))]
    const categorizedProducts = this.props.productList.filter(o=>Object.values(o).includes(this.props.currentPage))
    console.log(categorizedProducts);
    const currentPage = window.location.pathname.substring(1)
    console.log(currentPage);
    return(

      <>
        <div style={{paddingTop:'150px', width:'100%', flex: "1 0 auto"}}>
          <Container>
            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/racquet" render={(props) => <Products {...props} categorizedProducts={categorizedProducts} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/footwear" render={(props) => <Products {...props} categorizedProducts={categorizedProducts} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/bag" render={(props) => <Products {...props} categorizedProducts={categorizedProducts} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/service" render={(props) => <Service {...props} categorizedProducts={this.props.productList.filter(o=>Object.values(o).includes('string'))} />}></Route>
                    <Route exact path="/contact" component={Contact}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <ProtectedRoute exact path='/inventory' isLoaded={this.state.isLoaded} isLoggedIn={this.state.isLoggedIn} productList={this.props.products} component={Inventory} /> //change back to prodcutlist
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
