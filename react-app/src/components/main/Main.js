import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllServers } from "../../store/server.js"
import { useParams } from "react-router-dom"
import ServerMembers from "../servermembers/ServerMembers.js"
import ChatBox from "../chatbox/ChatBox.js"


const Main = () => {
  const dispatch = useDispatch()
  const { server_id } = useParams()
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)

  // let normalized_servers = [];
  // if (Array.isArray(servers)) {
  //   for (let i = 0; i < Object.keys(servers).length; i++) {
  //     normalized_servers.push(servers[Object.keys(servers)[i]])
  //   }
  // }
  // const members = useSelector(state => state.server.members)
  // let normalized_members = [];
  // if (Array.isArray(members)) {
  //   console.log(members.flat())
  //   for (let i = 0; i < Object.keys(members).length; i++) {
  //     normalized_members.push(members[Object.keys(members)[i]])
  //   }
  // }

  useEffect(() => {
    dispatch(getAllServers(user?.id))
  }, [dispatch, user?.id])

  return (
    <div className="main">

      <ServerBar servers={servers?.servers} />
      <ChannelBar user={user} />
      {server_id === '@me' ? null : <><ChatBox /><ServerMembers /></>}
    </div>
  )
}

export default Main
