'use client';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import ApplyItem from '../components/ApplyItem';

const AddItemForm: React.FC<{ userEmail: string }> = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || 'ErrorUser';

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
    await ApplyItem({ formValues, userEmail });
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>活動日期</label>
        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleInputChange}
          placeholder="Date"
          required
        />
      </div>
      <div>
        <label>活動名稱</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
      </div>
      <div>
        <label>開始時間</label>
        <input
          type="time"
          name="start"
          value={formValues.start}
          onChange={handleInputChange}
          placeholder="Start"
          required
        />
      </div>
      <div>
        <label>結束時間</label>
        <input
          type="time"
          name="end"
          value={formValues.end}
          onChange={handleInputChange}
          placeholder="End"
          required
        />
      </div>
      <div>
        <label>使用分區</label>
        <input
          type="text"
          name="area"
          value={formValues.area}
          onChange={handleInputChange}
          placeholder="Area"
          required
        />
      </div>
      <div>
        <label>指導老師</label>
        <select
          name="teacher"
          value={formValues.teacher}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>選擇一個老師</option>
          <option value="kkbike">華光永</option>
          <option value="crispin">周長益</option>
          <option value="angella">李淑卿</option>
          <option value="eric29433453@gmail.com">系統測試</option>
        </select>
      </div>
      <button type="submit">提交申請</button>
    </form>
  );
};

export default AddItemForm;
