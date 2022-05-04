import './Channel.css'

const Channel = ({ channel }) => {
  return (
  <div className="channel-container">
    
    <div className='channel-name'>
      <i className="fas fa-hashtag"></i>
      {channel.name}
    </div>
    <div className='channel-delete'>
    <i className="fa-solid fa-gear"></i>
    <i className="fa fa-trash" aria-hidden="true"></i>
    </div>
  </div>
  )
}


export default Channel;