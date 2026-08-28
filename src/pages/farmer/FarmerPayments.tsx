import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function FarmerPayments() {
  const { payments } = useApp();
  const myPayments = payments.filter(p => p.farmerId === 'F001');

  const pending = myPayments.filter(p => p.status === 'pending');
  const processing = myPayments.filter(p => p.status === 'processing');
  const completed = myPayments.filter(p => p.status === 'completed');

  const totalReceived = completed.reduce((s, p) => s + p.amount, 0);
  const totalPending = [...pending, ...processing].reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <TopBar title="Payments" subtitle="Track all your payments" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-sm text-green-600 font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-700 mt-1">₹{totalReceived.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-amber-600 font-medium">Processing / Pending</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">₹{totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500 font-medium">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{myPayments.length}</p>
          </div>
        </div>

        {/* Payment List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">All Payments</h3>
          </div>
          {myPayments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-gray-600 font-medium">No payments yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {myPayments.map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{p.referenceId}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {p.referenceType === 'order' ? '🛒 Marketplace Order' : '🏛️ Government Procurement'} • {p.method}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Created: {p.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{p.amount.toLocaleString()}</p>
                    <PaymentStatus status={p.status} />
                    {p.completedAt && (
                      <p className="text-xs text-gray-400 mt-0.5">Paid: {p.completedAt}</p>
                    )}
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

function PaymentStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${map[status] || ''}`}>
      {status === 'completed' ? '✅ ' : status === 'processing' ? '⏳ ' : status === 'pending' ? '🕐 ' : '❌ '}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
