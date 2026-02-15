import React from 'react';

const RiderProfile: React.FC = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow border border-slate-100">

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-24 h-24 rounded-3xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Rajesh Kumar
            </h2>
            <p className="text-orange-500 font-bold text-sm">
              Elite Delivery Partner
            </p>
            <p className="text-xs text-slate-400 mt-1">
              MH-46-BK-2024
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-2xl text-center">
            <p className="text-lg font-black">842</p>
            <p className="text-xs text-slate-400">Deliveries</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-center">
            <p className="text-lg font-black">4.9</p>
            <p className="text-xs text-slate-400">Rating</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-center">
            <p className="text-lg font-black">₹42,390</p>
            <p className="text-xs text-slate-400">Earnings</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-4">

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Phone</span>
            <span className="font-bold">+91 9876543210</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Email</span>
            <span className="font-bold">rider@gmail.com</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">City</span>
            <span className="font-bold">Panvel</span>
          </div>

        </div>

        {/* Logout Button */}
        <button
          className="mt-8 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 hover:bg-red-100 transition"
        >
          Logout Account
        </button>

      </div>
    </div>
  );
};

export default RiderProfile;