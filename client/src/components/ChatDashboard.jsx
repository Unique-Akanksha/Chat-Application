import { useState, useRef, useEffect } from 'react'
import styles from "../styles/chatdashboard.module.scss";
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdSend } from 'react-icons/io';
import { IoMdLink } from "react-icons/io";

const sampleMessages = [
    { id: 1, text: 'Hey! How are you?', fromMe: false, time: '10:02 AM' },
    { id: 2, text: "I'm good — working on the new UI.", fromMe: true, time: '10:04 AM' },
    { id: 3, text: 'Nice — looks great!', fromMe: false, time: '10:05 AM' },
]

const ChatDashboard = () => {
    const [messages, setMessages] = useState(sampleMessages)
    const [input, setInput] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const scrollRef = useRef(null)
    const profileImg = 'https://i.pravatar.cc/150?img=32'

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [messages])

    const sendMessage = () => {
        if (!input.trim()) return
        setMessages(prev => [...prev, { id: Date.now(), text: input.trim(), fromMe: true, time: 'Now' }])
        setInput('')
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage()
    }

    return (
        <div className={styles.parent}>
            <div className={styles.header}>
                <div className={styles.profileSection}>
                    <div className={styles.profile}>
                        <img src={profileImg} alt="profile" />
                        <div className={styles.active}></div>
                    </div>
                    <div className={styles.userMeta}>
                        <div className={styles.displayName}>Akanksha</div>
                        <div className={styles.online}>online</div>
                    </div>
                </div>
                <div className={styles.actionIcons}>
                    <div className={styles.icons}><BsCameraVideo /></div>
                    <div className={styles.icons}><IoCallOutline /></div>
                    <div className={styles.icons}><CiSearch /></div>
                    <div className={styles.icons} onClick={() => setShowMenu(s => !s)} style={{ position: 'relative' }}>
                        <FaAngleDown />
                        {showMenu && (
                            <div className={styles.menu}>
                                <div className={styles.menuItem}>View Profile</div>
                                <div className={styles.menuItem}>Mute Notifications</div>
                                <div className={styles.menuItem}>Block</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.body} ref={scrollRef}>
                <div className={styles.messages}>
                    {messages.map(m => (
                        <div key={m.id} className={m.fromMe ? styles.messageSent : styles.messageReceived}>
                            {!m.fromMe && (
                                <img src={`https://i.pravatar.cc/40?img=${m.id % 70}`} alt="sender" className={styles.msgAvatar} />
                            )}
                            <div className={styles.bubble}>{m.text}</div>
                            <div className={styles.time}>{m.time} {m.fromMe && <span className={styles.status}>✓✓</span>}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.inputSection}>
                <div className={styles.inputbox}>
                    <div className={styles.leftIcons}>
                        <div className={styles.emoticon}><BsEmojiSmile /></div>
                        <div className={styles.linkItem}><IoMdLink /></div>
                    </div>
                    <input
                        type="text"
                        placeholder='Type a message'
                        className={styles.input}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className={styles.sendButton} onClick={sendMessage}>
                    <IoMdSend />
                </div>
            </div>
        </div>
    )
}

export default ChatDashboard