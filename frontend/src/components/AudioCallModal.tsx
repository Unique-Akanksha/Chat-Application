import { useState, useEffect } from "react";
import { Mic, MicOff, Phone, Volume2, VolumeX, Speaker } from "lucide-react";
import styles from "../styles/AudioCallModal.module.scss";
interface AudioCallModalProps {
    contact: { name: string; color: string; avatar: string };
    onClose: () => void;
}

export function AudioCallModal({ contact, onClose }: AudioCallModalProps) {
    const [micOn, setMicOn] = useState(true);
    const [speakerOn, setSpeakerOn] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [status, setStatus] = useState<"calling" | "connected">("calling");
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const connectTimer = setTimeout(() => setStatus("connected"), 2000);
        return () => clearTimeout(connectTimer);
    }, []);

    useEffect(() => {
        if (status !== "connected") return;
        const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
        const pulseTimer = setInterval(() => setPulse((p) => !p), 800);
        return () => {
            clearInterval(timer);
            clearInterval(pulseTimer);
        };
    }, [status]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Glow rings */}
                <div className={styles.glowRings}>
                    {status === "connected" && (
                        <>
                            <div
                                className={styles.innerRing}
                                style={{
                                    width: pulse ? "120px" : "100px",
                                    height: pulse ? "120px" : "100px",
                                    background: `${contact.color}18`,
                                }}
                            />
                            <div
                                className={styles.outerRing}
                                style={{
                                    width: pulse ? "160px" : "140px",
                                    height: pulse ? "160px" : "140px",
                                    background: `${contact.color}09`,
                                }}
                            />
                        </>
                    )}
                    <div className={styles.avatar} style={{ background: contact.color }}>
                        {contact.avatar}
                    </div>
                </div>

                <div className={styles.name}>{contact.name}</div>
                <div className={styles.status}>
                    {status === "calling" ? <span className={styles.pulse}>Calling...</span> : formatTime(elapsed)}
                </div>

                {status === "connected" && (
                    <div className={styles.connectionBadge}>
                        <span className={styles.indicator} />
                        Voice connected
                    </div>
                )}

                {/* Waveform simulation */}
                {status === "connected" && micOn && (
                    <div className={styles.waveform}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className={styles.bar}
                                style={{
                                    height: `${8 + Math.sin(Date.now() / 200 + i) * 8 + Math.random() * 8}px`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Controls */}
                <div className={styles.controls}>
                    <AudioBtn
                        on={speakerOn}
                        onClick={() => setSpeakerOn((v) => !v)}
                        iconOn={<Volume2 size={18} />}
                        iconOff={<VolumeX size={18} />}
                        label={speakerOn ? "Speaker" : "Muted"}
                    />

                    <button
                        onClick={onClose}
                        className={styles.controlButton}
                        style={{ gridColumn: "1 / -1", background: "#ef4444" }}
                    >
                        <Phone size={22} color="white" style={{ transform: "rotate(135deg)" }} />
                    </button>

                    <AudioBtn
                        on={micOn}
                        onClick={() => setMicOn((v) => !v)}
                        iconOn={<Mic size={18} />}
                        iconOff={<MicOff size={18} />}
                        label={micOn ? "Mute" : "Unmuted"}
                    />
                </div>
            </div>
        </div>
    );
}

function AudioBtn({
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
            className={styles.controlButton}
            style={{
                background: on ? "rgba(255,255,255,0.08)" : "rgba(239,68,68,0.15)",
                color: on ? "rgba(255,255,255,0.7)" : "#ef4444",
            }}
        >
            <div className={styles.icon}>{on ? iconOn : iconOff}</div>
            <div className={styles.label}>{label}</div>
        </button>
    );
}
