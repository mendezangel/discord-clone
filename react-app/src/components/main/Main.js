import ServerBar from "../serverbar/ServerBar.js"
import ChannelBar from "../channelbar/ChannelBar.js"
import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <ServerBar />
            <ChannelBar />
        </div>
    )
}

export default Main
