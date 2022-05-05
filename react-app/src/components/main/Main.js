import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllServers } from "../../store/server.js"
import { getAllChannels } from "../../store/channels.js"
import { useParams } from "react-router-dom"
import ServerMembers from "../servermembers/ServerMembers.js"
import ChatBox from "../chatbox/ChatBox.js"


const Main = () => {
  const dispatch = useDispatch()
  const { server_id } = useParams()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.server)

  useEffect(() => {
    dispatch(getAllServers(user?.id))
    dispatch(getAllChannels())
  }, [dispatch, user?.id])

  return (
    <div className="main">

      <ServerBar servers={servers.servers} />
      <ChannelBar user={user} />
      {server_id === '@me' ? null : <><ChatBox /><ServerMembers members={servers[server_id]?.users} /></>}
    </div>
  )
}

export default Main
