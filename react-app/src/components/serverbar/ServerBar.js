import './ServerBar.css'
import { useSelector } from "react-redux"

const ServerBar = ({ servers }) => {
    const userServer = useSelector(state => state.session.user.me_server)

    return (
        <div className="server_bar">
            { servers.map(server => {
              if (server.id === userServer) {
                return (
                  <div className="server_icon no_pic" key={server.id}>
                    {server.name[0]}
                  </div>
                )
              } else {
                if (server.image) {
                  return (
                    <div className="server_icon no_pic" key={server.id}>
                      {server.name[0]}
                    </div>
                  )
                } else {
                  return (
                    <div className="server_icon no_pic" key={server.id}>
                      {server.name[0]}
                    </div>
                  )
                }
              }
            })}
        </div>
    )
}

export default ServerBar
