import React, { useState } from "react";
import { joinEvent } from "@/actions/joinEvent";

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
        className="rounded border bg-orange-400 p-1 text-white"
      >
        {loading ? "添加中..." : "報名活動"}
      </button>
      {message && <p>{message}</p>}
    </>
  );
};

export default JoinButton;
