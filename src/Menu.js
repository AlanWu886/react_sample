import React from 'react'
import {Button,  Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-transition-group'

import Home from './Home'
import Contact from './Contact'
import About from './About'
import Cart from './Cart'

import './Menu.css'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      styleActive: {
        fontWeight:'bold',
        color: '#255734',
        backgroundColor: '#00d0ff',
        boxShadow: "0 0 10px #00d0ff , 0 0 40px #00d0ff, 0 0 80px #00d0ff"
      },
      activeNavi: null
    }
    this.activePage = this.activePage.bind(this)
  }

  capitalize(text)
  {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  activePage(name){
    this.setState(()=>{
      return{
        activeNavi:name
      },
      ()=>{
        console.log(this.state.activeNavi);
      }
    })

  }

  grabName=(name)=>{

        this.props.functionCallFromParent(name);
  }

  render() {
    const menuOptions = [
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
    ]

    const menuComponents = menuOptions.map(m =>
      <Nav.Item key={m.name} >

          <NavLink className='navi' onClick={this.grabName.bind(this, m.name)} to={'/' + m.name} activeStyle={this.state.styleActive}>
            {this.capitalize(m.name)}
          </NavLink>

      </Nav.Item>)




    return(
      <div style={{margin: '10px 0 10px 0'}}>

        <Navbar bg="dark" variant="dark" expand="md" style={{opacity: '0.85'}}>
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




      </div>
    )
  }
}




export default Menu
