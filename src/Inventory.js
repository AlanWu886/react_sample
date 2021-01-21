import React, { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap';
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'


function Inventory (props){
  console.log(props);


  useEffect(() => {
    console.log(props.isLogIn);
    // check()
  },[props.isLogIn]);

  const handleLogOut = () => {
    console.log('logging out...');
    axios.delete('/api/users/logout')
    .then(res=>{
      console.log(res)
      if(res.status === 200) {
        document.location.href = '/login'
      }
    })
    .catch(err=>console.log(err))

  };

  return (
    <div>
      <Button onClick={()=>handleLogOut()} style={{float:'right'}}>Log Out</Button>
      <div style={{width:'500px', margin:'auto'}}>
        <h1 style={{textAlign:'center'}}>Inventory Management

        </h1>
      </div>

      <div>
      table under construction
      </div>
    </div>

  )
}

export default Inventory
