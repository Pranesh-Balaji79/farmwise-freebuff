import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function BuyerPayments() {
  const { payments } = useApp();

  return (
    <div>
      <TopBar title="Payments" subtitle="All payments" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Payment History</h3>
          </div>
          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-gray-600 font-medium">No payments yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {payments.map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{p.referenceId}</p>
                    <p className="text-xs text-gray-500">{p.farmerName} • {p.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{p.amount.toLocaleString()}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      p.status === 'completed' ? 'bg-green-100 text-green-700' :
                      p.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
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
