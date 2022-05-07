import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, getAllMessages } from '../../store/channels'
import '../chatbox/ChatBox.css'

const DMChatbox = () => {
    const dispatch = useDispatch()
    const { channel_id, server_id } = useParams()
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");
    const [prevRoom, setPrevRoom] = useState(channel_id);
    const user = useSelector(state => state.session.user)
    const channel = useSelector(state => state.channel)
    const users = useSelector(state => state?.server[server_id]?.users)

    const sendChat = (e) => {
        dispatch(createMessage({
            channel_id: channel_id,
            user_id: user.id,
            content: chatInput
        }))
        setChatInput('')
    }
    return (
        <>
        {channel[channel_id]?.messages.map((message, idx) => {
                <div key={idx} className='text-info-container'>
                    <img className='text-img' src={users[message.user_id].profile_pic} height='40px' alt='pp' />
                    <div>
                        <div>{users[message.user_id].username.split('#')[0]}</div>
                        <div className='text' >{`${message.content}`}</div>
                    </div>
                </div>
            })}

            <form className='message-form' onSubmit={sendChat}>
                <input className='chat-input' value={chatInput} onChange={updateChatInput} required placeholder='Message' />
            </form>
        </>
    )
}

export default DMChatbox
