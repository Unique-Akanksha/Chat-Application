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

const contacts = [
    {
        id: 1,
        name: "Sophia Clarke",
        avatar: "SC",
        lastMsg: "Are you free for a call later?",
        time: "2m",
        unread: 3,
        online: true,
        color: "#6c63ff",
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
        <aside
            style={{
                background: "var(--card)",
                borderRight: "1px solid var(--border)",
            }}
            className="flex flex-col w-80 shrink-0 h-full"
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--primary)" }}
                    >
                        <MessageSquare size={16} color="white" />
                    </div>
                    <span
                        style={{ color: "var(--foreground)" }}
                        className="tracking-tight"
                    >
                        Messages
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                    >
                        <Bell size={15} />
                    </button>
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                        style={{ background: "var(--primary)", color: "white" }}
                    >
                        <Plus size={15} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 pb-3">
                {(["chats", "calls", "contacts"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className="flex-1 py-1.5 rounded-lg capitalize transition-all"
                        style={{
                            background: tab === t ? "var(--primary)" : "transparent",
                            color: tab === t ? "white" : "var(--muted-foreground)",
                            fontSize: "13px",
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
                <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: "var(--input-background)" }}
                >
                    <Search size={14} style={{ color: "var(--muted-foreground)" }} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search conversations..."
                        className="flex-1 bg-transparent outline-none border-none placeholder:opacity-50"
                        style={{ color: "var(--foreground)", fontSize: "13px" }}
                    />
                </div>
            </div>

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto px-2 space-y-0.5 [&::-webkit-scrollbar]:hidden">
                {tab === "chats" &&
                    filtered.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            selected={selectedId === contact.id}
                            onClick={() => onSelect(contact.id)}
                        />
                    ))}
                {tab === "calls" && (
                    <CallsList />
                )}
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
            <div
                className="flex items-center justify-around px-4 py-3 mt-1"
                style={{ borderTop: "1px solid var(--border)" }}
            >
                <NavIcon icon={<MessageSquare size={18} />} active />
                <NavIcon icon={<Phone size={18} />} />
                <NavIcon icon={<Video size={18} />} />
                <NavIcon icon={<Settings size={18} />} />
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
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left"
            style={{
                background: selected ? "var(--primary)" : "transparent",
            }}
        >
            {/* Avatar */}
            <div className="relative shrink-0">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm text-white select-none"
                    style={{ background: selected ? "rgba(255,255,255,0.2)" : contact.color }}
                >
                    {contact.avatar}
                </div>
                {contact.online && (
                    <span
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                        style={{
                            background: "#22c55e",
                            borderColor: selected ? "var(--primary)" : "var(--card)",
                        }}
                    />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                    <span
                        className="truncate"
                        style={{
                            color: selected ? "white" : "var(--foreground)",
                            fontSize: "14px",
                        }}
                    >
                        {contact.name}
                    </span>
                    <span
                        style={{
                            color: selected ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)",
                            fontSize: "11px",
                        }}
                    >
                        {contact.time}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-1">
                    <span
                        className="truncate"
                        style={{
                            color: selected ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
                            fontSize: "12px",
                        }}
                    >
                        {contact.lastMsg}
                    </span>
                    {contact.unread > 0 && (
                        <span
                            className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white"
                            style={{
                                background: selected ? "rgba(255,255,255,0.3)" : "var(--primary)",
                                fontSize: "10px",
                            }}
                        >
                            {contact.unread}
                        </span>
                    )}
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
        <div className="space-y-0.5">
            {calls.map((call, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all hover:opacity-80"
                    style={{ background: "transparent" }}
                >
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                        style={{ background: call.color }}
                    >
                        {call.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div style={{ color: "var(--foreground)", fontSize: "14px" }}>{call.name}</div>
                        <div className="flex items-center gap-1" style={{ color: call.missed ? "#ef4444" : "var(--muted-foreground)", fontSize: "12px" }}>
                            {call.type === "video" ? <Video size={11} /> : <Phone size={11} />}
                            <span>{call.missed ? "Missed" : "Outgoing"} · {call.time}</span>
                        </div>
                    </div>
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "var(--muted)", color: "var(--primary)" }}
                    >
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
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "white" : "var(--muted-foreground)",
            }}
        >
            {icon}
        </button>
    );
}
