import styles from "./../styles/maincomponent.module.scss"
import ChatDashboard from "./ChatDashboard"
import ChatList from "./ChatList"
import Sidebar from "./Sidebar"
const MainComponent = () => {
    return (
        <div className={styles.mainComponent}>
            <Sidebar />
            <ChatList />
            <ChatDashboard />

        </div>
    )
}

export default MainComponent