import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage} from '../../store/channels'
import '../chatbox/ChatBox.css'

const DMChatbox = ({user, servers}) => {
  const arr = window.location.pathname.split('/')
  const channel_id = arr[arr.length - 1]
  const server_id = user.me_server;
  const dispatch = useDispatch()
  const [chatInput, setChatInput] = useState("");
  const channel = useSelector(state => state.channel)
  // const users = servers[server_id]?.users
  const users = useSelector(state => state?.server[server_id]?.users)

  const sendChat = async(e) => {
    e.preventDefault()
    await dispatch(createMessage({
      channel_id: channel_id,
      user_id: user.id,
      content: chatInput
    }))
    setChatInput('')
  }

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  }

  return (user && (
    <div className='chat'>
    <div className='chat-log'>

      {
      channel[channel_id]?.messages.map((message, idx) => {
        return (
          <div key={idx} className='text-info-container'>
            <img className='text-img' src={users[message?.user_id]?.profile_pic} alt='profile' height='40px'/>
            <div>
              {/* <div>{users[message?.user_id].username.split('#')[0]}</div> */}
              <div className='text' >{`${message.content}`}</div>
            </div>
          </div>
        )
      })}
      </div>

      <form className='message-form' onSubmit={sendChat}>
        <input className='chat-input' value={chatInput} onChange={updateChatInput} required placeholder='Message' />
      </form>
    </div>
  ))
}

export default DMChatbox
