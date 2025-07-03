const Notifications = () => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <h1 className="text-2xl font-bold mb-4">알림 설정</h1>
    <div className="mb-2 text-gray-500">서비스 준비중입니다.</div>
    <div className="mt-6 w-full max-w-md">
      <div className="bg-white rounded-lg shadow p-4 mb-2">
        <div className="font-semibold">USD/KRW 1400원 돌파시 알림</div>
        <div className="text-sm text-gray-500 mt-1">설정된 알림 예시</div>
      </div>
    </div>
  </div>
);

export default Notifications; 