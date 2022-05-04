import { useParams } from 'react-router-dom';
import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'

const ChannelBar = ({ user }) => {
  const params = useParams()
  console.log(params)
  return (
    <div className="channel-bar">
      <ProfileBar user={user} />
    </div>
  )
}

export default ChannelBar
