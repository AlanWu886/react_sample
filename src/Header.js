import React from 'react';
import Button from 'react-bootstrap/Button';
import Menu from './Menu'


function Header() {
  return (
    <div>
      <header style={{color:'white', margin:'0px', padding:'10px 0px 0px 10px'}}>
        <img src={require('./yonex.png')} width="32" height="22"/> <span className="animate__animated animate__bounce"><b>Supreme Sports Supply</b></span>
      </header>
    </div>

  )
}

export default Header;
