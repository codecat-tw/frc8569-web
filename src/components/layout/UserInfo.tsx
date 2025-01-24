"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, FormEvent } from "react";
import { loginLog } from "@/actions/loginLog";
import { createUserData } from "@/actions/createUserData";

export default function UserInfo() {
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [id, setUserId] = useState<string>("");
  const [team, setUserGroup] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const checkUserData = async () => {
      if (session) {
        const newUser = await loginLog();
        setIsNewUser(newUser);
      }
    };

    checkUserData();
  }, [session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await createUserData(id, team);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        (error as Error).message ||
          "發生無法預期的錯誤，請稍後再試或連繫客服團隊。",
      );
    }
  };

  const handleClose = () => {
    setIsNewUser(false);
    setIsSubmitted(false);
    setUserId("");
    setUserGroup("");
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="space-y-4 rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="text-lg font-bold">感謝註冊！</h2>
          <p className="text-gray-600">您的註冊已成功。</p>
          <button
            onClick={handleClose}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            關閉
          </button>
        </div>
      </div>
    );
  }

  if (isNewUser) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg bg-white p-6 shadow-lg"
        >
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              用戶ID：
            </label>
            <input
              type="text"
              id="userId"
              value={id}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="userGroup"
              className="block text-sm font-medium text-gray-700"
            >
              組別：
            </label>
            <input
              type="text"
              id="userGroup"
              value={team}
              onChange={(e) => setUserGroup(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            提交
          </button>
        </form>
      </div>
    );
  }

  return null;
}
