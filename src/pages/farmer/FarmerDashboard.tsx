import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { demoFarmers, govtProcurementPrice } from '../../data/demo-data';

const farmer = demoFarmers[0]; // Ravi Kumar

export default function FarmerDashboard() {
  const { produceListings, orders, queueTokens, payments } = useApp();

  const myProduce = produceListings.filter(p => p.farmerId === 'F001' && p.status === 'available');
  const myOrders = orders.filter(o => o.farmerId === 'F001');
  const myTokens = queueTokens.filter(t => t.farmerId === 'F001' && t.status === 'waiting');
  const pendingPayments = payments.filter(p => p.farmerId === 'F001' && (p.status === 'pending' || p.status === 'processing'));

  const totalQuantity = myProduce.reduce((sum, p) => sum + p.quantity, 0);
  const totalPendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {farmer.name} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">{farmer.district}, {farmer.state} • {farmer.farmerId}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard icon="🌾" label="Available Produce" value={`${totalQuantity.toLocaleString()} kg`} color="green" />
        <StatCard icon="📦" label="Active Orders" value={`${myOrders.filter(o => o.status !== 'payment_released' && o.status !== 'completed').length}`} color="blue" />
        <StatCard icon="🏛️" label="Upcoming Procurement" value={myTokens.length > 0 ? `Token ${myTokens[0].tokenNumber}` : 'None'} color="amber" />
        <StatCard icon="⏳" label="Pending Payment" value={`₹${totalPendingAmount.toLocaleString()}`} color="orange" />
        <StatCard icon="💰" label="Total Earnings" value={`₹${farmer.totalEarnings.toLocaleString()}`} color="purple" />
      </div>

      {/* Smart Recommendation */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-primary-900 text-lg">FarmWise Smart Recommendation</h3>
            <p className="text-primary-700 mt-2 leading-relaxed">
              Direct Buyer <strong>B (FreshHarvest Direct)</strong> could provide approximately <strong>₹2,500 higher</strong> estimated
              net value than government procurement for your current rice stock (1,000 kg).
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                to="/farmer/smart-sell"
                className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                View Comparison
              </Link>
              <Link
                to="/farmer/marketplace"
                className="bg-white text-primary-700 border border-primary-300 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                See Buyers
              </Link>
              <Link
                to="/farmer/procurement"
                className="bg-white text-primary-700 border border-primary-300 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                Book Procurement
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Produce */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">🌾 My Produce</h3>
          {myProduce.length === 0 ? (
            <p className="text-gray-400 text-sm">No produce listed yet.</p>
          ) : (
            <div className="space-y-3">
              {myProduce.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{p.produce} ({p.variety})</p>
                    <p className="text-gray-500 text-xs">{p.quantity} {p.unit} • Grade {p.grade}</p>
                  </div>
                  <span className="text-primary-600 font-semibold">₹{p.expectedPrice}/{p.unit}</span>
                </div>
              ))}
            </div>
          )}
          <Link to="/farmer/produce" className="block mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>

        {/* Active Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">📦 Active Orders</h3>
          {myOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No active orders.</p>
          ) : (
            <div className="space-y-3">
              {myOrders.slice(0, 3).map(o => (
                <div key={o.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{o.id} — {o.buyerName}</p>
                    <p className="text-gray-500 text-xs">{o.produce} • ₹{o.totalAmount.toLocaleString()}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          )}
          <Link to="/farmer/orders" className="block mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>

        {/* Pending Payments */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">💰 Recent Payments</h3>
          {pendingPayments.length === 0 ? (
            <p className="text-gray-400 text-sm">No pending payments.</p>
          ) : (
            <div className="space-y-3">
              {pendingPayments.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{p.referenceId}</p>
                    <p className="text-gray-500 text-xs">₹{p.amount.toLocaleString()}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          )}
          <Link to="/farmer/payments" className="block mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border-green-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color] || colorMap.green}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    available: 'bg-green-100 text-green-700',
    placed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    logistics_assigned: 'bg-purple-100 text-purple-700',
    pickup_scheduled: 'bg-indigo-100 text-indigo-700',
    picked_up: 'bg-cyan-100 text-cyan-700',
    in_transit: 'bg-amber-100 text-amber-700',
    delivered: 'bg-green-100 text-green-700',
    payment_released: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-gray-100 text-gray-700',
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    waiting: 'bg-amber-100 text-amber-700',
    serving: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
