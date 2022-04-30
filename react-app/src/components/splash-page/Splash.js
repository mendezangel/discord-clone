import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Splash.css'

const Splash = () => {
    const user = useSelector(state => state.session.user);


    if (user) {
        return <Redirect to='/@me' />;
    }

    return (
        <div>
            <div className="splash-image">

            </div>
            <div className="scrollable-obj">

            </div>
        </div>
    )
}

export default Splash
