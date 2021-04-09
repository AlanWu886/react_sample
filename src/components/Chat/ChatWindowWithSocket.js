import React, { Component } from 'react'
import SocketContext from '../SocketContext'
import ChatWindow from './ChatWindow'

const ChatWindowWithSocket = props => (
  <SocketContext.Consumer>
  {socket => <ChatWindow {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default ChatWindowWithSocket
