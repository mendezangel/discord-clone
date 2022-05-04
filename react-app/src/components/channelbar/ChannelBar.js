import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'
import Channel from '../channel/Channel'
const ChannelBar = ({user}) => {
    return (
        <div className="channel-bar">
            <Channel />
            <ProfileBar user={user}/>
        </div>
    )
}

export default ChannelBar
