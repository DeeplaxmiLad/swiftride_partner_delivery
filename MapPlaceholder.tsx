
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { GoogleGenAI } from "@google/genai";

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [trafficUpdate, setTrafficUpdate] = useState("Initializing Real-Time Map...");

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Panvel, Maharashtra Coordinates
    const panvelCoords: L.LatLngExpression = [18.9894, 73.1175];
    
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(panvelCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Custom Rider Icon
    const riderIcon = L.divIcon({
      className: 'custom-rider-marker',
      html: `
        <div class="relative">
          <div class="absolute -inset-4 bg-blue-500/30 rounded-full animate-ping"></div>
          <div class="w-10 h-10 bg-blue-600 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center text-white">
            <i class="fa-solid fa-motorcycle text-sm"></i>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    L.marker(panvelCoords, { icon: riderIcon }).addTo(mapRef.current)
      .bindPopup("<b>You are here</b><br>Panvel Sector 15").openPopup();

    // Add some mock order locations
    const locations = [
      { pos: [19.0012, 73.1023], label: "Orion Mall" },
      { pos: [18.9810, 73.1420], label: "Sukapur Hub" }
    ];

    locations.forEach(loc => {
      L.circleMarker(loc.pos as L.LatLngExpression, {
        color: '#f97316',
        fillColor: '#fb923c',
        fillOpacity: 0.5,
        radius: 8
      }).addTo(mapRef.current!).bindTooltip(loc.label);
    });

    const fetchTrafficInsight = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: "Provide a very short, real-time-style traffic update for New Panvel, Maharashtra. Focus on Sion-Panvel Highway or Station Road. Keep it under 12 words.",
        });
        setTrafficUpdate(response.text || "Traffic is flowing smoothly across Panvel.");
      } catch (e) {
        setTrafficUpdate("Live traffic analysis optimized for Panvel Zone.");
      }
    };

    fetchTrafficInsight();
    const interval = setInterval(fetchTrafficInsight, 60000);
    return () => clearInterval(interval);
  }, []);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();
  const centerMap = () => mapRef.current?.setView([18.9894, 73.1175], 14);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Live AI Traffic Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-white shadow-2xl z-[1000] animate-in slide-in-from-top-4">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Panvel Live Analytics</p>
          <p className="text-[11px] font-bold text-slate-800 truncate">{trafficUpdate}</p>
        </div>
      </div>

      {/* Real Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-[1000]">
        <div className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <button onClick={zoomIn} className="w-12 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-50 border-b active:scale-90">
            <i className="fa-solid fa-plus"></i>
          </button>
          <button onClick={zoomOut} className="w-12 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-90">
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <button onClick={centerMap} className="w-14 h-14 bg-orange-500 rounded-3xl shadow-2xl shadow-orange-200 flex items-center justify-center text-white hover:bg-orange-600 transition-all active:scale-90">
          <i className="fa-solid fa-location-crosshairs text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default MapPlaceholder;
