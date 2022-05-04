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
    const server = useSelector(state => state.server[server_id])
    console.log(server)
    const onDelete = () => {
        dispatch(delServer(server_id))
        history.push('/channels/@me')
    }
    return (
        <div className="channel-bar">
            
            <div className="channel-bar-top">
                <h2>{server?.name}</h2>
                {server_id !== '@me' && (
                    <div className='channel-bar-server-info'>
                    <button onClick={onDelete} className="server-button">Delete</button>
                    <button className="server-button">Edit</button>
                    </ div>
                )}
                <p className='channel-bar-p'>CHANNELS</p>
                <Channel />
            </div>

            <ProfileBar user={user} />
        </div>
    )
}

export default ChannelBar
