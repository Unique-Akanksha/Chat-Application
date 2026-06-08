import { useState, useEffect } from "react";
import { Mic, MicOff, Phone, Volume2, VolumeX, Speaker } from "lucide-react";

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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
            <div
                className="relative flex flex-col items-center w-80 rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: "#0d1021", padding: "40px 32px 32px" }}
            >
                {/* Glow rings */}
                <div className="relative flex items-center justify-center mb-6">
                    {status === "connected" && (
                        <>
                            <div
                                className="absolute rounded-full transition-all duration-700"
                                style={{
                                    width: pulse ? "120px" : "100px",
                                    height: pulse ? "120px" : "100px",
                                    background: `${contact.color}18`,
                                    transition: "all 0.7s ease",
                                }}
                            />
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: pulse ? "160px" : "140px",
                                    height: pulse ? "160px" : "140px",
                                    background: `${contact.color}09`,
                                    transition: "all 0.9s ease",
                                }}
                            />
                        </>
                    )}
                    <div
                        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-2xl text-white"
                        style={{ background: contact.color }}
                    >
                        {contact.avatar}
                    </div>
                </div>

                <div style={{ color: "white", fontSize: "20px", marginBottom: "6px" }}>{contact.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "24px" }}>
                    {status === "calling" ? (
                        <span className="animate-pulse">Calling...</span>
                    ) : (
                        formatTime(elapsed)
                    )}
                </div>

                {status === "connected" && (
                    <div
                        className="flex items-center gap-1 mb-6 px-3 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: "12px" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Voice connected
                    </div>
                )}

                {/* Waveform simulation */}
                {status === "connected" && micOn && (
                    <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-150"
                                style={{
                                    width: "3px",
                                    height: `${8 + Math.sin(Date.now() / 200 + i) * 8 + Math.random() * 8}px`,
                                    background: contact.color,
                                    opacity: 0.6 + Math.random() * 0.4,
                                    minHeight: "4px",
                                    maxHeight: "28px",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Controls */}
                <div className="flex items-center gap-4 mt-2">
                    <AudioBtn
                        on={speakerOn}
                        onClick={() => setSpeakerOn((v) => !v)}
                        iconOn={<Volume2 size={18} />}
                        iconOff={<VolumeX size={18} />}
                        label={speakerOn ? "Speaker" : "Muted"}
                    />

                    <button
                        onClick={onClose}
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                        style={{ background: "#ef4444" }}
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
            className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
        >
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                    background: on ? "rgba(255,255,255,0.1)" : "rgba(239,68,68,0.15)",
                    color: on ? "rgba(255,255,255,0.7)" : "#ef4444",
                }}
            >
                {on ? iconOn : iconOff}
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>{label}</span>
        </button>
    );
}
