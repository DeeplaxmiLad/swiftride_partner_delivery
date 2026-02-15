import React, { useState } from "react";

const RiderRefer: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Mumbai");

  const referrals = [
    { name: "Ved", status: "Pending", date: "12 Feb" },
  ];

  const handleRefer = () => {
    if (!phone || !name) {
      alert("Please fill all details");
      return;
    }

    alert("Referral sent successfully!");
    setPhone("");
    setName("");
  };

  return (
    <div className="p-4 pb-24 bg-slate-50 min-h-screen">

      {/* Bonus Banner */}
      <div className="bg-green-500 text-white rounded-3xl p-6 mb-6 text-center">
        <h2 className="text-lg font-bold">Earn upto</h2>
        <h1 className="text-4xl font-black">₹14,000</h1>
        <p className="text-sm mt-1">For every referral</p>
      </div>

      {/* Refer Form */}
      <div className="bg-white rounded-3xl shadow p-5 space-y-4">
        <h3 className="font-bold text-slate-700">Refer Your Friend</h3>

        <input
          type="tel"
          placeholder="Contact number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Contact name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <button
          onClick={handleRefer}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          Refer Now
        </button>
      </div>

      {/* Referral List */}
      <div className="bg-white rounded-3xl shadow p-5 mt-6">
        <h3 className="font-bold mb-4">Your Referrals</h3>

        {referrals.map((ref, index) => (
          <div key={index} className="flex justify-between items-center border-b py-3">
            <div>
              <p className="font-bold">{ref.name}</p>
              <p className="text-sm text-slate-400">{ref.date}</p>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-bold">
              {ref.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RiderRefer;