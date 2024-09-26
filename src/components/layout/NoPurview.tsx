export default function NoPurview() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">糟糕，你好像不能看</h1>
        <h1>
          因權限不足或系統配置錯誤導致無法訪問。若您認為設置有誤請聯繫管理團隊。
        </h1>
      </div>
    </div>
  );
}
