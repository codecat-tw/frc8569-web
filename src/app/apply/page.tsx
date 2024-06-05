'use client';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import ApplyItem from '../../components/firebase/ApplyItem';

const AddItemForm: React.FC = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || 'ErrorUser';
  const userName = session?.user?.name || 'ErrorUser';

  const [formValues, setFormValues] = useState({
    date: '',
    name: '',
    start: '',
    end: '',
    area: '',
    teacher: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await ApplyItem({ formValues, userEmail, userName });
    setFormValues({
      date: '',
      name: '',
      start: '',
      end: '',
      area: '',
      teacher: ''
    });
  };

  return (
    <div className='text-black min-h-screen bg-blue-100 overflow-x-hidden p-4'>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white mt-8 p-8 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">活動日期</label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Date"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">活動名稱</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="主題、用途等..."
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">開始時間</label>
          <input
            type="time"
            name="start"
            value={formValues.start}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Start"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">結束時間</label>
          <input
            type="time"
            name="end"
            value={formValues.end}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="End"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">使用區域</label>
          <input
            type="text"
            name="area"
            value={formValues.area}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="填入分區，如: A、B、C、D、E"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">指導老師</label>
          <select
            name="teacher"
            value={formValues.teacher}
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          提交申請
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
