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
      setErrorMessage((error as Error).message || "發生無法預期的錯誤，請稍後再試或連繫客服團隊。");
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
          <h2 className="text-lg font-bold">感謝註冊！</h2>
          <p className="text-gray-600">您的註冊已成功。</p>
          <button
            onClick={handleClose}
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            關閉
          </button>
        </div>
      </div>
    );
  }

  if (isNewUser) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              用戶ID：
            </label>
            <input
              type="text"
              id="userId"
              value={id}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="userGroup" className="block text-sm font-medium text-gray-700">
              組別：
            </label>
            <input
              type="text"
              id="userGroup"
              value={team}
              onChange={(e) => setUserGroup(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            提交
          </button>
        </form>
      </div>
    );
  }

  return null;
}
