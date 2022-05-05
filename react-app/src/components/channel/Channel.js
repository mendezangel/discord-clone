import { useHistory } from 'react-router-dom'
import './Channel.css'

const Channel = ({ channel }) => {
const history = useHistory()

const editChannel = () => {
  history.push({
    pathname: `/channels/${channel.id}/editchannel`,
    state: channel
  })
}


  return (
    <div className="channel-container">
      <div className='channel-name'>
        <i className="fas fa-hashtag"></i>
        {channel.name}
      </div>
      <div className='channel-delete'>
        <i className="fa-solid fa-gear" onClick={editChannel}></i>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </div>
    </div>
  )
}


export default Channel;