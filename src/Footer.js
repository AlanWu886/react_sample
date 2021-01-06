import React from 'react';




function Footer() {
  const footerStyle = {
    margin:"20px",
    flexShrink:"0",
    
    textAlign:"center"

  }
  var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }
  return (

    <div style={footerStyle}>
      Privacy Policy - We do not keep your private information on this website. We do not use cookie to track you.
      < br/>Copyright © 2020 Supreme Sports Supply . All rights reserved
    </div>


  )
}

export default Footer;
