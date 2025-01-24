interface DateInputProps {
  date: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold">活動日期</label>
      <input
        type="date"
        name="date"
        value={date}
        onChange={handleInputChange}
        className="w-full rounded-md border border-gray-300 p-2"
        placeholder="Date"
        required
      />
    </div>
  );
};

export default DateInput;
