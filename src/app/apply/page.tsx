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
import InviteesInput from '../../components/apply/InviteInput';

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
    teacher: '',
    invite: [] as string[]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activityUrl, setActivityUrl] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleInviteChange = (selectedInvite: string[]) => {
    setFormValues({
      ...formValues,
      invite: selectedInvite
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await ApplyItem({ formValues, userEmail, userName });
    setActivityUrl(result);
    setIsSubmitted(true);
    setFormValues({
      date: '',
      name: '',
      start: '',
      end: '',
      area: '',
      teacher: '',
      invite: []
    });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("frc.kuang-ti.com/events/" + activityUrl + "?join=1&openExternalBrowser=1");
    alert('活動網址已複製到剪貼簿');
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
        <InviteesInput invite={formValues.invite} handleInviteChange={handleInviteChange}/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full">
          提交
        </button>
        {isSubmitted && (
          <div className="mt-4">
            <button onClick={handleCopyUrl} className="bg-green-500 text-white p-2 rounded-md mt-2 w-full">
              複製活動網址
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddItemForm;
