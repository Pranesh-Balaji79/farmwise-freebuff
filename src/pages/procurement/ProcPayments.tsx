import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function ProcPayments() {
  const { payments, completePayment } = useApp();

  return (
    <div>
      <TopBar title="Payments" subtitle="Manage procurement payments" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Payment Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2 font-medium text-gray-600">ID</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Reference</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Method</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{p.id}</td>
                    <td className="px-4 py-2 text-gray-700">{p.referenceId}</td>
                    <td className="px-4 py-2 text-gray-700">{p.farmerName}</td>
                    <td className="px-4 py-2 font-bold text-gray-900">₹{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-2 text-gray-600">{p.method}</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        p.status === 'completed' ? 'bg-green-100 text-green-700' :
                        p.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {(p.status === 'pending' || p.status === 'processing') && (
                        <button
                          onClick={() => completePayment(p.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700"
                        >
                          Complete
                        </button>
                      )}
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
