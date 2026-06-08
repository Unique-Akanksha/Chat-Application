import { Phone, Video, Image, FileText, Link2, Star, Bell, BellOff, Archive } from "lucide-react";

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
        <aside
            className="flex flex-col w-64 shrink-0 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
                background: "var(--card)",
                borderLeft: "1px solid var(--border)",
            }}
        >
            {/* Profile */}
            <div className="flex flex-col items-center pt-8 pb-5 px-4">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl text-white mb-3"
                    style={{ background: info.color }}
                >
                    {info.avatar}
                </div>
                <div style={{ color: "var(--foreground)", fontSize: "16px", textAlign: "center" }}>{info.name}</div>
                <div style={{ color: "var(--muted-foreground)", fontSize: "12px", marginTop: "4px" }}>{info.role}</div>
                <div
                    className="flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full"
                    style={{
                        background: info.online ? "rgba(34,197,94,0.12)" : "rgba(107,114,128,0.15)",
                        color: info.online ? "#22c55e" : "var(--muted-foreground)",
                        fontSize: "11px",
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: info.online ? "#22c55e" : "var(--muted-foreground)" }}
                    />
                    {info.online ? "Online" : "Offline"}
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2 mt-4">
                    <QuickAction icon={<Phone size={14} />} label="Call" />
                    <QuickAction icon={<Video size={14} />} label="Video" />
                </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)" }} className="mx-4" />

            {/* Info */}
            <div className="px-4 py-4 space-y-3">
                <SectionTitle>Contact Info</SectionTitle>
                <InfoRow label="Email" value={info.email} />
                <InfoRow label="Role" value={info.role} />
                <InfoRow label="Status" value={info.online ? "Available" : "Away"} />
            </div>

            <div style={{ borderTop: "1px solid var(--border)" }} className="mx-4" />

            {/* Shared Photos */}
            <div className="px-4 py-4">
                <SectionTitle>Shared Photos</SectionTitle>
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                    {sharedPhotos.map((color, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ background: `${color}33` }}
                        />
                    ))}
                </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)" }} className="mx-4" />

            {/* Shared Files */}
            <div className="px-4 py-4">
                <SectionTitle>Shared Files</SectionTitle>
                <div className="mt-3 space-y-2">
                    {sharedFiles.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ background: "var(--muted)" }}
                        >
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: "var(--primary)", opacity: 0.8 }}
                            >
                                <FileText size={12} color="white" />
                            </div>
                            <div className="min-w-0">
                                <div className="truncate" style={{ color: "var(--foreground)", fontSize: "11px" }}>
                                    {file.name}
                                </div>
                                <div style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>{file.size}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)" }} className="mx-4" />

            {/* Actions */}
            <div className="px-4 py-4 space-y-1">
                <SectionTitle>Options</SectionTitle>
                <ActionRow icon={<Star size={14} />} label="Mark as Favourite" />
                <ActionRow icon={<Bell size={14} />} label="Notifications" />
                <ActionRow icon={<Archive size={14} />} label="Archive Chat" />
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
        <div>
            <div style={{ color: "var(--muted-foreground)", fontSize: "11px" }}>{label}</div>
            <div style={{ color: "var(--foreground)", fontSize: "13px" }}>{value}</div>
        </div>
    );
}

function ActionRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl transition-opacity hover:opacity-80 text-left"
            style={{ color: "var(--muted-foreground)" }}
        >
            {icon}
            <span style={{ fontSize: "13px" }}>{label}</span>
        </button>
    );
}
