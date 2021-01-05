import React from 'react'
import {Image, Col, Row} from 'react-bootstrap'

class About extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div >
        <Row style={{textAlign:"center"}}><Col><Image style={{width:"500px", height:"auto"}} src={require("./ronney.jpg")} roundedCircle/></Col></Row>
        <Row style={{textAlign:"center", marginTop:"20px"}}>
          <Col>
            <h2>Supreme Sports Supply - Badminton</h2>

              35+ years serving badminton fans in USA.<br />
              <b>YONEX & Victor</b> Authorized Badminton Equipment Dealer<br />
              <b>Aeroplane</b> Authorized Badminton Equipment Distributor.<br />
              Please call or email now to get the latest deal or bulk discount!<br />
              We ship to all 50 US states.
          </Col>

        </Row>

      </div>
    )
  }
}


export default About
