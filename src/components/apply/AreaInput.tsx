import React from 'react';

interface AreaInputProps {
  area: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AreaInput: React.FC<AreaInputProps> = ({ area, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">地區</label>
      <input
        type="text"
        name="area"
        value={area}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Area"
        required
      />
    </div>
  );
};

export default AreaInput;
