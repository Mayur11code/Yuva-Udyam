"use client";

import React from "react";
import dynamic from 'next/dynamic';

const World = dynamic(() => import("./globe").then((m) => m.World), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black animate-pulse flex items-center justify-center text-white">SYNCING GLOBAL NODES...</div>
});

export function GlobeDisplay() {
  const globeConfig = {
    pointSize: 1,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1200,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: true,
    autoRotateSpeed: 1.5,
  };

  const data = [
    { order: 1, startLat: 37.7749, startLng: -122.4194, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.2, color: "#38bdf8" },
    { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.1, color: "#818cf8" },
    { order: 2, startLat: 45.5231, startLng: -122.6765, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.4, color: "#fb7185" },
    { order: 3, startLat: 28.6139, startLng: 77.209, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: "#38bdf8" },
    { order: 3, startLat: 12.9716, startLng: 77.5946, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#818cf8" },
    { order: 4, startLat: 22.3193, startLng: 114.1694, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.5, color: "#fb7185" },
    { order: 4, startLat: 31.2304, startLng: 121.4737, endLat: 40.7128, endLng: -74.006, arcAlt: 0.4, color: "#38bdf8" },
    { order: 5, startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: "#818cf8" },
    { order: 5, startLat: -23.5505, startLng: -46.6333, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.4, color: "#fb7185" },
    { order: 6, startLat: -33.9249, startLng: 18.4241, endLat: 52.52, endLng: 13.405, arcAlt: 0.3, color: "#38bdf8" },
    { order: 7, startLat: 60.1699, startLng: 24.9384, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.5, color: "#ffffff" },
    { order: 8, startLat: 39.9042, startLng: 116.4074, endLat: -37.8136, endLng: 144.9631, arcAlt: 0.4, color: "#38bdf8" },
    { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.5, color: "#818cf8" }
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[800px] mt-10 cursor-grab active:cursor-grabbing">
      <World data={data} globeConfig={globeConfig} />
    </div>
  );
}