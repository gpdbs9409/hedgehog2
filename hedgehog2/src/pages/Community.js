"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dummyMessages = [
    { user: '환율고수', text: '오늘 환율 진짜 미쳤다!', time: '13:20' },
    { user: '초보투자자', text: 'USD 더 오를까요?', time: '13:21' },
    { user: 'HedgeHog', text: '환영합니다! 자유롭게 채팅해보세요.', time: '13:22' },
];
var dummyPosts = [
    { id: 1, title: '6월 환율 전망', author: '환율고수', time: '1시간 전', comments: 12 },
    { id: 2, title: '엔화 환전 꿀팁 공유', author: '여행러', time: '2시간 전', comments: 5 },
    { id: 3, title: '오늘 환율 실시간 토론방', author: '실시간', time: '3시간 전', comments: 8 },
];
var Community = function () {
    var _a = (0, react_1.useState)(''), input = _a[0], setInput = _a[1];
    var _b = (0, react_1.useState)(dummyMessages), messages = _b[0], setMessages = _b[1];
    var handleSend = function (e) {
        e.preventDefault();
        if (!input.trim())
            return;
        setMessages(__spreadArray(__spreadArray([], messages, true), [{ user: '나', text: input, time: new Date().toLocaleTimeString().slice(0, 5) }], false));
        setInput('');
    };
    return (<div className="max-w-2xl mx-auto py-8">
      {/* 실시간 채팅 */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-lg font-bold mb-2 text-primary-600">실시간 채팅</h2>
        <div className="h-40 overflow-y-auto flex flex-col gap-2 mb-2 border rounded p-2 bg-gray-50">
          {messages.map(function (msg, i) { return (<div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-primary-600">{msg.user}</span>
              <span className="text-gray-700">{msg.text}</span>
              <span className="ml-auto text-xs text-gray-400">{msg.time}</span>
            </div>); })}
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <input className="flex-1 border rounded px-3 py-1 text-sm" placeholder="메시지를 입력하세요" value={input} onChange={function (e) { return setInput(e.target.value); }}/>
          <button type="submit" className="bg-primary-600 text-white px-4 py-1 rounded font-semibold hover:bg-primary-700 transition">전송</button>
        </form>
      </div>

      {/* 게시판 */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary-600">커뮤니티 게시판</h2>
          <button className="bg-primary-50 text-primary-600 px-3 py-1 rounded hover:bg-primary-100 font-semibold">글쓰기</button>
        </div>
        <div className="divide-y">
          {dummyPosts.map(function (post) { return (<div key={post.id} className="py-3 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{post.title}</div>
                <div className="text-xs text-gray-500 mt-1">{post.author} · {post.time}</div>
              </div>
              <div className="text-xs text-primary-600 font-bold">댓글 {post.comments}</div>
            </div>); })}
        </div>
      </div>
    </div>);
};
exports.default = Community;
