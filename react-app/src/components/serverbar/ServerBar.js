import './ServerBar.css'
import { useSelector } from "react-redux"

const ServerBar = ({ servers }) => {
    const userServer = useSelector(state => state.session.user.me_server)

    return (
        <div className="server_bar">
            { servers.map(server => {
              if (server.id === userServer) {
                return (
                  <div className="user_server_icon no_pic" key={server.id}>
                    B
                  </div>
                )
              } else {
                return null;
              }
            })}
        </div>
    )
}

export default ServerBar
