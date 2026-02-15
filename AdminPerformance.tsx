import React from "react";

const AdminPerformance: React.FC = () => {
  const riders = [
    { name: "Rajesh Kumar", orders: 52, rating: 4.9, earnings: 12400, status: "Active" },
    { name: "Vikash Deshmukh", orders: 47, rating: 4.7, earnings: 11200, status: "Active" },
    { name: "Amit Patil", orders: 39, rating: 4.6, earnings: 9800, status: "Idle" },
    { name: "Rohit Sharma", orders: 34, rating: 4.5, earnings: 8700, status: "Active" },
    { name: "Sagar More", orders: 29, rating: 4.4, earnings: 7600, status: "Idle" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black mb-6">Rider Performance</h2>

      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Rider</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Earnings</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">
                <td className="p-4 font-bold">{rider.name}</td>
                <td className="p-4">{rider.orders}</td>
                <td className="p-4">{rider.rating} ⭐</td>
                <td className="p-4">₹{rider.earnings}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      rider.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPerformance;