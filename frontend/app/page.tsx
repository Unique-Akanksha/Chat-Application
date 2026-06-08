"use client";
import { ChatSidebar } from "@/src/components/ChatSidebar";
import { ChatWindow } from "@/src/components/ChatWindow";
import { RightPanel } from "@/src/components/RightPanel";
import { useState } from "react";

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(1);
  return (
    <div
      className="size-full flex overflow-hidden h-full"
      style={{ background: "var(--background)", fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }
      }
    >
      <ChatSidebar selectedId={selectedContact} onSelect={setSelectedContact} />
      <ChatWindow contactId={selectedContact} />
      <RightPanel contactId={selectedContact} />
    </div >
  );
}
