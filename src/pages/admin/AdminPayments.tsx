import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function AdminPayments() {
  const { payments } = useApp();
  const totalAmount = payments.reduce((s, p) => s + p.amount, 0);
  const completedAmount = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status !== 'completed').reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <TopBar title="Payments" subtitle="All platform payments" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-xs text-green-600">Completed</p>
            <p className="text-2xl font-bold text-green-700 mt-1">₹{completedAmount.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-xs text-amber-600">Pending/Processing</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">₹{pendingAmount.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Reference</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Method</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.id}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{p.referenceType}</td>
                    <td className="px-4 py-3 text-gray-700">{p.referenceId}</td>
                    <td className="px-4 py-3 text-gray-700">{p.farmerName}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">₹{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">{p.method}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        p.status === 'completed' ? 'bg-green-100 text-green-700' :
                        p.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
