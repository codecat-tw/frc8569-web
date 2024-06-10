import React from 'react';

interface TeacherInputProps {
  teacher: string;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TeacherInput: React.FC<TeacherInputProps> = ({ teacher, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">指導老師</label>
          <select
            name="teacher"
            value={teacher}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>選擇一個老師</option>
            <option value="kkbike">華光永</option>
            <option value="crispin">周長益</option>
            <option value="angella">李淑卿</option>
            <option value="eric29433453@gmail.com">系統測試</option>
          </select>
    </div>
  );
};

export default TeacherInput;
