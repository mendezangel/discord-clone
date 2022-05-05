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
        // create websocket/connect
        socket = io();
        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user.username, msg: chatInput, img: user.profile_pic});
        // clear the input field after the message is sent
        setChatInput('')
    }

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
