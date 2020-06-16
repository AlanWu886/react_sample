import React from 'react'
import { Button,  Navbar, Nav, Form, FormControl, Row, Col } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'

import Home from './Home'
import Contact from './Contact'
import About from './About'
import Cart from './Cart'

import './Menu.css'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      menuOptions : [
        {name:'home', path: ''},
        {name:'racquets', path: ''},
        {name:'shuttlecocks', path: ''},
        {name:'string', path: ''},
        {name:'footwear', path: ''},
        {name:'bags', path: ''},
        {name:'accessories', path: ''},
        {name:'service', path: ''},
        {name:'contact', path: ''},
        {name:'about', path: ''},

      ],
      styleActive: {fontWeight:'bold',
                    color: '#61dafb',

                   },
      activeNavi: 'home'
    }
    this.activePage = this.activePage.bind(this)
  }

  capitalize(text)
  {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  activePage(name){
    this.setState(prevState=>{
      return{
        activeNavi:name
      }
    })
    console.log(this.state.activeNavi);
  }

  render() {
    const menuComponents = this.state.menuOptions.map(m =>
      <Nav.Item key={m.name} >
        <Button className='navi-btn' variant='dark' size='sm'>
          <NavLink className='navi' onClick={() => this.activePage(m.name)} to={'/' + m.name} activeStyle={this.state.styleActive}>
            {this.capitalize(m.name)}
          </NavLink>
        </Button>
      </Nav.Item>)




    return(
      <div style={{margin: '10px 0 10px 0'}}>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" style={{opacity: '0.85'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" variant='pills' >
                {menuComponents}
              </Nav>
            </Navbar.Collapse>

          </Navbar>
          <span style={{float:'right', margin:'10px', opacity: '1'}}>
            <Cart />
          </span>
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route path="/contact" component={Contact}></Route>
            <Route path="/about" component={About}></Route>
          </Switch>
        </Router>


      </div>
    )
  }
}




export default Menu
