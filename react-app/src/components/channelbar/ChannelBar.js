import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ChannelBar.css'
import ProfileBar from '../profilebar/ProfileBar'
import { delServer } from '../../store/server';

const ChannelBar = ({ user }) => {
  const { server_id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const onDelete = () => {
    dispatch(delServer(server_id))
    history.push('/channels/@me')
  }
  return (
    <div className="channel-bar">
      {server_id !== '@me' && (
        <button onClick={onDelete}>Delete</button>
      )}
      <ProfileBar user={user} />
    </div>
  )
}

export default ChannelBar
