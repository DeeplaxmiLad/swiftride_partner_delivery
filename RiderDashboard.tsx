
import React, { useState, useEffect } from 'react';
import { MOCK_RIDER, MOCK_ORDERS } from '../constants';
import MapPlaceholder from '../components/MapPlaceholder';
import { Order, OrderStatus } from '../types';
import { getIntelligentOrderDescription } from '../services/geminiService';

const RiderDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(MOCK_RIDER.isOnline);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [aiTip, setAiTip] = useState<string>("");
  
  const [shiftStats, setShiftStats] = useState({
    trips: 12,
    distance: 32.4,
    earnings: 1250.50,
    rating: MOCK_RIDER.rating
  });

  useEffect(() => {
    if (isOnline && !currentOrder) {
      const interval = setInterval(() => {
        if (availableOrders.length < 5) {
          const randomIndex = Math.floor(Math.random() * MOCK_ORDERS.length);
          const nextOrder = { ...MOCK_ORDERS[randomIndex], id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}` };
          
          if (!availableOrders.find(o => o.restaurantName === nextOrder.restaurantName)) {
            setAvailableOrders(prev => [nextOrder, ...prev].slice(0, 5));
          }
        }
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isOnline, currentOrder, availableOrders]);

  const handleAcceptOrder = async (order: Order) => {
    const description = await getIntelligentOrderDescription(
      order.restaurantName,
      order.items
    );
    setAiTip(description);
    setCurrentOrder({ ...order, status: OrderStatus.ACCEPTED });
    setAvailableOrders([]);
  };

  const handleDeclineOrder = (orderId: string) => {
    setAvailableOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    if (currentOrder) {
      if (newStatus === OrderStatus.DELIVERED) {
        const dist = parseFloat(currentOrder.distance) || 2.5;
        setShiftStats(prev => ({
          ...prev,
          trips: prev.trips + 1,
          distance: prev.distance + dist,
          earnings: prev.earnings + currentOrder.riderEarnings
        }));
        setCurrentOrder(null);
        setAiTip("");
      } else {
        setCurrentOrder({ ...currentOrder, status: newStatus });
      }
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1001] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 px-6 py-2.5 flex items-center gap-6 transition-all">
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-green-600' : 'text-slate-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Live Traffic Tracking</span>
          </div>
        </div>
        <button 
          onClick={() => { setIsOnline(!isOnline); if (!isOnline) setAvailableOrders([]); }}
          className={`w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner ${isOnline ? 'bg-green-500' : 'bg-slate-300'}`}
        >
          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-500 ${isOnline ? 'translate-x-8' : 'translate-x-1'}`}></div>
        </button>
      </div>

      <div className="flex-1 relative">
        <MapPlaceholder className="h-full w-full" />
      </div>

      {isOnline && !currentOrder && availableOrders.length > 0 && (
        <div className="absolute bottom-24 left-0 right-0 px-4 flex gap-4 overflow-x-auto no-scrollbar py-6 z-[1001] bg-gradient-to-t from-slate-900/20 to-transparent">
          {availableOrders.map((order) => (
            <div key={order.id} className="min-w-[320px] bg-white rounded-[32px] shadow-2xl border border-white p-6 flex-shrink-0 animate-in slide-in-from-bottom-8 duration-500">
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Priority Order</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">₹{order.riderEarnings}</span>
               </div>
               
               <h3 className="font-black text-lg text-slate-800 mb-1 leading-tight">{order.restaurantName}</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">{order.distance} • {order.items.length} items</p>
               
               <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xs">
                       <i className="fa-solid fa-store"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-600 truncate">{order.pickupAddress}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xs">
                       <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-600 truncate">{order.deliveryAddress}</span>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => handleDeclineOrder(order.id)}
                    className="flex-1 py-4 bg-slate-50 text-slate-400 font-black text-xs rounded-2xl border border-slate-100"
                  >
                    IGNORE
                  </button>
                  <button 
                    onClick={() => handleAcceptOrder(order)}
                    className="flex-[2] py-4 bg-orange-500 text-white font-black text-xs rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-600"
                  >
                    ACCEPT TASK
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}

      {currentOrder && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[48px] shadow-[0_-40px_100px_rgba(0,0,0,0.2)] overflow-hidden z-[1001] border-t border-white">
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-2xl shadow-2xl rotate-3">
                <i className="fa-solid fa-person-biking"></i>
              </div>
              <div>
                <h4 className="font-black text-white text-base uppercase tracking-widest">Active Shift</h4>
                <p className="text-[10px] text-orange-400 font-bold tracking-widest">EN ROUTE TO CUSTOMER</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest backdrop-blur-xl border border-white/10">
              {currentOrder.status}
            </div>
          </div>

          <div className="p-8 space-y-6">
            {aiTip && (
              <div className="bg-indigo-50 border-2 border-indigo-100 p-5 rounded-[28px] flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-xl">
                  <i className="fa-solid fa-sparkles"></i>
                </div>
                <p className="text-xs text-indigo-900 font-bold leading-relaxed italic">"{aiTip}"</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Pickup Location</p>
                  <p className="text-xs font-black text-slate-800 line-clamp-1">{currentOrder.restaurantName}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Distance: {currentOrder.distance}</p>
               </div>
               <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer Info</p>
                  <p className="text-xs font-black text-slate-800 line-clamp-1">{currentOrder.customerName}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">COD: ₹{currentOrder.totalAmount}</p>
               </div>
            </div>

            <div className="pt-2">
              {currentOrder.status === OrderStatus.ACCEPTED && (
                <button 
                  onClick={() => handleStatusUpdate(OrderStatus.PICKED_UP)}
                  className="w-full py-5 bg-orange-600 text-white font-black rounded-3xl shadow-2xl shadow-orange-100 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Confirm Store Arrival
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              )}

              {currentOrder.status === OrderStatus.PICKED_UP && (
                <button 
                  onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)}
                  className="w-full py-5 bg-green-600 text-white font-black rounded-3xl shadow-2xl shadow-green-100 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Complete Delivery
                  <i className="fa-solid fa-check-double"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!currentOrder && availableOrders.length === 0 && (
        <div className="absolute bottom-24 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.1)] p-8 border border-white z-[1001]">
          <div className="flex justify-between items-center mb-8 px-2">
            <h2 className="font-black text-slate-900 text-xl tracking-tight uppercase">Shift Performance</h2>
            <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">
              ₹{shiftStats.earnings.toLocaleString('en-IN')} TODAY
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center border border-slate-100">
              <span className="text-2xl font-black text-slate-900">{shiftStats.trips}</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Trips</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center border border-slate-100">
              <span className="text-2xl font-black text-slate-900">{shiftStats.rating.toFixed(1)}</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Rating</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center border border-slate-100">
              <span className="text-2xl font-black text-slate-900">{shiftStats.distance.toFixed(1)}</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">KM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
