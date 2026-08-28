import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function AdminOrders() {
  const { orders } = useApp();

  return (
    <div>
      <TopBar title="Orders" subtitle="All marketplace orders" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Buyer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Produce</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-900">{o.id}</td>
                    <td className="px-4 py-3 text-gray-700">{o.farmerName}</td>
                    <td className="px-4 py-3 text-gray-700">{o.buyerName}</td>
                    <td className="px-4 py-3 text-gray-700">{o.produce} • {o.quantity} {o.unit}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">₹{o.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        o.status === 'payment_released' || o.status === 'completed' ? 'bg-green-100 text-green-700' :
                        o.status === 'in_transit' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{o.status.replace(/_/g, ' ')}</span>
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
