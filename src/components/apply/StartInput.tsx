import React from 'react';

interface StartInputProps {
  start: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartInput: React.FC<StartInputProps> = ({ start, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">開始時間</label>
      <input
        type="time"
        name="start"
        value={start}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Start"
        required
      />
    </div>
  );
};

export default StartInput;
