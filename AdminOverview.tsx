
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GoogleGenAI } from "@google/genai";

const data = [
  { name: '8 AM', active: 45, completed: 32 },
  { name: '10 AM', active: 85, completed: 64 },
  { name: '12 PM', active: 150, completed: 110 },
  { name: '2 PM', active: 120, completed: 95 },
  { name: '4 PM', active: 90, completed: 80 },
  { name: '6 PM', active: 180, completed: 140 },
  { name: '8 PM', active: 210, completed: 175 },
];

const AdminOverview: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isCampaigning, setIsCampaigning] = useState(false);
  const [campaignIdea, setCampaignIdea] = useState<string | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Real-time Operational Report for Panvel Zone exported successfully as PDF.");
    }, 2000);
  };

  const handleNewCampaign = async () => {
    setIsCampaigning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Suggest a creative 1-sentence incentive campaign to increase delivery partners in Panvel, Maharashtra during monsoon season.",
      });
      setCampaignIdea(response.text || "Rainy Day Bonus: Earn ₹50 extra on every order today!");
    } catch (e) {
      setCampaignIdea("Flash Incentive: Earn 1.5x on all orders from Orion Mall area!");
    } finally {
      setIsCampaigning(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">System Dashboard</h1>
          <p className="text-slate-500 font-medium">Live operational overview of SwiftRide Network</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            disabled={isExporting}
            onClick={handleExport}
            className="flex-1 md:flex-none px-4 py-2 bg-white border rounded-xl text-sm font-bold hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isExporting ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-download"></i>}
            Export Report
          </button>
          <button 
            disabled={isCampaigning}
            onClick={handleNewCampaign}
            className="flex-1 md:flex-none px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-200 hover:bg-orange-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isCampaigning ? <i className="fa-solid fa-sparkles animate-pulse"></i> : <i className="fa-solid fa-plus"></i>}
            New Campaign
          </button>
        </div>
      </div>

      {campaignIdea && (
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
              <i className="fa-solid fa-bullhorn"></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">AI Generated Campaign</p>
              <p className="text-slate-800 font-bold">{campaignIdea}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white text-slate-600 text-xs font-bold rounded-xl border border-orange-100" onClick={() => setCampaignIdea(null)}>Dismiss</button>
            <button className="px-4 py-2 bg-orange-500 text-white text-xs font-black rounded-xl" onClick={() => alert("Campaign Launched!")}>Launch Now</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Riders', value: '842', trend: '+12%', color: 'blue' },
          { label: 'Total Orders', value: '12.5k', trend: '+5.4%', color: 'orange' },
          { label: 'Revenue', value: '₹4,23,900', trend: '+8.1%', color: 'green' },
          { label: 'Avg Rating', value: '4.85', trend: 'Stable', color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-green-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800 uppercase tracking-tight">Order Volume Analysis</h3>
            <select className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border-none rounded-xl px-3 py-2 focus:ring-0">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase'}} />
                <Bar dataKey="active" fill="#f97316" radius={[6, 6, 0, 0]} name="Pending Orders" />
                <Bar dataKey="completed" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Completed Deliveries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-black text-slate-800 uppercase tracking-tight mb-6">Panvel Live Heatmap</h3>
          <div className="flex-1 bg-slate-100 rounded-3xl relative overflow-hidden mb-6 border-4 border-slate-50">
             <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
             <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[8px] font-black text-white bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full inline-block uppercase tracking-widest shadow-xl">
                  High Demand: Panvel Railway Station Area
                </p>
             </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Avg Delivery Time</span>
              <span className="font-black text-slate-900">22 mins</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Idle Riders</span>
              <span className="font-black text-orange-600">8.4%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Zone Health</span>
              <span className="font-black text-green-600">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
