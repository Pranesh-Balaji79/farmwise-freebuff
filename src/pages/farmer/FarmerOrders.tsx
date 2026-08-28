import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function FarmerOrders() {
  const { orders, advanceOrder } = useApp();
  const myOrders = orders.filter(o => o.farmerId === 'F001');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div>
      <TopBar title="My Orders" subtitle="Track all your marketplace orders" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Demo Controls */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <p className="text-amber-700 text-sm font-medium">⏱️ Demo Controls — Advance order status</p>
          <div className="flex gap-2">
            {myOrders.filter(o => o.status !== 'payment_released' && o.status !== 'completed').map(o => (
              <button
                key={o.id}
                onClick={() => advanceOrder(o.id)}
                className="bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
              >
                Advance {o.id}
              </button>
            ))}
          </div>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-600 font-medium">No orders yet</p>
            <p className="text-gray-400 text-sm mt-1">Accept a buyer offer in the Marketplace to create an order.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map(order => {
              const isExpanded = selectedOrder === order.id;
              const completedSteps = order.timeline.filter(t => t.completed).length;
              const totalSteps = order.timeline.length;
              const progress = (completedSteps / totalSteps) * 100;

              return (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div
                    onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                    className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-gray-900">{order.id}</h3>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.buyerName} • {order.produce} • {order.quantity} {order.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">₹{order.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">@ ₹{order.pricePerUnit}/kg</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 bg-gray-100 rounded-full h-2 w-full">
                      <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{completedSteps}/{totalSteps} steps completed</p>
                  </div>

                  {/* Expanded Timeline */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-5 animate-fade-in">
                      <h4 className="font-bold text-gray-900 text-sm mb-4">Order Timeline</h4>
                      <div className="space-y-0">
                        {order.timeline.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                                step.completed ? 'bg-primary-500' : 'bg-gray-300'
                              }`} />
                              {idx < order.timeline.length - 1 && (
                                <div className={`w-0.5 h-8 ${step.completed ? 'bg-primary-300' : 'bg-gray-200'}`} />
                              )}
                            </div>
                            <div className="pb-6">
                              <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.status}
                              </p>
                              {step.timestamp && (
                                <p className="text-xs text-gray-500">{step.timestamp}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
