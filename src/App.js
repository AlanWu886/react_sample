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
    // setTimeout(()=>{
    //   this.setState({
    //     isLoading: false
    //   })
    // }, 1500)
    this.setState({
      isLoading: false
    })

  }

  render() {
    return(
      <div style={this.style}>
        <React.Fragment>
          {this.state.isLoading ?
            <div><LoadingPage /></div> :
            <div>
              <Header />
              <Main />
            </div>
          }
        </React.Fragment>
      </div>
    )
  }
}

export default App;
