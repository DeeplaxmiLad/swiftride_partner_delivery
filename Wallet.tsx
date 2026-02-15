
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_RIDER, MOCK_TRANSACTIONS } from '../constants';

const chartData = [
  { name: 'Mon', earnings: 45 },
  { name: 'Tue', earnings: 52 },
  { name: 'Wed', earnings: 38 },
  { name: 'Thu', earnings: 65 },
  { name: 'Fri', earnings: 48 },
  { name: 'Sat', earnings: 84 },
  { name: 'Sun', earnings: 92 },
];

const Wallet: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">Available Balance</p>
            <h1 className="text-4xl font-bold">${MOCK_RIDER.walletBalance.toFixed(2)}</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <i className="fa-solid fa-wallet text-xl text-orange-400"></i>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors">
            Withdraw Money
          </button>
          <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors backdrop-blur-md">
            Transfer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Weekly Performance</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="earnings" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
          <button className="text-xs font-bold text-orange-500">See All</button>
        </div>
        
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((txn) => (
            <div key={txn.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'CREDIT' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                <i className={`fa-solid ${txn.type === 'CREDIT' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{txn.description}</p>
                <p className="text-[10px] text-slate-400">{new Date(txn.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${txn.type === 'CREDIT' ? 'text-green-600' : 'text-slate-800'}`}>
                  {txn.type === 'CREDIT' ? '+' : '-'}${txn.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{txn.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
