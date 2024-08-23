import React from "react";

interface EndInputProps {
  end: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EndInput: React.FC<EndInputProps> = ({ end, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold">結束時間</label>
      <input
        type="time"
        name="end"
        value={end}
        onChange={handleInputChange}
        className="w-full rounded-md border border-gray-300 p-2"
        placeholder="End"
        required
      />
    </div>
  );
};

export default EndInput;
