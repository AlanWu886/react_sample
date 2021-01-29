import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actionLookup'
import {initProducts} from './action'
import axios from 'axios'

import LoadingPage from './components/LoadingPage'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'
import Footer from './Footer'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: true, //change to false
      productList: null,
      selectedMenu: window.location.pathname.substring(1)
    }

    this.style = {
      height: '100vh',
      display: "flex",
      flexDirection: "column"

    }
    this.iniProdcutList = this.iniProdcutList.bind(this)
  }

  iniProdcutList(products) {
    this.props.initProducts(products)
    console.log('init product list...');
  }

  componentDidMount() {
    axios.get('/api/products/getProducts')
    .then(res=>{
      if(res.status === 200) {
        this.props.initProducts(res.data.data)
        console.log(res)
        this.setState(
          () => {
            return{
              isLoaded: true,
              productList: res.data.data
            }
          }, () => {
            console.log(this.state,this.props)
          }
        )
      }
    })
    .catch(err=>console.log(err))

  }

  menuSelected=(menu_name)=>{
        this.setState({selectedMenu: menu_name},
          ()=>{
            console.log(this.state.selectedMenu);
          }
        )
  }

  render() {

    return(
      <div style={this.style}>
        <React.Fragment>
          {!this.state.isLoaded ?
            <div><LoadingPage /></div> :
            <Router>

              <Menu functionCallFromParent={this.menuSelected.bind(this)}/>
              <Main currentPage={this.state.selectedMenu}/>
              <Footer />
            </Router>
          }
        </React.Fragment>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    initProducts: (products) => {
      console.log("init products..")
      dispatch(initProducts(products))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
