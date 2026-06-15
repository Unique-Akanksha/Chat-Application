import { useState, useRef, useEffect } from "react";
import {
    Phone,
    Video,
    MoreHorizontal,
    Paperclip,
    Smile,
    Send,
    Mic,
    Search,
    CheckCheck,
    Image,
    Info,
} from "lucide-react";
import { AudioCallModal } from "./AudioCallModal";
import { VideoCallModal } from "./VideoCallModal";
import styles from "../styles/ChatWindow.module.scss";

const conversationsMap: Record<number, { sender: string; text: string; time: string; own: boolean }[]> = {
    1: [
        { sender: "Sophia Clarke", text: "Hey! Are you working on the new dashboard?", time: "10:02 AM", own: false },
        { sender: "You", text: "Yes! Just finishing up the charts component. It's looking great.", time: "10:04 AM", own: true },
        { sender: "Sophia Clarke", text: "Awesome! Can you share a preview when you're done?", time: "10:05 AM", own: false },
        { sender: "You", text: "Of course, will do in about 20 mins 👍", time: "10:06 AM", own: true },
        { sender: "Sophia Clarke", text: "Are you free for a call later? I have some feedback on the design system.", time: "10:15 AM", own: false },
    ],
    2: [
        { sender: "Ethan Rodriguez", text: "Hey, the API endpoints are ready for testing.", time: "9:30 AM", own: false },
        { sender: "You", text: "Perfect timing! I just finished the frontend integration.", time: "9:45 AM", own: true },
        { sender: "Ethan Rodriguez", text: "I'll send the files now.", time: "9:50 AM", own: false },
    ],
    3: [
        { sender: "Mia Johnson", text: "The new feature is live on staging!", time: "8:00 AM", own: false },
        { sender: "You", text: "Already testing it, looks good so far.", time: "8:30 AM", own: true },
        { sender: "Mia Johnson", text: "Thanks for the update!", time: "8:35 AM", own: false },
    ],
    4: [
        { sender: "Alex", text: "Team, the new mockups are ready for review!", time: "2:00 PM", own: false },
        { sender: "Jordan", text: "Looking amazing! Love the color palette.", time: "2:05 PM", own: false },
        { sender: "You", text: "Will review by EOD today.", time: "2:10 PM", own: true },
        { sender: "Alex", text: "New mockups are ready for review, please check Figma.", time: "2:30 PM", own: false },
    ],
    5: [
        { sender: "Lucas Bennett", text: "Great meeting today!", time: "Yesterday", own: false },
        { sender: "You", text: "Agreed, very productive.", time: "Yesterday", own: true },
        { sender: "Lucas Bennett", text: "See you tomorrow!", time: "Yesterday", own: false },
    ],
    6: [
        { sender: "Ava Patel", text: "The sprint planning went really well today.", time: "Yesterday", own: false },
        { sender: "You", text: "Yes, the team is aligned on the roadmap now.", time: "Yesterday", own: true },
        { sender: "Ava Patel", text: "The meeting went well.", time: "Yesterday", own: false },
    ],
    7: [
        { sender: "Noah Williams", text: "I just pushed a major refactor.", time: "Yesterday", own: false },
        { sender: "You", text: "Nice! I'll take a look.", time: "Yesterday", own: true },
        { sender: "Noah Williams", text: "Can you review this PR?", time: "Yesterday", own: false },
    ],
};

const contactInfo: Record<number, { name: string; color: string; avatar: string; online: boolean; role: string }> = {
    1: { name: "Sophia Clarke", color: "#6c63ff", avatar: "SC", online: true, role: "Product Designer" },
    2: { name: "Ethan Rodriguez", color: "#22d3ee", avatar: "ER", online: true, role: "Backend Engineer" },
    3: { name: "Mia Johnson", color: "#f472b6", avatar: "MJ", online: false, role: "QA Engineer" },
    4: { name: "Design Team", color: "#fb923c", avatar: "DT", online: true, role: "4 members" },
    5: { name: "Lucas Bennett", color: "#4ade80", avatar: "LB", online: false, role: "Frontend Engineer" },
    6: { name: "Ava Patel", color: "#facc15", avatar: "AP", online: true, role: "Engineering Manager" },
    7: { name: "Noah Williams", color: "#a78bfa", avatar: "NW", online: false, role: "Full-Stack Engineer" },
};

export function ChatWindow({ contactId }: { contactId: number }) {
    const info = contactInfo[contactId];
    const initialMsgs = conversationsMap[contactId] ?? [];
    const [messages, setMessages] = useState(initialMsgs);
    const [input, setInput] = useState("");
    const [showVideo, setShowVideo] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages(conversationsMap[contactId] ?? []);
    }, [contactId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMsg = () => {
        if (!input.trim()) return;
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages((prev) => [...prev, { sender: "You", text: input.trim(), time, own: true }]);
        setInput("");
    };

    return (
        <>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar} style={{ background: info.color }}>
                            {info.avatar}
                        </div>
                        {info.online && <span className={styles.onlineIndicator} />}
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{info.name}</div>
                        <div className={styles.status} style={{ color: info.online ? "#22c55e" : "var(--muted-foreground)" }}>
                            {info.online ? "Online" : "Offline"} · {info.role}
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <HeaderBtn onClick={() => setShowAudio(true)} icon={<Phone size={16} />} />
                        <HeaderBtn onClick={() => setShowVideo(true)} icon={<Video size={16} />} />
                        <HeaderBtn icon={<Search size={16} />} />
                        <HeaderBtn icon={<Info size={16} />} />
                    </div>
                </div>

                <div className={styles.messagesContainer}>
                    {messages.map((msg, i) => (
                        <MessageBubble key={i} msg={msg} info={info} />
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className={styles.inputSection}>
                    <div className={styles.inputWrapper}>
                        <button className={styles.iconButton}>
                            <Paperclip size={16} />
                        </button>
                        <button className={styles.iconButton}>
                            <Image size={16} />
                        </button>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMsg();
                                }
                            }}
                            placeholder={`Message ${info.name}...`}
                            rows={1}
                        />
                        <button className={styles.iconButton}>
                            <Smile size={16} />
                        </button>
                        {input.trim() ? (
                            <button onClick={sendMsg} className={styles.sendButton}>
                                <Send size={15} color="white" />
                            </button>
                        ) : (
                            <button className={styles.sendButton}>
                                <Mic size={15} color="white" />
                            </button>
                        )}
                    </div>
                    <p className={styles.hint}>Press Enter to send · Shift+Enter for new line</p>
                </div>
            </div>

            {showVideo && <VideoCallModal contact={info} onClose={() => setShowVideo(false)} />}
            {showAudio && <AudioCallModal contact={info} onClose={() => setShowAudio(false)} />}
        </>
    );
}

function HeaderBtn({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
        >
            {icon}
        </button>
    );
}

function MessageBubble({
    msg,
    info,
}: {
    msg: { sender: string; text: string; time: string; own: boolean };
    info: { name: string; color: string; avatar: string };
}) {
    if (msg.own) {
        return (
            <div className={`${styles.messageBubble} ${styles.own}`}>
                <div className={styles.bubble}>
                    <p>{msg.text}</p>
                </div>
                <div className={styles.timestamp}>
                    <span>{msg.time}</span>
                    <CheckCheck size={12} style={{ color: "var(--primary)" }} />
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.messageBubble} ${styles.other}`}>
            <div className={styles.avatar} style={{ background: info.color }}>
                {info.avatar}
            </div>
            <div>
                <div className={styles.bubble}>
                    <p>{msg.text}</p>
                </div>
                <div className={styles.timestamp}>
                    <span>{msg.time}</span>
                </div>
            </div>
        </div>
    );
}
