import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delChannel } from '../../store/channels';
import './Channel.css';
import Popup from 'reactjs-popup';
import { useState } from 'react';

const Channel = ({ channel, server }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const editChannel = (e) => {
    e.stopPropagation()
    history.push({
      pathname: `/channels/${server.id}/${channel.id}/editchannel`,
      state: channel
    })
  }
  const deleteChannel = () => {
    if(server.channels.length >1){
      dispatch(delChannel(channel.id));
    } else {
      window.alert("You need to keep at least one channel per server.")
    }
  }

  const channelClick = () => {
    history.push(`/channels/${channel.server_id}/${channel.id}`)
  }
  return (
    <div className="channel-container" onClick={channelClick}>
      <div className='channel-name'>
        <i className="fas fa-hashtag"></i>
        {channel.name}
      </div>
      <div className='channel-delete'>
        <i className="fa-solid fa-gear" onClick={editChannel}></i>
        <i className="fa fa-trash" aria-hidden="true" onClick={deleteChannel}></i>
      </div>
    </div>
  )
}


export default Channel;
