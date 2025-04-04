import { notFound } from "next/navigation";
import Image from "next/image";
import { getUserData } from "@/actions/user";

export const metadata = {
  title: "帳號查詢",
  description:
    "管理自己的帳號、尋找隊友們的帳號一應具全，完整的權限配置與設定功能頁面",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const userId = decodeURIComponent(id);
  const user = await getUserData(userId);

  if (!user) return notFound();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full shadow-md"
          />
        </div>
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          {user.name}
        </h1>
        <div className="mb-4 text-center text-lg text-gray-800">
          註冊帳號: {user.email}
          <br />
          最後登入: {user.loginAt}
          <br />
          組別: {user.team}
        </div>
      </div>
    </div>
  );
}
