import React from 'react';

interface NameInputProps {
  name: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">活動名稱</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="活動主題、預期目標等..."
        required
      />
    </div>
  );
};

export default NameInput;
