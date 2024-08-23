import React, { useState } from "react";

interface InviteInputProps {
  invite: string[];
  handleInviteChange: (selectedInvite: string[]) => void;
}

const groupMembers: { [key: string]: string[] } = {
  全成員: ["mail2.chshs.ntpc.edu.tw"],
  程式組: ["110330", "楊光地", "鍋子"],
  機構組: ["螺", "小黑"],
  電控組: ["高", "王"],
  策略組: ["yd960528", "Heidi"],
  公關組: ["Ivy", "Jack"],
};

const InviteInput: React.FC<InviteInputProps> = ({
  invite,
  handleInviteChange,
}) => {
  const [selectedInvite, setSelectedInvite] = useState<string[]>(invite);
  const inviteOptions = Object.keys(groupMembers);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedInvite = [...selectedInvite];

    if (checked) {
      groupMembers[value].forEach((member) => {
        if (!updatedInvite.includes(member)) {
          updatedInvite.push(member);
        }
      });
    } else {
      updatedInvite = updatedInvite.filter(
        (invite) => !groupMembers[value].includes(invite),
      );
    }

    setSelectedInvite(updatedInvite);
    handleInviteChange(updatedInvite);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold">邀請對象</label>
      <label className="mb-2 block text-sm font-bold text-gray-500">
        隊員只要包含於任一選項中皆可參與活動
      </label>
      {inviteOptions.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={`invite-${index}`}
            value={option}
            checked={groupMembers[option].every((member: string) =>
              selectedInvite.includes(member),
            )}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor={`invite-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default InviteInput;
