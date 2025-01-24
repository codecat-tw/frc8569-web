"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { applyItem } from "@/actions/applyItem";
import DateInput from "@/components/apply/DateInput";
import NameInput from "@/components/apply/NameInput";
import StartInput from "@/components/apply/StartInput";
import EndInput from "@/components/apply/EndInput";
import AreaInput from "@/components/apply/AreaInput";
import TeacherInput from "@/components/apply/TeacherInput";
import InviteesInput from "@/components/apply/InviteInput";

const AddItemForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    date: "",
    name: "",
    start: "",
    end: "",
    area: "",
    teacher: "",
    invite: [] as string[],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activityUrl, setActivityUrl] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInviteChange = (selectedInvite: string[]) => {
    setFormValues({
      ...formValues,
      invite: selectedInvite,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await applyItem({ formValues });
    setActivityUrl(result);
    setIsSubmitted(true);
    setFormValues({
      date: "",
      name: "",
      start: "",
      end: "",
      area: "",
      teacher: "",
      invite: [],
    });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      "frc.codecat.tw/events/" + activityUrl + "?join=1&openExternalBrowser=1",
    );
    alert("活動網址已複製到剪貼簿");
  };

  return (
    <div className="min-h-screen overflow-x-hidden p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-lg rounded-md bg-white p-8 shadow-md"
      >
        <DateInput
          date={formValues.date}
          handleInputChange={handleInputChange}
        />
        <NameInput
          name={formValues.name}
          handleInputChange={handleInputChange}
        />
        <StartInput
          start={formValues.start}
          handleInputChange={handleInputChange}
        />
        <EndInput end={formValues.end} handleInputChange={handleInputChange} />
        <AreaInput
          area={formValues.area}
          handleInputChange={handleInputChange}
        />
        <TeacherInput
          teacher={formValues.teacher}
          handleInputChange={handleInputChange}
        />
        <InviteesInput
          invite={formValues.invite}
          handleInviteChange={handleInviteChange}
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white"
        >
          提交
        </button>
        {isSubmitted && (
          <div className="mt-4">
            <button
              onClick={handleCopyUrl}
              className="mt-2 w-full rounded-md bg-green-500 p-2 text-white"
            >
              複製活動網址
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddItemForm;
