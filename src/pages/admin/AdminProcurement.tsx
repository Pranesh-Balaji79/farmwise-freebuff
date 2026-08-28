import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function AdminProcurement() {
  const { procurementCentres, procurementRecords } = useApp();

  return (
    <div>
      <TopBar title="Procurement Centres" subtitle="All registered procurement centres" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {procurementCentres.map(c => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.address}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  c.status === 'open' ? 'bg-green-100 text-green-700' :
                  c.status === 'busy' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>{c.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div><p className="text-gray-500 text-xs">Distance</p><p className="font-semibold">{c.distance} km</p></div>
                <div><p className="text-gray-500 text-xs">Slots</p><p className="font-semibold">{c.availableSlots}/{c.totalSlots}</p></div>
                <div><p className="text-gray-500 text-xs">Wait</p><p className="font-semibold">{c.estimatedWait} min</p></div>
                <div><p className="text-gray-500 text-xs">Lat/Lng</p><p className="font-semibold text-xs">{c.lat}, {c.lng}</p></div>
              </div>
              <div className="mt-3 bg-gray-100 rounded-full h-2 w-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${((c.totalSlots - c.availableSlots) / c.totalSlots) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Procurement Records ({procurementRecords.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {procurementRecords.map(r => (
              <div key={r.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900">{r.id} — {r.farmerName}</p>
                  <p className="text-xs text-gray-500">{r.produce} • {r.quantity} kg • {r.centreName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{r.totalAmount.toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.status === 'payment_completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {r.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
