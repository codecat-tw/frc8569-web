'use client';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import ApplyItem from '../../components/firebase/ApplyItem';
import DateInput from '../../components/apply/DateInput';
import NameInput from '../../components/apply/NameInput';
import StartInput from '../../components/apply/StartInput';
import EndInput from '../../components/apply/EndInput';
import AreaInput from '../../components/apply/AreaInput';
import TeacherInput from '../../components/apply/TeacherInput';

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
        <DateInput date={formValues.date} handleInputChange={handleInputChange} />
        <NameInput name={formValues.name} handleInputChange={handleInputChange} />
        <StartInput start={formValues.start} handleInputChange={handleInputChange} />
        <EndInput end={formValues.end} handleInputChange={handleInputChange} />
        <AreaInput area={formValues.area} handleInputChange={handleInputChange} />
        <TeacherInput teacher={formValues.teacher} handleInputChange={handleInputChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full">
          提交
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
