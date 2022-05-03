import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllServers } from "../../store/server.js"


const Main = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = useSelector(state => state.server)
    let normalized_servers = [];
    for (let i = 0; i < Object.keys(servers).length; i++) {
      normalized_servers.push(servers[Object.keys(servers)[i]])
    }

    useEffect(() => {
        dispatch(getAllServers(user.id))
    }, [dispatch, user.id])

    return (
        <div className="main">
            <ServerBar servers={normalized_servers}/>
            <ChannelBar />
        </div>
    )
}

export default Main
