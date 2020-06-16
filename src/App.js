import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoadingPage from './LoadingPage'
import Header from './Header'
import Main from './Main'

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

  render() {
    return(
      <div style={this.style}>

        {this.state.isLoading ?
          <div><LoadingPage /></div> :
          <div>
            <Header />
            <Main />
          </div>
        }

      </div>
    )
  }
}

export default App;
