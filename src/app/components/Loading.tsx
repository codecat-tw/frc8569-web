export default function NoPurview() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <div className="text-center p-4">
                <h1 className="text-3xl font-bold mb-4">身分驗證中...快好了...</h1>
                <h1>為了您的資料安全，網站執行Oauth身分驗證。這通常花費1~3秒左右。</h1>
            </div>
        </div>
    )
}