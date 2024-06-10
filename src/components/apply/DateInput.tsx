import React from 'react';

interface DateInputProps {
  date: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">活動日期</label>
      <input
        type="date"
        name="date"
        value={date}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Date"
        required
      />
    </div>
  );
};

export default DateInput;
