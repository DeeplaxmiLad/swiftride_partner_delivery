import React, { useState } from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  role,
  setRole
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Incentive Alert', message: 'Complete 5 more orders to earn ₹200 extra today!', time: '2m ago' },
    { id: 2, title: 'System Update', message: 'New traffic zones added in Panvel Sector 15.', time: '1h ago' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black rotate-3">
            S
          </div>
          <span className="font-black text-lg text-slate-900">SwiftRide</span>
          <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase ml-1">
            Panvel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setRole(role === UserRole.RIDER ? UserRole.ADMIN : UserRole.RIDER)
            }
            className="text-[10px] font-black uppercase px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600"
          >
            {role === UserRole.RIDER ? 'Admin Panel' : 'Rider App'}
          </button>

          <div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative p-1 text-slate-400 hover:text-orange-500"
  >
    <i className="fa-solid fa-bell text-xl"></i>
    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
  </button>

  {showNotifications && (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowNotifications(false)}
      ></div>

      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2">
        <div className="px-4 py-2 border-b border-slate-50 flex justify-between items-center">
          <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">
            Notifications
          </span>
          <button className="text-[10px] text-orange-500 font-bold">
            Clear All
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 cursor-pointer"
            >
              <p className="font-bold text-xs text-slate-800">{n.title}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                {n.message}
              </p>
              <p className="text-[9px] text-slate-400 mt-1">
                {n.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
        </div>
      </header>

      {/* ================= NEW FLEX LAYOUT (ADDED AS REQUESTED) ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        {role === UserRole.ADMIN && (
          <nav className="hidden md:flex w-64 bg-white border-r flex-col p-4 gap-2">
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'admin-dashboard'
                  ? 'bg-orange-50 text-orange-600 font-black'
                  : 'text-slate-500 hover:bg-slate-50 font-bold'
              }`}
            >
              <i className="fa-solid fa-chart-line w-5"></i>
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('admin-live')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'admin-live'
                  ? 'bg-orange-50 text-orange-600 font-black'
                  : 'text-slate-500 hover:bg-slate-50 font-bold'
              }`}
            >
              <i className="fa-solid fa-location-dot w-5"></i>
              <span>Live Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('admin-partners')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'admin-partners'
                  ? 'bg-orange-50 text-orange-600 font-black'
                  : 'text-slate-500 hover:bg-slate-50 font-bold'
              }`}
            >
              <i className="fa-solid fa-users w-5"></i>
              <span>Partners</span>
            </button>

            <button
  onClick={() => setActiveTab('admin-performance')}
  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 font-bold"
>
  <i className="fa-solid fa-chart-column w-5"></i>
  <span>Performance</span>
</button>

<button
  onClick={() => setActiveTab('admin-analytics')}
  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 font-bold"
>
  <i className="fa-solid fa-chart-pie w-5"></i>
  <span>Analytics</span>
</button>

            <div className="mt-auto pt-4 border-t">
              <button
  onClick={() => setActiveTab('admin-settings')}
  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
    activeTab === 'admin-settings'
      ? 'bg-orange-50 text-orange-600 font-black'
      : 'text-slate-400 hover:bg-slate-50 font-bold'
  }`}
>
   <i className="fa-solid fa-gear w-5"></i> Settings</button>
            </div>
          </nav>
        )}

         {/* RIDER SIDEBAR — ADD HERE */}
  {role === UserRole.RIDER && (
    <nav className="hidden md:flex w-64 bg-white border-r flex-col p-4 gap-2">

      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          activeTab === 'dashboard'
            ? 'bg-orange-50 text-orange-600 font-black'
            : 'text-slate-500 hover:bg-slate-50 font-bold'
        }`}
      >
        <i className="fa-solid fa-house w-5"></i>
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => setActiveTab('orders')}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          activeTab === 'orders'
            ? 'bg-orange-50 text-orange-600 font-black'
            : 'text-slate-500 hover:bg-slate-50 font-bold'
        }`}
      >
        <i className="fa-solid fa-bicycle w-5"></i>
        <span>Orders</span>
      </button>

      <button
        onClick={() => setActiveTab('wallet')}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          activeTab === 'wallet'
            ? 'bg-orange-50 text-orange-600 font-black'
            : 'text-slate-500 hover:bg-slate-50 font-bold'
        }`}
      >
        <i className="fa-solid fa-wallet w-5"></i>
        <span>Wallet</span>
      </button>

      <button
        onClick={() => setActiveTab('refer')}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          activeTab === 'refer'
            ? 'bg-orange-50 text-orange-600 font-black'
            : 'text-slate-500 hover:bg-slate-50 font-bold'
        }`}
      >
        <i className="fa-solid fa-user-plus w-5"></i>
        <span>Refer & Earn</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          activeTab === 'profile'
            ? 'bg-orange-50 text-orange-600 font-black'
            : 'text-slate-500 hover:bg-slate-50 font-bold'
        }`}
      >
        <i className="fa-solid fa-user w-5"></i>
        <span>Profile</span>
      </button>

    </nav>
  )}


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        

      </div>
    </div>
  );
};

export default Layout;