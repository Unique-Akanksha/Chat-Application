import styles from '../styles/sidebar.module.scss'
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaToggleOn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Sidebar = () => {
    return (
        <div className={styles.sidebarParent}>
            <div className={styles.topSection}>
                <div className={styles.logo}><div className={styles.iconContainer}><IoLogoWhatsapp className={styles.iconContainer} /></div>
                </div>
                <div className={styles.icons}>
                    <div className={styles.msg}><LuMessageCircleMore size={24} /></div>
                    <div className={styles.contact}><FaUserFriends size={24} /></div>
                    <div className={styles.phone} size={24}><FaPhoneAlt />
                    </div>
                    <div className={styles.setting}><MdOutlineSettings size={24} />
                    </div>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.icons}><FaToggleOn size={24} />
                </div>
                <div className={styles.profilePic}><FaUser size={24} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar