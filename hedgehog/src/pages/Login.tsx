const Login = () => (
  <div className="flex flex-col items-center justify-center h-96 text-center">
    <h1 className="text-2xl font-bold mb-4">로그인</h1>
    <form className="bg-white rounded-lg shadow p-8 w-full max-w-xs flex flex-col gap-4">
      <input type="email" placeholder="이메일" className="border rounded px-3 py-2" />
      <input type="password" placeholder="비밀번호" className="border rounded px-3 py-2" />
      <button type="submit" className="bg-primary-600 text-white rounded px-4 py-2 font-semibold hover:bg-primary-700 transition">로그인</button>
    </form>
    <div className="mt-4 text-gray-500 text-sm">아직 회원이 아니신가요? <span className="text-primary-600">회원가입</span></div>
  </div>
);

export default Login; 