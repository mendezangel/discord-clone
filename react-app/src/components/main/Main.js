import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { editServer } from "../../store/server.js"


const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(editServer({id: 2, owner_id: 1, name: "whatever", image: "asdfas", invite_url: 'asdfasd' }))

    }, [dispatch])

    return (
        <div className="main">
            <ServerBar />
            <ChannelBar />
        </div>
    )
}

export default Main
