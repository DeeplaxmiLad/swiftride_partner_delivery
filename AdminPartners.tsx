import React from "react";

const AdminPartners: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-black text-slate-900 mb-6">
        Delivery Partners List
      </h2>

      <div className="bg-white rounded-3xl shadow border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Status</th>
              <th className="p-4">Zone</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Rajesh Kumar", vehicle: "MH-46-BK-2024", status: "Active", zone: "Panvel" },
              { name: "Vikash Deshmukh", vehicle: "MH-46-XY-9087", status: "Standby", zone: "Panvel" }
            ].map((partner, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-700">{partner.name}</td>
                <td className="p-4 text-slate-500">{partner.vehicle}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    partner.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-600"
                  }`}>
                    {partner.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{partner.zone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPartners;