import { Phone, Video, Image, FileText, Link2, Star, Bell, BellOff, Archive } from "lucide-react";
import styles from "../styles/RightPanel.module.scss";
const contactInfo: Record<number, { name: string; color: string; avatar: string; online: boolean; role: string; email: string }> = {
    1: { name: "Sophia Clarke", color: "#6c63ff", avatar: "SC", online: true, role: "Product Designer", email: "sophia@company.com" },
    2: { name: "Ethan Rodriguez", color: "#22d3ee", avatar: "ER", online: true, role: "Backend Engineer", email: "ethan@company.com" },
    3: { name: "Mia Johnson", color: "#f472b6", avatar: "MJ", online: false, role: "QA Engineer", email: "mia@company.com" },
    4: { name: "Design Team", color: "#fb923c", avatar: "DT", online: true, role: "4 members", email: "design@company.com" },
    5: { name: "Lucas Bennett", color: "#4ade80", avatar: "LB", online: false, role: "Frontend Engineer", email: "lucas@company.com" },
    6: { name: "Ava Patel", color: "#facc15", avatar: "AP", online: true, role: "Engineering Manager", email: "ava@company.com" },
    7: { name: "Noah Williams", color: "#a78bfa", avatar: "NW", online: false, role: "Full-Stack Engineer", email: "noah@company.com" },
};

const sharedFiles = [
    { name: "Dashboard_Mockup_v3.fig", size: "2.4 MB", type: "figma" },
    { name: "API_Documentation.pdf", size: "840 KB", type: "pdf" },
    { name: "Component_Library.zip", size: "12.1 MB", type: "zip" },
];

const sharedPhotos = [
    "#6c63ff", "#22d3ee", "#f472b6", "#fb923c", "#4ade80", "#facc15",
];

export function RightPanel({ contactId }: { contactId: number }) {
    const info = contactInfo[contactId];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.profile}>
                <div className={styles.avatar} style={{ background: info.color }}>
                    {info.avatar}
                </div>
                <div className={styles.name}>{info.name}</div>
                <div className={styles.role}>{info.role}</div>
                <div className={`${styles.statusBadge} ${info.online ? styles.online : styles.offline}`}>
                    <span className={styles.indicator} />
                    {info.online ? "Online" : "Offline"}
                </div>

                <div className={styles.quickActions}>
                    <QuickAction icon={<Phone size={14} />} label="Call" />
                    <QuickAction icon={<Video size={14} />} label="Video" />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.section} ${styles.info}`}>
                <SectionTitle>Contact Info</SectionTitle>
                <div className={styles.content}>
                    <InfoRow label="Email" value={info.email} />
                    <InfoRow label="Role" value={info.role} />
                    <InfoRow label="Status" value={info.online ? "Available" : "Away"} />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.section} ${styles.photos}`}>
                <SectionTitle>Shared Photos</SectionTitle>
                <div className={styles.grid}>
                    {sharedPhotos.map((color, i) => (
                        <div
                            key={i}
                            className={styles.photo}
                            style={{ background: `${color}33` }}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.divider} />

            {/* Shared Files */}
            <div className={`${styles.section} ${styles.files}`}>
                <SectionTitle>Shared Files</SectionTitle>
                <div className={styles.fileList}>
                    {sharedFiles.map((file, i) => (
                        <div key={i} className={styles.fileItem}>
                            <div className={styles.icon}>
                                <FileText size={12} color="white" />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.name}>{file.name}</div>
                                <div className={styles.size}>{file.size}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.section} ${styles.options}`}>
                <SectionTitle>Options</SectionTitle>
                <div className={styles.actionList}>
                    <ActionRow icon={<Star size={14} />} label="Mark as Favourite" />
                    <ActionRow icon={<Bell size={14} />} label="Notifications" />
                    <ActionRow icon={<Archive size={14} />} label="Archive Chat" />
                </div>
            </div>
        </aside>
    );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ background: "var(--muted)" }}
        >
            <span style={{ color: "var(--primary)" }}>{icon}</span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>{label}</span>
        </button>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ color: "var(--muted-foreground)", fontSize: "11px", letterSpacing: "0.08em" }}>
            {String(children).toUpperCase()}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className={styles.infoRow}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}

function ActionRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className={styles.action}>
            <span className={styles.icon}>{icon}</span>
            <span>{label}</span>
        </button>
    );
}