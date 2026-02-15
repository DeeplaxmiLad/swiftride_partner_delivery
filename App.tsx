import React, { useState } from 'react';
import Layout from './Layout';
import { UserRole } from './types';
import RiderDashboard from './pages/RiderDashboard';
import Wallet from './pages/Wallet';
import AdminOverview from './pages/AdminOverview';
import MapPlaceholder from './MapPlaceholder';
import AdminPartners from './pages/AdminPartners';
import AdminPerformance from './pages/AdminPerformance';
import AdminAnalytics from './pages/AdminAnalytics';
import RiderProfile from './pages/RiderProfile';
import RiderRefer from './pages/RiderRefer';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.RIDER);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (loginMethod === 'email') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both Gmail and Password correctly.');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid Gmail address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    } else {
      if (!phone.trim() || phone.length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    setIsLoggedIn(true);
  };

  const renderContent = () => {
    if (role === UserRole.RIDER) {
  switch (activeTab) {
    case 'dashboard':
      return <RiderDashboard />;

    case 'wallet':
      return <Wallet />;

    case 'orders':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-black mb-6">My Orders</h2>

          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="bg-white p-5 rounded-2xl shadow border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">
                      Order #{1000 + order}
                    </p>
                    <p className="text-sm text-slate-500">
                      Hotel Visawa, Panvel
                    </p>
                  </div>

                  <span className="text-green-600 font-bold text-sm">
                    ₹45
                  </span>
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  Completed • 12 Feb 2026
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'profile':
      return <RiderProfile />;

    case 'refer':
      return <RiderRefer />;

    default:
      return <RiderDashboard />;
  }
} else {
      switch (activeTab) {
        case 'admin-dashboard':
          return <AdminOverview />;

        case 'admin-live':
          return <MapPlaceholder />;

        case 'admin-partners':
          return <AdminPartners />;

          case 'admin-performance':
            return <AdminPerformance />;
            
          case 'admin-analytics':
            return <AdminAnalytics />;

        case 'admin-settings':
          return (
            <div className="p-6">
              <h2 className="text-2xl font-black mb-6">
                Admin Settings
              </h2>
              <div className="bg-white p-6 rounded-3xl shadow border space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">
                    Notification Preference
                  </label>
                  <select className="w-full p-3 border rounded-xl">
                    <option>Email Alerts</option>
                    <option>SMS Alerts</option>
                    <option>Push Notifications</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-2">
                    Zone
                  </label>
                  <input
                    type="text"
                    defaultValue="Panvel"
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold">
                  Save Changes
                </button>
              </div>
            </div>
          );

        default:
          return <AdminOverview />;
      }
    }
  };

  // ✅ RESTORED FULL LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-3xl font-black text-center mb-6">
            SwiftRide Partner Login
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {loginMethod === 'phone' ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className="w-full p-3 border rounded-xl mb-4"
            />
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full p-3 border rounded-xl mb-4"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full p-3 border rounded-xl mb-4"
              />
            </>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold"
          >
            Login
          </button>

          <button
            onClick={() =>
              setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone')
            }
            className="mt-4 text-sm text-orange-500 font-bold w-full"
          >
            Switch to {loginMethod === 'phone' ? 'Email' : 'Phone'} Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      role={role}
      setRole={(r) => {
        setRole(r);
        setActiveTab(r === UserRole.RIDER ? 'dashboard' : 'admin-dashboard');
      }}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
