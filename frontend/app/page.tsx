"use client";
import { ChatSidebar } from "@/src/components/ChatSidebar";
import { ChatWindow } from "@/src/components/ChatWindow";
import { RightPanel } from "@/src/components/RightPanel";
import { useState } from "react";

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(1);
  return (
    <div style={{ display: "flex", minHeight: "98vh", overflow: "hidden" }}>
      <ChatSidebar selectedId={selectedContact} onSelect={setSelectedContact} />
      <ChatWindow contactId={selectedContact} />
      <RightPanel contactId={selectedContact} />
    </div >
  );
}
