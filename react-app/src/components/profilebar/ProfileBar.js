import LogoutButton from '../auth/LogoutButton'
import './ProfileBar.css'
import Popup from 'reactjs-popup';

const ProfileBar = ({ user }) => {
    const name = user.username.split('#')
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(user.username)
        } catch {
            console.log('fail')
        }
    }
    return (

            <div className="profile-container">
                <Popup
                    trigger={open => (
                        <div className='user-info'>
                        <img src={user.profile_pic} className='profile-pic' alt='pp'/>
                        <div className='profile-bar-name' onClick={() => copy()}>
                            <h5 className='main-name'>{name[0]}</h5>
                            <p className='name-tag'>{'#'+name[1]}</p>
                        </div>
                        </div>
                    )}
                    position="top center"
                    closeOnDocumentClick
                    closeOnEscape
                    on={'click'}
                >
                    Copied!
                </Popup>
                <div className='profile-settings'>
                    <LogoutButton />
                </div>
            </div>
    )
}
export default ProfileBar
