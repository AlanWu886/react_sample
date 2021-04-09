import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownButton, Button, Form, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'

// import socket from './ChatSocket'
import './chatWindow.css'
import DropdownPersist from '../DropdownPersist'

function ChatWindow(...props) {

  const [chatUserName, setChatUserName] = useState("customer")
  const [chatNameCheck, setChatNameCheck] = useState(false)
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [ message, setMessage ] = useState({ message: "", name: "" })
  const [chatText, setChatText] = useState("")
	const [ chat, setChat ] = useState([])

  useEffect(
    () => {
      console.log(chatUserName, message, props[0]);
			props[0].socket.on("message", ({ chatUserName, chatText }) => {
        console.log(chatUserName, chatText);
				setChat([ ...chat, { chatUserName, chatText } ])

			})
			// return () => props[0].socket.disconnect()
		},[chat]);

  const chatIcon = <FontAwesome
    className="super-crazy-colors"
    name="comment"
    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}

  />

  const handleChatUserNameSubmit = (e)=>{
    console.log("sent chat usernamee", chatUserName);
    e.preventDefault();
    console.log(e.target.value);
    // setMessage({ message: "", name:chatUserName })
    setChatUserName(chatUserName)

    setChatNameCheck(true)
    // setChatUserName(e.target.value)
  }

  const handleChatSubmit = (e)=>{

    // const { name, message } = message
    props[0].socket.emit("message", { chatUserName, chatText })
    e.preventDefault()
    console.log(message, chatText, e);
    setChatText("")

    // console.log("sent chat message", message);

    // const { name, message } = message
    // const message = message.message


		// socketRef.current.emit("message", { chatUserName, message })
    // e.preventDefault()
		// setMessage({ message: "", chatUserName})
    // setShowChatWindow(true)
    // console.log(message, e);


    // setTimeout(function () {
    //   console.log(message, e);
    //   const { name, message } = message
    //   props[0].socket.emit("message", { name, message })
  	// 	e.preventDefault()
  	// 	setMessage({ message: "", name })
    // }, 1000);
    // const name = chatUserName
    // const message = message.message


  }

  const handleToggle = (isOpen, event, metadata)=> {
    if(isOpen || metadata.source!=='click'){
      setShowChatWindow(isOpen);
    }
    // event.persist();
  }

  const handleChatWindow = ()=>{
    console.log(showChatWindow);
    setShowChatWindow(!showChatWindow)
  }

  const onChatUserNameChange = (e) => {
    e.preventDefault()
		setChatUserName(e.target.value)
    console.log(e.target.value);
	}

  const onTextChange = (e) => {
    e.preventDefault()
    // setMessage({ message: e.target.value, name: chatUserName })
    setChatText(e.target.value)
    console.log(chatText);
		// setMessage({ ...message, [e.target.name]: e.target.value })
	}



	const renderChat = () => {
		return chat.map(({ chatUserName, chatText }, index) => (
			<div key={index}>
				<h5>
					{chatUserName}: <span>{chatText}</span>
				</h5>
			</div>
		))
	}

  return (
    <>
      <div style={{marginRight:"10px"}}>
        <Button variant="primary" onClick={()=>handleChatWindow()}>{chatIcon}</Button>
            {showChatWindow && (
              <div className="chatDropdown">
              {!chatNameCheck ?
                <div className="chatNameEnter">
                  <h5 className="chatNameRequest">Please enter your name!</h5>
                  <Form className="chatNameInput" onSubmit={handleChatUserNameSubmit}>
                    <Form.Group controlId="chatInput" style={{margin:"0", width:"290px"}}>
                      <Form.Control onChange={onChatUserNameChange} type="text" value={chatUserName}/>
                      <Button variant="primary" type="submit" style={{margin:"10px"}}>
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                  <div className="chatNameInput"></div>
                </div> :
                <div>
                  <h5 style={{textAlign:"center"}}>Ronny's online support</h5>

                  <div className="chatDisplay">{renderChat()}</div>

                  <Form className="chatInput" onSubmit={handleChatSubmit}>
                    <Form.Group as={Row} controlId="chatInput" style={{margin:"0", width:"290px"}}>
                      <Col sm="10">
                       <Form.Control type="text" onChange={onTextChange} value={chatText}/>
                      </Col>
                      <Col sm="2">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              }
              </div>
            )}

      </div>


    </>
  )
}

export default ChatWindow
