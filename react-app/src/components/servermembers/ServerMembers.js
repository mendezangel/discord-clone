import './ServerMembers.css'

const ServerMembers = ({members}) => {
    if(members !== undefined){
        let arr = []
        for(let member in members){
            arr.push(members[member])
        }
        return (
            <div className='members-list'>
            {arr?.map((member,idx) => {
                const name = member?.username.split('#')
                return (
                    <div key={idx} className='member'>
                        <img className='members-image' src={member.profile_pic} height='32px' alt="user profile" />
                        <p>{name[0]}</p>
                    </div>
                )
            })}

        </div>
    )
}
return null
}
export default ServerMembers
