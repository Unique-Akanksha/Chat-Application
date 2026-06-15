import { useState, useEffect } from "react";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    Phone,
    MonitorUp,
    MoreHorizontal,
    Maximize2,
    Volume2,
    MessageSquare,
} from "lucide-react";
import styles from "../styles/VideoCallModal.module.scss";
interface VideoCallModalProps {
    contact: { name: string; color: string; avatar: string };
    onClose: () => void;
}

export function VideoCallModal({ contact, onClose }: VideoCallModalProps) {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [status, setStatus] = useState<"calling" | "connected">("calling");

    useEffect(() => {
        const connectTimer = setTimeout(() => setStatus("connected"), 1500);
        return () => clearTimeout(connectTimer);
    }, []);

    useEffect(() => {
        if (status !== "connected") return;
        const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
        return () => clearInterval(timer);
    }, [status]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Main video area */}
                <div className={styles.videoArea}>
                    {/* Remote video (simulated) */}
                    <div
                        className={styles.remoteVideo}
                        style={{ background: `linear-gradient(135deg, ${contact.color}22, #0d1021)` }}
                    >
                        <div className={styles.avatar} style={{ background: contact.color }}>
                            {contact.avatar}
                        </div>
                        <div className={styles.name}>{contact.name}</div>
                        <div className={styles.status}>
                            {status === "calling" ? "Calling..." : formatTime(elapsed)}
                        </div>
                        {status === "connected" && (
                            <div className={styles.badge}>
                                <span className={styles.indicator} />
                                HD Connected
                            </div>
                        )}
                    </div>

                    {/* Self preview pip */}
                    <div className={styles.pip}>
                        {camOn ? (
                            <div className={styles.content} style={{ background: "linear-gradient(135deg, #6c63ff33, #1a1e2e)" }}>
                                <span className={styles.text}>You</span>
                            </div>
                        ) : (
                            <div className={styles.content}>
                                <VideoOff size={18} className={styles.icon} />
                                <span className={styles.text}>Camera off</span>
                            </div>
                        )}
                    </div>

                    {/* Top right */}
                    <div className={styles.topRight}>
                        <button>
                            <Maximize2 size={14} color="white" />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.leftActions}>
                        <CallBtn icon={<MonitorUp size={18} />} label="Share" onClick={() => { }} />
                        <CallBtn icon={<MessageSquare size={18} />} label="Chat" onClick={() => { }} />
                        <CallBtn icon={<Volume2 size={18} />} label="Audio" onClick={() => { }} />
                    </div>

                    <div className={styles.rightActions}>
                        <ToggleBtn
                            on={micOn}
                            onClick={() => setMicOn((v) => !v)}
                            iconOn={<Mic size={18} />}
                            iconOff={<MicOff size={18} />}
                            label={micOn ? "Mute" : "Unmute"}
                        />
                        <ToggleBtn
                            on={camOn}
                            onClick={() => setCamOn((v) => !v)}
                            iconOn={<Video size={18} />}
                            iconOff={<VideoOff size={18} />}
                            label={camOn ? "Stop" : "Start"}
                        />
                        <button
                            onClick={onClose}
                            className={styles.button}
                            style={{ background: "#ef4444" }}
                        >
                            <Phone size={20} color="white" style={{ transform: "rotate(135deg)" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CallBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className={styles.button} style={{ flexDirection: "column", gap: "0.25rem" }}>
            <div className={styles.icon}>{icon}</div>
            <span className={styles.label}>{label}</span>
        </button>
    );
}

function ToggleBtn({
    on,
    onClick,
    iconOn,
    iconOff,
    label,
}: {
    on: boolean;
    onClick: () => void;
    iconOn: React.ReactNode;
    iconOff: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={on ? styles.active : styles.off}
            style={{ ...styles, flexDirection: "column", gap: "0.25rem" }}
        >
            <div className={styles.icon}>{on ? iconOn : iconOff}</div>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
