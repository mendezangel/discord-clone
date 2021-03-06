import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'
import Channel from '../channel/Channel'
import DmChannel from '../DmChannel/dmChannel'

import { delServer } from '../../store/server';

const ChannelBar = ({ user }) => {
  const { server_id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const server = useSelector(state => state.server[server_id]);
  const channelState = useSelector(state => state.channel);
  const channels = channelState.channels;
  const dmChannels = useSelector(state => state.dms)
  let objdms = {}
  if (Array.isArray(dmChannels.dms)) {
    dmChannels?.dms?.forEach(channel => {
      objdms[channel.recipient_server_id] = channel
    })
  }
  objdms = Object.keys(objdms)

  const createDM = () => {
    history.push({
      pathname: '/dms/new',
      state: user
    })
  }
  const createChannel = () => {
    history.push({
      pathname: '/channels/new',
      server_id
    })
  }
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
        {server_id === undefined && (
          <>
            <p className='server-name-text' onClick={copy}>{user?.username.split('#')[0]}</p>

            <div className='channel-bar-text'>
              <p className='channel-bar-p'>{server?.id}Direct Messages</p>
              <i className="fas fa-plus" onClick={createDM}></i>
            </div>
            {dmChannels?.channels?.map(channel => {
              if (channel.server_id === user?.me_server || objdms.includes(String(user?.me_server))) {
                return (
                  <DmChannel channel={channel} server={server} key={channel.id} />
                )
              } else {
                return null;
              }
            })}
          </>
        )}
        {server_id !== undefined && (
          <>
            <p className='server-name-text' onClick={copy}>{server?.name}</p>
            <div className='channel-bar-server-info'>
              {
                user.id === server?.owner_id ?
                <>
                  <button onClick={onDelete} className="server-button">Delete</button>
                  <button className="server-button" onClick={editButton} >Edit</button>
                </>
                :
                null
              }
            </ div>
            <div className='channel-bar-text'>
              <p className='channel-bar-p'>CHANNELS</p>
              <i className="fas fa-plus" onClick={createChannel}></i>
            </div>
            {channels?.map(channel => {
              if (channel.server_id === server?.id) {
                return (
                  <Channel channel={channel} server={server} key={channel.id} />
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
