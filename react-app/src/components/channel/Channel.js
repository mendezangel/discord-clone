import './Channel.css'

const Channel = () => {
  return (
  <div className="channel-container">
    
    <div className='channel-name'>
      <i class="fas fa-hashtag"></i>
      yo bro
    </div>
    <div className='channel-delete'>
    <i class="fa-solid fa-gear"></i>
    <i class="fa fa-trash" aria-hidden="true"></i>
    </div>
  </div>
  )
}


export default Channel;