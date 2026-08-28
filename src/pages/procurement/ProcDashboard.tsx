import { Link } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function ProcDashboard() {
  const { queueTokens, procurementRecords } = useApp();
  const centreTokens = queueTokens.filter(t => t.centreId === 'PC001');
  const waiting = centreTokens.filter(t => t.status === 'waiting');
  const serving = centreTokens.filter(t => t.status === 'serving');
  const completed = centreTokens.filter(t => t.status === 'completed');
  const todayRecords = procurementRecords.filter(r => r.date === '2026-08-28');

  return (
    <div>
      <TopBar title="Procurement Centre Control Panel" subtitle="Salem District Procurement Centre" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card label="Today's Farmers" value={`${centreTokens.length}`} icon="👨‍🌾" />
          <Card label="Waiting" value={`${waiting.length}`} icon="⏳" />
          <Card label="Processing" value={`${serving.length}`} icon="🔄" />
          <Card label="Completed" value={`${completed.length}`} icon="✅" />
          <Card label="Avg Wait Time" value="25 min" icon="⏱️" />
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/procurement/queue" className="bg-primary-600 text-white rounded-xl p-5 text-center hover:bg-primary-700 transition-colors">
            <div className="text-2xl mb-1">⏱️</div>
            <p className="font-bold text-sm">Today's Queue</p>
          </Link>
          <Link to="/procurement/slots" className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">📅</div>
            <p className="font-bold text-sm text-gray-900">Slot Management</p>
          </Link>
          <Link to="/procurement/verify" className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">✅</div>
            <p className="font-bold text-sm text-gray-900">Verify Farmers</p>
          </Link>
          <Link to="/procurement/process" className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">🌾</div>
            <p className="font-bold text-sm text-gray-900">Process Procurement</p>
          </Link>
        </div>

        {/* Queue Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Current Queue</h3>
            <Link to="/procurement/queue" className="text-sm text-primary-600 font-medium hover:text-primary-700">View full queue →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Token</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Produce</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Quantity</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {centreTokens.sort((a, b) => a.tokenNumber - b.tokenNumber).map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2 font-bold text-gray-900">{t.tokenNumber}</td>
                    <td className="px-4 py-2 text-gray-700">{t.farmerName}</td>
                    <td className="px-4 py-2 text-gray-700">{t.produce}</td>
                    <td className="px-4 py-2 text-gray-700">{t.quantity} kg</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        t.status === 'serving' ? 'bg-green-100 text-green-700' :
                        t.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Records */}
        {todayRecords.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Today's Procurement Records</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {todayRecords.map(r => (
                <div key={r.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{r.id} — {r.farmerName}</p>
                    <p className="text-xs text-gray-500">{r.produce} • {r.quantity} kg • ₹{r.totalAmount.toLocaleString()}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    r.status === 'payment_completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {r.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
