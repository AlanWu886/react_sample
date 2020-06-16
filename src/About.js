import React from 'react'

class About extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div style={this.style}>
        <p><h2>Supreme Sports Supply</h2></p>
        <h4>
          <p>35+ years serving badminton fan in USA.</p>
          <p><b>YONEX, Aeroplane, Victor</b> Authorized Distributor.</p>
        </h4>
      </div>
    )
  }
}


export default About
