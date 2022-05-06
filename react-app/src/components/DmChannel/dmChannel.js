import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delDM } from '../../store/dms';
import '../channel/Channel.css';

const Channel = ({ channel, server }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const deleteChannel = () => dispatch(delDM(channel.id));

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
        <i className="fa fa-trash" aria-hidden="true" onClick={deleteChannel}></i>
      </div>
    </div>
  )
}


export default Channel;