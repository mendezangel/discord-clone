import './ServerBar.css'
import { useSelector } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup';



const ServerBar = ({ servers }) => {
  const history = useHistory();
  const userServer = useSelector(state => state.session.user.me_server);

  const onServerClick = (server) => history.push(`/channels/${server.id}/${server.channels[0]?.id}`)
  const onMeClick = () => history.push(`/channels/@me`)
  const randomColor = () => {
    let colors = ['#5865f2', '#57f287', '#fee75c', '#eb459e', '#ed4245']
    let number = Math.floor(Math.random() * 5)
    return colors[number]
  }

  return (
    <div className="server_bar">
      {servers?.map(server => {
        if (server.id === userServer) {
          return (
            <Popup
              trigger={open => (
                <div className="server_icon"
                  style={{ backgroundImage: `url(${server.image})` }}
                  key={server.id}
                  onClick={() => onMeClick()}>
                </div>
              )}
              position="right center"
              closeOnEscape
              on={'hover'}
            >
              <p>Home</p>
            </Popup>
          )
        } else {
          if (server.image) {
            return (
              <Popup
                trigger={open => (
                  <div className="server_icon"
                    style={{ backgroundImage: `url(${server.image})` }}
                    key={server.id}
                    onClick={() => onServerClick(server)}>
                  </div>
                )}
                position="right center"
                closeOnEscape
                on={'hover'}
              >
                <p>{server.name}</p>
              </Popup>


            )
          } else {
            return (
              <Popup
                trigger={open => (
                  <div className="server_icon"
                    style={{ backgroundColor: `${randomColor()}`, color: 'black' }}
                    key={server.id}
                    onClick={() => onServerClick(server)}>
                    {server.name[0]}
                  </div>
                )}
                position="right center"
                closeOnDocumentClick
                closeOnEscape
                on={'hover'}
              >
                <p>{server.name}</p>
              </Popup>
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
