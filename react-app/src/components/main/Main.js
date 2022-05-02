import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editServer, getAllServers } from "../../store/server.js"


const Main = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getAllServers(user.id))
    }, [dispatch])

    return (
        <div className="main">
            <ServerBar />
            <ChannelBar />
        </div>
    )
}

export default Main
