import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, Button, Modal, Form, Toast } from 'react-bootstrap';
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'

const schema = yup.object({
  name: yup.string().required(),
  password: yup.string()
    .required("Required")
    .min(8)

});

function Login() {
  const initForm = {name:'', password: ''}
  const [isLogIn, setLogin] = useState(false);
  const [loginForm, setForm] = useState(initForm);

  useEffect(() => {
    console.log(document.cookie);
  },[]);


  const authApi = (values) => {
    console.log(values);
    fetch('/api/users/login', {
        method: "POST",
        mode: "cors",
        // Adding body or contents to send
        body:JSON.stringify({
          name:values.name,
          password:values.password
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        // Adding headers to the request
      })
      .then(res => { return res.json()})
      .then(res => {
        // var expire = new Date();
        // var minutes = 120;
        // expire.setTime(expire.getTime() + (minutes * 60 * 1000));
        //
        // document.cookie = "session=" + res.session + "; "
        // document.cookie = "expires=" + expire.toUTCString() + ";"
        // console.log('set localStorage', res)
        // console.log("cookie:", document.cookie);
        // localStorage.setItem('user', JSON.stringify(res.sessUser))
      })
      .catch(err => console.log(err))
 };


  return (
    <div style={{width:'300px', margin:'auto'}}>
      <h1 style={{textAlign:'center'}}>Admin Login</h1>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={schema}
        onSubmit={(values, { validate }) => {
            authApi(values)
        }}
        initialValues={loginForm}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          values,
          touched,
          isValid,
          errors,
        }) => (

          <Form noValidate onSubmit={handleSubmit} style={{marginTop:"10px"}}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
              type="name"
              placeholder="Enter name"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{float:"right"}}>
              <Button variant="warning" onClick={handleReset}>Reset</Button>
              <Button variant="primary" type="submit" style={{marginLeft:"5px"}}>Login</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
