import './ServerBar.css'
import { useSelector } from "react-redux"
import { Redirect, NavLink, useHistory } from 'react-router-dom'

const ServerBar = ({ servers }) => {
    const history = useHistory();
    const userServer = useSelector(state => state.session.user.me_server)

    const onServerClick = (id) => history.push(`/channels/${id}`)
    return (
        <div className="server_bar">
            { servers.map(server => {
              if (server.id === userServer) {
                return (
                  <div className="server_icon no_pic" key={server.id} onClick={() => onServerClick('@me')}>
                    {server.name[0]}
                  </div>
                )
              } else {
                if (server.image) {
                  return (
                    <div className="server_icon no_pic" key={server.id} onClick={() => onServerClick(server.id)}>
                      {server.name[0]}
                    </div>
                  )
                } else {
                  return (
                    <div className="server_icon no_pic" key={server.id} onClick={() => onServerClick(server.id)}>
                      {server.name[0]}
                    </div>
                  )
                }
              }
            })}
            <NavLink to="/server/new">NEW</NavLink>
        </div>
    )
}

export default ServerBar
