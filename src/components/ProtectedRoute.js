import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingPage from './LoadingPage'

const ProtectedRoute = ({ component: Component, isLoaded, isLoggedIn, ...rest }) => {

  useEffect(() => {
    console.log(isLoaded,isLoggedIn)
    // check()
  },[isLoaded, isLoggedIn]);
  return (
    <Route {...rest} render={
      props => {
        if (!isLoaded) {
          return <LoadingPage />
        } else{
          if (isLoggedIn) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/login',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      }
    } />
  )
}

export default ProtectedRoute;
