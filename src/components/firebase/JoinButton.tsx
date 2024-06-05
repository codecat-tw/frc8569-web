import React, { useState } from "react";
import { joinEvent } from './JoinEvent';  // 路徑根據實際情況調整

interface JoinButtonProps {
  id: string;
  userEmail: string;
  userName: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ id, userEmail, userName }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoinEvent = async () => {
    setLoading(true);

    const resultMessage = await joinEvent(id, userEmail, userName);
    setMessage(resultMessage);

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleJoinEvent}
        disabled={loading}
        className="border bg-orange-400 p-1 rounded text-white"
      >
        {loading ? "添加中..." : "報名活動"}
      </button>
      {message && <p>{message}</p>}
    </>
  );
}

export default JoinButton;
