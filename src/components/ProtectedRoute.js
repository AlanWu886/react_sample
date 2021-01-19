import React from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'

function ProtectedRoute ({children, ...rest}){
  return(
    <Route {...rest} render={()=>{
        
      }
    }/>
  )
}

export default ProtectedRoute;
