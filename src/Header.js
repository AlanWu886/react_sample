import React from 'react';
import Button from 'react-bootstrap/Button';
import Menu from './Menu'


function Header() {
  return (
    <div>
      <header style={{color:'white', margin:'0px', padding:'10px 0px 0px 10px'}}>
        <img src={require('./images/logo.jpg')} width="32" height="32"/> <span className="animate__animated animate__bounce"><b>Supreme Sports Supply - Badminton</b></span>
      </header>
    </div>

  )
}

export default Header;
