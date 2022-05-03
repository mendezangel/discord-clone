import LogoutButton from '../auth/LogoutButton'
import './ProfileBar.css'

const ProfileBar = ({user}) => {
    const name = user.username.split('#')

    return (
        <div className="profile-container">
            <div className='user-info'>
            <img src={user.profile_pic} className='profile-pic' alt='pp'/>
            <div className='profile-bar-name'>
                <h5 className='main-name'>{name[0]}</h5>
                <p className='name-tag'>{'#'+name[1]}</p>
            </div>
            </div>
            <div className='profile-settings'>
                <LogoutButton />
            </div>
        </div>
    )
}
export default ProfileBar
