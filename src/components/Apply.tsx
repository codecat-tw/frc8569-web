"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { applyItem } from "@/actions/activity";
import { useState } from "react";

interface Inputs {
  date: string;
  name: string;
  start: string;
  end: string;
  area: string;
  teacher: string;
  invite: string[];
}

const groupList = ["全成員", "程式組", "機構組", "電控組", "策略組", "公關組"];

export default function Apply() {
  const [activityUrl, setActivityUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const result = await applyItem({ formValues: data });
    setActivityUrl(result);
  };

  function handleCopyUrl() {
    navigator.clipboard.writeText(
      `https://frc.codecat.tw/events/${activityUrl}?join=1&openExternalBrowser=1`,
    );
    alert("活動網址已複製到剪貼簿");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg rounded-md bg-white p-8 border border-gray-300"
      >
        <label className="text-sm font-bold">活動日期</label>
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        />

        <label className="text-sm font-bold">活動名稱</label>
        <input
          placeholder="活動主題、預期目標等..."
          {...register("name", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        />

        <label className="text-sm font-bold">開始時間</label>
        <input
          type="time"
          {...register("start", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        />

        <label className="text-sm font-bold">結束時間</label>
        <input
          type="time"
          {...register("end", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        />

        <label className="text-sm font-bold">使用分區</label>
        <input
          placeholder="如:A、B、C"
          {...register("area", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        />

        <label className="text-sm font-bold">指導老師</label>
        <select
          {...register("teacher", { required: true })}
          className="w-full rounded-md border border-gray-300 p-2 mb-4"
        >
          <option value="kkbike">華光永</option>
          <option value="crispin">周長益</option>
          <option value="angella">李淑卿</option>
          <option value="eric">系統測試</option>
        </select>

        <label className="text-sm font-bold">邀請對象</label>
        <label className="mb-2 block text-sm font-bold text-gray-500">
          成員只要包含於選中項其中之一即可參與
        </label>
        {groupList.map((group, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`invite-${index}`}
              value={group}
              {...register("invite", { required: true })}
              className="mr-2"
            />
            <label htmlFor={`invite-${index}`}>{group}</label>
          </div>
        ))}

        {errors.name && <span>必填</span>}

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white"
        >
          提交
        </button>
      </form>
      {activityUrl && (
        <div className="mt-4">
          <button
            onClick={handleCopyUrl}
            className="mt-2 w-full rounded-md bg-green-500 p-2 text-white"
          >
            複製活動網址
          </button>
        </div>
      )}
    </div>
  );
}
