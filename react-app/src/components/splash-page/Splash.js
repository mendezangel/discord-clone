import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Splash.css'

const Splash = () => {
    const user = useSelector(state => state.session.user);


    if (user) {
        return <Redirect to='/channels/@me' />;
    }

    return (
        <div>
            <div className=''>
                <div className="text-container">
                    <h1 className='splash-h1'>IMAGINE A PLACE...</h1>
                    <p className='splash-p'>...where you can belong to a school club, a gaming group, or a worldwide art community. <br></br>Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                </div>
                <div className='splash-body'>
                    
                </div>
            </div>
        </div>
    )
}

export default Splash
