import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'


import LoadingPage from './LoadingPage'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: true
    }

    this.style = {
      height: '100vh',

    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isLoading: false
      })
    }, 500)
  }

  menuSelected=(menu_name)=>{
        console.log(menu_name);
  }

  render() {
    return(
      <div style={this.style}>
        <React.Fragment>
          {this.state.isLoading ?
            <div><LoadingPage /></div> :
            <Router>
              <Header />
              <Menu functionCallFromParent={this.menuSelected.bind(this)}/>
              <Main />
            </Router>
          }
        </React.Fragment>
      </div>
    )
  }
}

export default App;
