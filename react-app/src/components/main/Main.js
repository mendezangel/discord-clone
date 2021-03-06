import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getAllServers } from "../../store/server.js"
import { getAllChannels } from "../../store/channels.js"
import { getAllDMs } from "../../store/dms.js"

import ServerMembers from "../servermembers/ServerMembers.js"
import ChatBox from "../chatbox/ChatBox.js"
import DMChatbox from "../DMChatbox/DMChatbox.js"


const Main = () => {
  const dispatch = useDispatch()
  const { me, server_id } = useParams()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.server)

  useEffect(() => {
    dispatch(getAllServers(user?.id))
    dispatch(getAllChannels())
    dispatch(getAllDMs(user?.id))
  }, [dispatch, user?.id])


  return (
    <div className="main">

      <ServerBar servers={servers.servers} />
      <ChannelBar user={user} />
      {me === '@me' ? <DMChatbox user={user} servers={servers}/> : <><ChatBox /><ServerMembers members={servers[server_id]?.users} /></>}
    </div>
  )
}

export default Main
