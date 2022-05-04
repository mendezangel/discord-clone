import './ServerBar.css'
import { useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from 'react-router-dom'

const ServerBar = ({ servers }) => {
  const history = useHistory();
  const userServer = useSelector(state => state.session.user.me_server);
  const {server_id} = useParams();

  const onServerClick = (id) => history.push(`/channels/${id}`)
  const randomColor = () => {
    let colors = ['#5865f2','#57f287','#fee75c','#eb459e','#ed4245']
    let number = Math.floor(Math.random() * 5)
    return colors[number]
  }
  return (
    <div className="server_bar">
      {servers.map(server => {
        if (server.id === userServer) {
          return (
            <div className="server_icon"
              style={{ backgroundImage: `url(${server.image})` }}
              key={server.id}
              onClick={() => onServerClick('@me')}>
            </div>
          )
        } else {
          if (server.image) {
            return (
              <div className="server_icon"
                style={{ backgroundImage: `url(${server.image})` }}
                key={server.id}
                onClick={() => onServerClick(server.id)}></div>
            )
          } else {
            return (
              <div className="server_icon"
                style={{ backgroundColor: `${randomColor()}`, color: 'black'  }}
                key={server.id}
                onClick={() => onServerClick(server.id)}>
                {server.name[0]}
              </div>
            )
          }
        }
      })}
      <NavLink to="/servers/new" className="crud_icon">
        <i className="fas fa-plus"></i>
      </NavLink>
    </div>
  )
}

export default ServerBar
