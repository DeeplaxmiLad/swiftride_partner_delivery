import React from "react";

const AdminAnalytics: React.FC = () => {
  const data = [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 150 },
    { label: "Wed", value: 180 },
    { label: "Thu", value: 140 },
    { label: "Fri", value: 200 },
    { label: "Sat", value: 220 },
    { label: "Sun", value: 170 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black mb-6">Weekly Order Analytics</h2>

      <div className="bg-white p-8 rounded-3xl shadow border">
        <div className="flex items-end justify-between h-[300px]">
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * 250;

            return (
              <div key={index} className="flex flex-col items-center w-full">
                <div
                  className="bg-orange-500 w-12 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${barHeight}px`,
                  }}
                ></div>
                <span className="text-sm mt-2 font-medium">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;