import './ServerMembers.css'

const ServerMembers = ({members}) => {
    return (
        <div className='members-list'>
            {members?.map((member,idx) => {
                const name = member?.username.split('#')
                return (
                    <div key={idx} className='member'>
                        <img className='members-image' src={member.profile_pic} height='32px'/>
                        <p>{name[0]}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default ServerMembers
