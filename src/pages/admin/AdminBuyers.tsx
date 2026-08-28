import TopBar from '../../components/layout/TopBar';
import { demoBuyers } from '../../data/demo-data';

export default function AdminBuyers() {
  return (
    <div>
      <TopBar title="Buyers" subtitle="Active buyers on the platform" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-4">
          {demoBuyers.map(b => (
            <div key={b.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">{b.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-500">{b.company}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">{b.type}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-gray-500 text-xs">Location</p><p className="font-semibold">{b.location}</p></div>
                <div><p className="text-gray-500 text-xs">Rating</p><p className="font-semibold">⭐ {b.rating}</p></div>
                <div><p className="text-gray-500 text-xs">Orders</p><p className="font-semibold">{b.totalOrders}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
