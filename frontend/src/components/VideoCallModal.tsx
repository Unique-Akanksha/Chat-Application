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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
            <div
                className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: "#0d1021", minHeight: "480px", maxHeight: "90vh" }}
            >
                {/* Main video area */}
                <div className="relative w-full" style={{ height: "400px" }}>
                    {/* Remote video (simulated) */}
                    <div
                        className="w-full h-full flex flex-col items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${contact.color}22, #0d1021)` }}
                    >
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl text-white mb-4"
                            style={{ background: contact.color }}
                        >
                            {contact.avatar}
                        </div>
                        <div style={{ color: "white", fontSize: "20px" }}>{contact.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "6px" }}>
                            {status === "calling" ? "Calling..." : formatTime(elapsed)}
                        </div>
                        {status === "connected" && (
                            <div
                                className="flex items-center gap-1 mt-2 px-3 py-1 rounded-full"
                                style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", fontSize: "12px" }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                HD Connected
                            </div>
                        )}
                    </div>

                    {/* Self preview pip */}
                    <div
                        className="absolute bottom-4 right-4 w-32 h-24 rounded-2xl flex items-center justify-center overflow-hidden"
                        style={{ background: "#1a1e2e", border: "2px solid rgba(255,255,255,0.1)" }}
                    >
                        {camOn ? (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #6c63ff33, #1a1e2e)" }}
                            >
                                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>You</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <VideoOff size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
                                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>Camera off</span>
                            </div>
                        )}
                    </div>

                    {/* Top right */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.1)" }}
                        >
                            <Maximize2 size={14} color="white" />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div
                    className="flex items-center justify-between px-8 py-5"
                    style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                    <div className="flex items-center gap-3">
                        <CallBtn
                            icon={<MonitorUp size={18} />}
                            label="Share"
                            onClick={() => { }}
                        />
                        <CallBtn
                            icon={<MessageSquare size={18} />}
                            label="Chat"
                            onClick={() => { }}
                        />
                        <CallBtn
                            icon={<Volume2 size={18} />}
                            label="Audio"
                            onClick={() => { }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
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
                            className="w-14 h-12 rounded-2xl flex items-center justify-center transition-opacity hover:opacity-80"
                            style={{ background: "#ef4444" }}
                        >
                            <Phone size={20} color="white" style={{ transform: "rotate(135deg)" }} />
                        </button>
                    </div>

                    <div style={{ width: "160px" }} />
                </div>
            </div>
        </div>
    );
}

function CallBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
            >
                {icon}
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>{label}</span>
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
            className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                    background: on ? "rgba(108,99,255,0.2)" : "rgba(239,68,68,0.15)",
                    color: on ? "#6c63ff" : "#ef4444",
                }}
            >
                {on ? iconOn : iconOff}
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>{label}</span>
        </button>
    );
}
