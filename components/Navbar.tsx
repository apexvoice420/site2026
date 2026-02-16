
import React from 'react';
import { AppView } from '../types';
import { Layout, Play, Settings, Package, CreditCard, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.LANDING, label: 'Home', icon: <Layout size={18} /> },
    { id: AppView.DEMO, label: 'Live Demo', icon: <Play size={18} /> },
    { id: AppView.PRICING, label: 'Pricing', icon: <CreditCard size={18} /> },
    { id: AppView.SETUP, label: 'Technical Setup', icon: <Settings size={18} /> },
    { id: AppView.LOGIN, label: 'Login', icon: <LogIn size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1E2A38] text-white px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView(AppView.LANDING)}
        >
          <div className="w-10 h-10 bg-[#1479FF] rounded-lg flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="font-extrabold text-xl tracking-tight">APEX <span className="text-[#1479FF]">VOICE</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#1479FF] ${currentView === item.id ? 'text-[#1479FF]' : 'text-gray-300'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setView(AppView.DEMO)}
            className="bg-[#1479FF] px-5 py-2 rounded-full font-bold text-sm hover:bg-[#1479FF]/80 transition-all shadow-lg shadow-blue-500/20"
          >
            Start Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
