import { useEffect, useRef } from 'react';
import TopBar from '../../components/layout/TopBar';
import { demoProcurementCentres, demoDeliveries } from '../../data/demo-data';

export default function AdminMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = L.map(mapRef.current!).setView([11.5, 78.0], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Procurement centres
      demoProcurementCentres.forEach(c => {
        const color = c.status === 'open' ? 'green' : c.status === 'busy' ? 'orange' : 'red';
        L.circleMarker([c.lat, c.lng], { radius: 10, color, fillColor: color, fillOpacity: 0.7 })
          .addTo(map)
          .bindPopup(`
            <b>🏛️ ${c.name}</b><br/>
            Status: ${c.status}<br/>
            Slots: ${c.availableSlots}/${c.totalSlots}<br/>
            Wait: ~${c.estimatedWait} min
          `);
      });

      // Delivery vehicles
      demoDeliveries.forEach(d => {
        L.circleMarker([d.lat, d.lng], { radius: 8, color: 'blue', fillColor: 'blue', fillOpacity: 0.7 })
          .addTo(map)
          .bindPopup(`
            <b>🚚 ${d.vehicleNumber}</b><br/>
            Driver: ${d.driverName}<br/>
            Status: ${d.status.replace(/_/g, ' ')}<br/>
            To: ${d.destination}<br/>
            ETA: ${d.eta}
          `);
      });

      // Farmer locations
      const farmerLocations = [
        { name: 'Ravi Kumar', lat: 11.6643, lng: 78.146 },
        { name: 'Lakshmi Devi', lat: 10.05, lng: 78.12 },
        { name: 'Suresh Patel', lat: 22.56, lng: 72.95 },
      ];
      farmerLocations.forEach(f => {
        L.circleMarker([f.lat, f.lng], { radius: 7, color: '#15803d', fillColor: '#15803d', fillOpacity: 0.6 })
          .addTo(map)
          .bindPopup(`<b>👨‍🌾 ${f.name}</b>`);
      });

      mapInstanceRef.current = map;
    });
  }, []);

  return (
    <div>
      <TopBar title="Map" subtitle="Interactive GIS view" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Platform Map</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500" /> Procurement Centre</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Vehicle</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#15803d]" /> Farmer</span>
            </div>
          </div>
          <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
