import './ProfileBar.css'

const ProfileBar = ({user}) => {
    return (
        <div className="profile-container">
            <img src={user.profile_pic} className='profile-pic'/>
            <div>
                <h5>{user.username}</h5>
                <p></p>
            </div>
            <div>

            </div>
        </div>
    )
}
export default ProfileBar
