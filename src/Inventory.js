import React, { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown, DropdownButton, Button, Modal, Form, Toast } from 'react-bootstrap';
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'


function Inventory (props){
  console.log(props);


  useEffect(() => {
    console.log(props.isLogIn);
    // check()
  },[props.isLogIn]);

  const check = () => {
    axios.get('/api/users/authchecker')
    .then(res=>{
      console.log(res)
      // if(!res.data.sessUser) {
      //   document.location.href = '../'
      // }
    })
    .catch(err=>console.log(err))

    // document.location.href = '../';
  };
  return (
    <div style={{width:'300px', margin:'auto'}}>
      <h1 style={{textAlign:'center'}}>Inventory</h1>

    </div>
  )


}

export default Inventory
