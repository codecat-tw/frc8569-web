import React, { useState } from 'react';

interface InviteInputProps {
  invite: string[];
  handleInviteChange: (selectedInvite: string[]) => void;
}

const InviteInput: React.FC<InviteInputProps> = ({ invite, handleInviteChange }) => {
  const [selectedInvite, setSelectedInvite] = useState<string[]>(invite);

  // 在這裡設定邀請對象選項
  const inviteOptions = ['程式組', '機構組', '電控組', '策略組', '公關組'];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedInvite = [...selectedInvite];

    if (checked) {
      updatedInvite.push(value);
    } else {
      updatedInvite = updatedInvite.filter(invite => invite !== value);
    }

    setSelectedInvite(updatedInvite);
    handleInviteChange(updatedInvite);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">邀請對象</label>
      {inviteOptions.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={`invite-${index}`}
            value={option}
            checked={selectedInvite.includes(option)}
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
