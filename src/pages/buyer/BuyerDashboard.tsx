import { Link } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';
import { demoBuyers } from '../../data/demo-data';

const buyer = demoBuyers[1]; // Priya Sharma (FreshHarvest Direct)

export default function BuyerDashboard() {
  const { orders, deliveries } = useApp();
  const myOrders = orders.filter(o => o.buyerId === 'F002' || o.buyerName.includes('FreshHarvest'));
  const allOrders = orders;

  return (
    <div>
      <TopBar title="Buyer Dashboard" subtitle={`Welcome, ${buyer.name} — ${buyer.company}`} />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" label="My Orders" value={`${myOrders.length}`} />
          <StatCard icon="🏪" label="Active Listings" value="5" />
          <StatCard icon="🚚" label="In Transit" value={`${deliveries.filter(d => d.status === 'in_transit').length}`} />
          <StatCard icon="⭐" label="Rating" value={`${buyer.rating}`} />
        </div>

        {/* Available Produce */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">🌾 Available Produce</h3>
            <Link to="/buyer/marketplace" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all →</Link>
          </div>
          <div className="space-y-3">
            {[
              { farmer: 'Ravi Kumar', produce: 'Rice', qty: '1,000 kg', price: '₹28/kg', loc: 'Salem' },
              { farmer: 'Lakshmi Devi', produce: 'Turmeric', qty: '300 kg', price: '₹180/kg', loc: 'Madurai' },
              { farmer: 'Suresh Patel', produce: 'Cotton', qty: '2,000 kg', price: '₹72/kg', loc: 'Anand' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.produce} — {item.farmer}</p>
                  <p className="text-xs text-gray-500">{item.qty} • {item.loc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600 text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
          {allOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {allOrders.slice(0, 5).map(o => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{o.id} — {o.farmerName}</p>
                    <p className="text-xs text-gray-500">{o.produce} • {o.quantity} {o.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">₹{o.totalAmount.toLocaleString()}</p>
                    <StatusBadge status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    placed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    in_transit: 'bg-amber-100 text-amber-700',
    delivered: 'bg-green-100 text-green-700',
    payment_released: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
