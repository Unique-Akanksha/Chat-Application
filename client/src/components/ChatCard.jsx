import styles from '../styles/charcard.module.scss';
import { FaUser } from "react-icons/fa";

const ChatCard = () => {
    return (
        <div className={styles.chatCard}>

            <div className={styles.chatList}>
                <div className={styles.chatItem}>
                    <div className={styles.profile}><FaUser className={styles.userIcon} />
                        <div className={styles.active}></div>
                    </div>

                    <div className={styles.chatDetails}>
                        <div className={styles.chatName}>Akanksha</div>
                        <div className={styles.lastMessage}>Aknaksy</div>
                    </div>
                </div>
                <div>
                    <div className={styles.messageTime}>9:36</div>
                </div>

            </div>
        </div >
    )
}

export default ChatCard