import React from 'react';
import Button from 'react-bootstrap/Button';
import Menu from './Menu'
import logo from './yonex.png';

function Header() {
  return (
    <div>
      <header style={{color:'white', margin:'0px', padding:'10px 0px 0px 10px'}}>
        <img src={logo} width="32" height="22"/> Ronny's Badminton Store
      </header>
      <div style={{margin:'0px', width:'100%'}}>
        <Menu />
      </div>

    </div>

  )
}

export default Header;
