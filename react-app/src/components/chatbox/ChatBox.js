import './ChatBox.css'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


let socket

const ChatBox = () => {

    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        socket = io();
        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, img: user.profile_pic});
        setChatInput('')
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    return ( user && (
        <div className='chat'>

            <div className='chat-log'>
                {messages.map((message, ind) => (
                    <div key={ind} className='text-info-container'>
                        <img className='text-img' src={message.img} height='40px'/>
                        <div>
                            <div>{message.user.split('#')[0]}</div>
                            <div className='text' >{`${message.msg}`}</div>
                        </div>
                    </div>
                ))}
            </div>

                <form className='message-form' onSubmit={sendChat}>
                    <input className='chat-input' value={chatInput} onChange={updateChatInput} placeholder='Message' required/>
                </form>

        </div>
    ))
}
export default ChatBox
