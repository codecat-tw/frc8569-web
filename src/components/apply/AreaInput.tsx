interface AreaInputProps {
  area: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AreaInput: React.FC<AreaInputProps> = ({ area, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold">使用分區</label>
      <input
        type="text"
        name="area"
        value={area}
        onChange={handleInputChange}
        className="w-full rounded-md border border-gray-300 p-2"
        placeholder="如:A、B、C"
        required
      />
    </div>
  );
};

export default AreaInput;
