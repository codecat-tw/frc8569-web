import React from 'react';

interface EndInputProps {
  end: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EndInput: React.FC<EndInputProps> = ({ end, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">結束時間</label>
      <input
        type="time"
        name="end"
        value={end}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="End"
        required
      />
    </div>
  );
};

export default EndInput;
