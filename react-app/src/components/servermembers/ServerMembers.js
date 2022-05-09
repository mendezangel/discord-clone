import './ServerMembers.css'
import Popup from 'reactjs-popup'

const ServerMembers = ({ members }) => {
    if (members !== undefined) {
        let arr = []
        for (let member in members) {
            arr.push(members[member])
        }
        return (

            <div className='members-list'>
                {arr?.map((member, idx) => {
                    const name = member?.username.split('#')
                    return (
                        <Popup
                            trigger={open => (
                            <div key={idx} className='member'>
                                <img className='members-image' src={member.profile_pic} height='32px' alt="user profile" />
                                <p>{name[0]}</p>
                            </div>
                            )}
                            position="left top"  
                            closeOnEscape
                            on={'click'}
                        >
                            <>
                            <div className='modal-info'>
                                <p>{name}</p>
                                <img className='members-image' src={member.profile_pic} height='100px' width='100px' style={{margin: '20px'}} alt="user profile" />
                                {/* <button className='login-form-button'>
                                    Message {name}
                                </button> */}
                            </div>
                            </>
                        </Popup>
                    )
                })}

            </div>
        )
    }
    return null
}
export default ServerMembers
