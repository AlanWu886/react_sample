import React, {Component} from 'react'
import Home from './Home'
import Contact from './Contact'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 3
    }

    this.style = {
      color:'white',
      margin:'0 40px 0 20px'
    }

    this.increOne = this.increOne.bind(this)

  }

  increOne() {
    this.setState(xyz => {
      console.log(xyz);
      return{
        count: xyz.count + 1
      }

    })

  }

  render() {
    console.log(this.state)

    return(
      <div style = {this.style}>

        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route to="/contact" component={Contact}></Route>
          </Switch>
        </Router>

      </div>

    )
  }
}



export default Main
