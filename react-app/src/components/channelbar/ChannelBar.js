import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'

const ChannelBar = ({user}) => {
    return (
        <div className="channel-bar">
            <ProfileBar user={user}/>
        </div>
    )
}

export default ChannelBar
