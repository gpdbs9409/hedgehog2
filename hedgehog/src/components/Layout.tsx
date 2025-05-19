import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: '실시간 환율', href: '/' },
  { name: '전문가 영상', href: '/videos' },
  { name: '커뮤니티', href: '/community' },
  { name: '알림 설정', href: '/notifications' },
  { name: '마이페이지', href: '/mypage' },
];

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/hedgehog-logo.svg" alt="HedgeHog Logo" className="h-10 w-10" />
            <span className="text-2xl font-extrabold text-primary-600 tracking-tight">HedgeHog</span>
          </Link>
          <nav className="flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-4 px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-sm"
            >
              로그인
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-12 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout; 