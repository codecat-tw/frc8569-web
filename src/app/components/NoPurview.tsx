export default function NoPurview() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <div className="text-center p-4">
                <h1 className="text-3xl font-bold mb-4">糟糕，你好像不能看</h1>
                <h1>因權限不足或系統配置錯誤導致無法訪問。若您認為設置有誤請聯繫管理團隊。</h1>
            </div>
        </div>
    )
}