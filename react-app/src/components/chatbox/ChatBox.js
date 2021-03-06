import './ChatBox.css'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { createMessage } from '../../store/channels'


let socket

const ChatBox = () => {
  const dispatch = useDispatch()
  const { channel_id, server_id } = useParams()
  const [messages, setMessages] = useState([])
  const [chatInput, setChatInput] = useState("");
  const [prevRoom, setPrevRoom] = useState(channel_id);
  const user = useSelector(state => state.session.user)
  const channel = useSelector(state => state.channel)
  const users = useSelector(state => state?.server[server_id]?.users)

  useEffect(() => {
    socket = io();
    socket.on('chat', (chat) => {
      // dispatch(getAllMessages(channel_id))
      setMessages(messages => [...messages, chat])
    })
    return (() => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    socket.emit('leave', { room: prevRoom })
    socket.emit('join', { room: channel_id })
    setPrevRoom(channel_id)
    setMessages([])
  }, [channel_id, prevRoom])

  const sendChat = (e) => {
    e.preventDefault()
    dispatch(createMessage({
      channel_id: channel_id,
      user_id: user.id,
      content: chatInput
    }))
    socket.emit('chat', { user: user.username, msg: chatInput, img: user.profile_pic, room: channel_id });
    setChatInput('')
  }

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  return (user && (
    <div className='chat'>

      <div className='chat-log'>

        {users && (
          channel[channel_id]?.messages.map((message, idx) => {
            return (
              <div key={idx} className='text-info-container'>
                <img className='text-img' src={users[message.user_id].profile_pic} height='40px' alt='pp' />
                <div>
                  <div>{users[message.user_id].username.split('#')[0]}</div>
                  <div className='text' >{`${message.content}`}</div>
                </div>
              </div>
            )
          })
        )}

        {messages.map((message, idx) => {
          return (
            <div key={idx} className='text-info-container'>
              <img className='text-img' src={message.img} height='40px' alt='pp' />
              <div>
                <div>{message.user.split('#')[0]}</div>
                <div className='text' >{`${message.msg}`}</div>
              </div>
            </div>
          )
        }
        )}
      </div>

      <form className='message-form' onSubmit={sendChat}>
        <input className='chat-input' value={chatInput} onChange={updateChatInput} required placeholder='Message' />
      </form>

    </div>
  ))
}
export default ChatBox
