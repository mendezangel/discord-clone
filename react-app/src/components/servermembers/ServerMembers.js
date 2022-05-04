import './ServerMembers.css'

const ServerMembers = ({members}) => {
    return (
        <div className='members-list'>
            {members?.map((member,idx) => {
                const name = member?.username.split('#')
                return (
                    <div key={idx} className='member'>{name[0]}</div>
                )
            })}
        </div>
    )
}
export default ServerMembers
