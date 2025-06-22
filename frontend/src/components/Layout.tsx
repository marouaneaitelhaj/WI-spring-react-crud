import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, Home, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-slate-800">
          <Music className="w-8 h-8 text-orange-600" />
          <span>Tunzz</span>
        </Link>
        <div className="flex space-x-1">
          {!token ? (
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
          >
            <span>Login</span>
          </Link>
          ) : (
          <>
            <Link
            to="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive('/')
              ? 'bg-orange-100 text-orange-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
            >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
            to="/add"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive('/add')
              ? 'bg-green-100 text-green-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
            >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Song</span>
            </Link>
            <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:text-white hover:bg-red-500 transition-all duration-200"
            onClick={() => {
              dispatch(logout())
              window.location.href = '/';
            }}
            >
            <span>Logout</span>
            </button>
          </>
          )}
        </div>
        </div>
      </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
      </main>
    </div>
  );
}

export default Layout;
