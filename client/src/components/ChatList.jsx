import styles from "../styles/chatlist.module.scss";
import { TbCircleDotted } from "react-icons/tb";
import Searchbar from './Searchbar';
import ChatCard from './ChatCard';

const ChatList = () => {
    return (
        <div className={styles.chatList}>
            <div className={styles.chatListHeader}>
                <div className={styles.chatText}>Chats</div>
                <div className={styles.chaticon}><TbCircleDotted size={20} /></div>
            </div>
            <div className={styles.searchContainer}>
                <Searchbar />
            </div>
            <div className={styles.ChatCard}>
                <div className={styles.heading}>
                    All Chats
                </div>
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
            </div>
        </div >
    )
}

export default ChatList