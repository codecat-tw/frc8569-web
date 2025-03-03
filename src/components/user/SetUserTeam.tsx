"use client";

import { useState } from "react";
import { setTeam } from "@/actions/user";

export default function SetUserTeam({
  id,
  team
}: {
  id: string;
  team: string;
}) {
  const [teamName, setTeamName] = useState(team || "未分組");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      await setTeam(id, teamName);
      setIsEditing(false);
      console.log("更新成功");
    } catch (e) {
      console.error("更新失敗: ", e);
    }
  };

  return (
    <div>
      <span>組別: </span>
      {isEditing ? (
        <select
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="mb-2 rounded-sm border p-1"
        >
          <option value="未分組">未分組</option>
          <option value="程式組">程式組</option>
          <option value="機構組">機構組</option>
          <option value="電控組">電控組</option>
          <option value="策略組">策略組</option>
          <option value="公關組">公關組</option>
        </select>
      ) : (
        <span>{teamName}</span>
      )}
      {isEditing ? (
        <button
          onClick={handleUpdate}
          className="ml-2 rounded-sm border bg-gray-400 p-1 text-white"
        >
          傳送
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="ml-2 rounded-sm border bg-gray-400 p-1 text-white"
        >
          編輯
        </button>
      )}
    </div>
  );
};
