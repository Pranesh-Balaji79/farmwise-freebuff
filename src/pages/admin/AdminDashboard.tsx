import { Link } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import { demoAdminStats, farmerActivityData, earningsData, waitingTimeData } from '../../data/demo-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const stats = demoAdminStats;

  return (
    <div>
      <TopBar title="FarmWise Command Centre" subtitle="System-wide overview" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-center">
          <p className="text-amber-700 text-xs font-semibold">🧪 DEMO / SIMULATED METRICS</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="👨‍🌾" label="Registered Farmers" value={stats.totalFarmers.toLocaleString()} color="green" />
          <StatCard icon="🛒" label="Active Buyers" value={stats.activeBuyers.toLocaleString()} color="blue" />
          <StatCard icon="📦" label="Marketplace Orders" value={stats.marketplaceOrders.toLocaleString()} color="purple" />
          <StatCard icon="🏛️" label="Procurement Completed" value={stats.procurementCompleted.toLocaleString()} color="amber" />
          <StatCard icon="⏳" label="Pending Payments" value={stats.pendingPayments.toLocaleString()} color="orange" />
          <StatCard icon="⏱️" label="Avg Queue Time" value={`${stats.avgWaitTime} min`} color="red" />
          <StatCard icon="💰" label="Total Earnings" value={`₹${(stats.totalEarnings / 100000).toFixed(1)}L`} color="emerald" />
          <StatCard icon="📊" label="Marketplace Txns" value={stats.marketplaceTransactions.toLocaleString()} color="indigo" />
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Farmer Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Farmer Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={farmerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="farmers" fill="#15803d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Earnings (Marketplace vs Procurement)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="marketplace" stroke="#15803d" strokeWidth={2} />
                <Line type="monotone" dataKey="procurement" stroke="#a8873c" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Wait Time Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Average Waiting Time Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={waitingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" min" />
                <Tooltip />
                <Line type="monotone" dataKey="avgWait" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: '/admin/farmers', icon: '👨‍🌾', label: 'Farmers' },
                { to: '/admin/buyers', icon: '🛒', label: 'Buyers' },
                { to: '/admin/analytics', icon: '📈', label: 'Analytics' },
                { to: '/admin/map', icon: '🗺️', label: 'Map' },
                { to: '/admin/orders', icon: '📦', label: 'Orders' },
                { to: '/admin/payments', icon: '💰', label: 'Payments' },
              ].map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-primary-50 transition-colors text-sm font-medium text-gray-700 hover:text-primary-700"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    amber: 'bg-amber-50 border-amber-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    indigo: 'bg-indigo-50 border-indigo-200',
  };
  return (
    <div className={`border rounded-xl p-4 ${colorMap[color] || ''}`}>
      <div className="text-xl mb-1">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
