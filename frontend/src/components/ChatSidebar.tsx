import { useState } from "react";
import {
    Search,
    MessageSquare,
    Phone,
    Video,
    Settings,
    Bell,
    Plus,
    MoreHorizontal,
    CheckCheck,
    Circle,
} from "lucide-react";
import styles from "../styles/ChatSidebar.module.scss";
const contacts = [
    {
        id: 1,
        name: "Sophia Clarke",
        avatar: "SC",
        lastMsg: "Are you free for a call later?",
        time: "2m",
        unread: 3,
        online: true,
        color: "lightpink",
    },
    {
        id: 2,
        name: "Ethan Rodriguez",
        avatar: "ER",
        lastMsg: "I'll send the files now.",
        time: "15m",
        unread: 0,
        online: true,
        color: "#22d3ee",
    },
    {
        id: 3,
        name: "Mia Johnson",
        avatar: "MJ",
        lastMsg: "Thanks for the update!",
        time: "1h",
        unread: 1,
        online: false,
        color: "#f472b6",
    },
    {
        id: 4,
        name: "Design Team",
        avatar: "DT",
        lastMsg: "New mockups are ready for review",
        time: "2h",
        unread: 5,
        online: true,
        color: "#fb923c",
        isGroup: true,
    },
    {
        id: 5,
        name: "Lucas Bennett",
        avatar: "LB",
        lastMsg: "See you tomorrow!",
        time: "3h",
        unread: 0,
        online: false,
        color: "#4ade80",
    },
    {
        id: 6,
        name: "Ava Patel",
        avatar: "AP",
        lastMsg: "The meeting went well.",
        time: "Yesterday",
        unread: 0,
        online: true,
        color: "#facc15",
    },
    {
        id: 7,
        name: "Noah Williams",
        avatar: "NW",
        lastMsg: "Can you review this PR?",
        time: "Yesterday",
        unread: 0,
        online: false,
        color: "#a78bfa",
    },
];

type Tab = "chats" | "calls" | "contacts";

interface ChatSidebarProps {
    selectedId: number;
    onSelect: (id: number) => void;
}

export function ChatSidebar({ selectedId, onSelect }: ChatSidebarProps) {
    const [tab, setTab] = useState<Tab>("chats");
    const [search, setSearch] = useState("");

    const filtered = contacts.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className={styles.sidebar}>
            {/* Top bar */}
            <div className={styles.topBar}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <MessageSquare size={16} color="white" />
                    </div>
                    <span className={styles.text}>Messages</span>
                </div>
                <div className={styles.actions}>
                    <button>
                        <Bell size={15} />
                    </button>
                    <button className={styles.createButton}>
                        <Plus size={15} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                {(["chats", "calls", "contacts"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`${styles.tab} ${tab === t ? styles.active : ""}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className={styles.search}>
                <div className={styles.searchInput}>
                    <Search size={14} style={{ color: "var(--muted-foreground)" }} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search conversations..."
                        style={{ color: "var(--foreground)" }}
                    />
                </div>
            </div>

            {/* Contact list */}
            <div className={styles.contactList}>
                {tab === "chats" &&
                    filtered.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            selected={selectedId === contact.id}
                            onClick={() => onSelect(contact.id)}
                        />
                    ))}
                {tab === "calls" && <CallsList />}
                {tab === "contacts" &&
                    filtered.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            selected={selectedId === contact.id}
                            onClick={() => onSelect(contact.id)}
                        />
                    ))}
            </div>

            {/* Bottom nav */}
            <div style={{ borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0.75rem 1rem", marginTop: "0.25rem" }}>
                    <NavIcon icon={<MessageSquare size={18} />} active />
                    <NavIcon icon={<Phone size={18} />} />
                    <NavIcon icon={<Video size={18} />} />
                    <NavIcon icon={<Settings size={18} />} />
                </div>
            </div>
        </aside>
    );
}

function ContactRow({
    contact,
    selected,
    onClick,
}: {
    contact: (typeof contacts)[0];
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button onClick={onClick} className={`${styles.contactRow} ${selected ? styles.selected : ""}`}>
            <div className={styles.content}>
                <div className={styles.avatar} style={{ background: contact.color }}>
                    {contact.avatar}
                </div>
                <div className={styles.info}>
                    <div className={styles.header}>
                        <div className={styles.name}>{contact.name}</div>
                        <div className={styles.time}>{contact.time}</div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.lastMsg}>{contact.lastMsg}</div>
                        {contact.unread > 0 && (
                            <div className={styles.unread}>{contact.unread}</div>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}

function CallsList() {
    const calls = [
        { name: "Sophia Clarke", type: "video", missed: false, time: "Today, 10:30 AM", color: "#6c63ff" },
        { name: "Ethan Rodriguez", type: "audio", missed: true, time: "Today, 9:15 AM", color: "#22d3ee" },
        { name: "Design Team", type: "video", missed: false, time: "Yesterday, 3:00 PM", color: "#fb923c" },
        { name: "Mia Johnson", type: "audio", missed: false, time: "Yesterday, 11:00 AM", color: "#f472b6" },
    ];

    return (
        <div className={styles.callsList}>
            {calls.map((call, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "0.75rem", cursor: "pointer", opacity: 0.7 }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", color: "white", flexShrink: 0, background: call.color }}>
                        {call.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "var(--foreground)", fontSize: "0.875rem" }}>{call.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: call.missed ? "#ef4444" : "var(--muted-foreground)", fontSize: "0.75rem" }}>
                            {call.type === "video" ? <Video size={11} /> : <Phone size={11} />}
                            <span>{call.missed ? "Missed" : "Outgoing"} · {call.time}</span>
                        </div>
                    </div>
                    <button style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--muted)", color: "var(--primary)", cursor: "pointer", border: "none" }}>
                        {call.type === "video" ? <Video size={14} /> : <Phone size={14} />}
                    </button>
                </div>
            ))}
        </div>
    );
}

function NavIcon({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
    return (
        <button
            style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                background: active ? "var(--primary)" : "transparent",
                color: active ? "white" : "var(--muted-foreground)",
                border: "none",
                cursor: "pointer",
            }}
        >
            {icon}
        </button>
    );
}
