interface StartInputProps {
  start: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartInput: React.FC<StartInputProps> = ({
  start,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold">開始時間</label>
      <input
        type="time"
        name="start"
        value={start}
        onChange={handleInputChange}
        className="w-full rounded-md border border-gray-300 p-2"
        placeholder="Start"
        required
      />
    </div>
  );
};

export default StartInput;
