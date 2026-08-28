import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function BuyerLogistics() {
  const { deliveries, advanceDelivery } = useApp();

  return (
    <div>
      <TopBar title="Logistics" subtitle="Track deliveries" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Demo Controls */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <p className="text-amber-700 text-sm font-medium">⏱️ Demo Controls — Advance delivery status</p>
          <div className="flex gap-2 flex-wrap">
            {deliveries.map(d => (
              <button
                key={d.id}
                onClick={() => advanceDelivery(d.id)}
                disabled={d.status === 'delivered'}
                className="bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Advance {d.vehicleNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {deliveries.map(d => (
            <div key={d.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{d.vehicleNumber}</h3>
                  <p className="text-sm text-gray-500">Order: {d.orderId}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Driver</p>
                  <p className="font-semibold text-gray-800">{d.driverName}</p>
                  <p className="text-xs text-gray-400">{d.driverPhone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Pickup</p>
                  <p className="font-semibold text-gray-800">{d.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Destination</p>
                  <p className="font-semibold text-gray-800">{d.destination}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">ETA</p>
                  <p className="font-bold text-primary-600">{d.eta}</p>
                </div>
              </div>

              {/* Mini map placeholder */}
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm">🗺️ Live tracking ({d.lat.toFixed(2)}, {d.lng.toFixed(2)})</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-400">{d.pickupLocation}</span>
                  <span className="text-primary-400">——————</span>
                  <span className="text-xs text-gray-400">{d.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    assigned: 'bg-blue-100 text-blue-700',
    en_route: 'bg-indigo-100 text-indigo-700',
    arrived_pickup: 'bg-purple-100 text-purple-700',
    loaded: 'bg-cyan-100 text-cyan-700',
    in_transit: 'bg-amber-100 text-amber-700',
    arrived_destination: 'bg-green-100 text-green-700',
    delivered: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
