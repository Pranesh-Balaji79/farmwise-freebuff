import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function BuyerOrders() {
  const { orders } = useApp();

  return (
    <div>
      <TopBar title="My Orders" subtitle="Track all your orders" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-600 font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const completedSteps = order.timeline.filter(t => t.completed).length;
              const totalSteps = order.timeline.length;
              const progress = (completedSteps / totalSteps) * 100;

              return (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900">{order.id}</h3>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Farmer: {order.farmerName} • {order.produce} • {order.quantity} {order.unit}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary-600">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 w-full">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{completedSteps}/{totalSteps} steps</p>

                  {/* Mini timeline */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {order.timeline.map((step, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-0.5 rounded ${
                          step.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step.status}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    placed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    logistics_assigned: 'bg-purple-100 text-purple-700',
    pickup_scheduled: 'bg-indigo-100 text-indigo-700',
    picked_up: 'bg-cyan-100 text-cyan-700',
    in_transit: 'bg-amber-100 text-amber-700',
    delivered: 'bg-green-100 text-green-700',
    payment_released: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
