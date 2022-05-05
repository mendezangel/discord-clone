import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'
import Channel from '../channel/Channel'

import { delServer } from '../../store/server';

const ChannelBar = ({ user }) => {
  const { server_id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const server = useSelector(state => state.server[server_id]);
  const channelState = useSelector(state => state.channel);
  const channels = channelState.channels;

  const onDelete = () => {
    dispatch(delServer(server_id))
    history.push('/channels/@me')
  }
  const editButton = () => {
    history.push({
      pathname: `/channels/${server_id}/edit`,
      state: server
    })
  }
  const onClick = () => {
    history.push({
      pathname: '/channels/new',
      server_id
    })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(server.invite_url)
      alert('Server Invite URL Copied!')
    } catch {
      console.log('fail')
    }
  }

  return (
    <div className="channel-bar">

      <div className="channel-bar-top">
        <h2 className='server-name-text' onClick={copy}>{server?.name}</h2>
        {server_id !== '@me' && (
          <>
            <div className='channel-bar-server-info'>
              <button onClick={onDelete} className="server-button">Delete</button>
              <button className="server-button" onClick={editButton}>Edit</button>
            </ div>
            <div className='channel-bar-text'>
              <p className='channel-bar-p'>CHANNELS</p>
              <i className="fas fa-plus" onClick={onClick}></i>
            </div>
            {channels?.map(channel => {
              if (channel.server_id === server?.id) {
                return (
                  <Channel channel={channel} key={channel.id} />
                )
              } else {
                return null;
              }
            })}
          </>
        )}
      </div>

      <ProfileBar user={user} />
    </div>
  )
}

export default ChannelBar
