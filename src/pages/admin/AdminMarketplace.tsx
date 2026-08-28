import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function AdminMarketplace() {
  const { produceListings, buyerOffers } = useApp();

  return (
    <div>
      <TopBar title="Marketplace" subtitle="Platform marketplace overview" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Produce Listings ({produceListings.length})</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {produceListings.map(p => (
                <div key={p.id} className="px-4 py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{p.produce} — {p.farmerName}</p>
                    <p className="text-xs text-gray-500">{p.quantity} {p.unit} • ₹{p.expectedPrice}/{p.unit}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Buyer Offers ({buyerOffers.length})</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {buyerOffers.map(o => (
                <div key={o.id} className="px-4 py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{o.buyerName}</p>
                    <p className="text-xs text-gray-500">{o.produce} • {o.quantity} kg • ₹{o.pricePerUnit}/kg</p>
                  </div>
                  <span className="text-primary-600 font-bold text-sm">₹{(o.quantity * o.pricePerUnit).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
