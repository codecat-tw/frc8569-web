export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">身分驗證中...快好了...</h1>
        <h1>為了您的資料安全，網站執行Oauth身分驗證。這通常花費1~3秒左右。</h1>
      </div>
    </div>
  );
}
