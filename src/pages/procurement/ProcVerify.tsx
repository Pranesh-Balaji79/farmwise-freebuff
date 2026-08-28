import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';
import { demoFarmers } from '../../data/demo-data';

export default function ProcVerify() {
  const { advanceProcurement, procurementRecords } = useApp();
  const pending = procurementRecords.filter(r => r.status === 'verification');
  const all = procurementRecords;

  return (
    <div>
      <TopBar title="Farmer Verification" subtitle="Verify farmers arriving at the centre" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Pending Verification */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Pending Verification</h3>
          {pending.length === 0 ? (
            <p className="text-gray-400 text-sm">No farmers pending verification.</p>
          ) : (
            <div className="space-y-4">
              {pending.map(r => {
                const farmer = demoFarmers.find(f => f.id === r.farmerId);
                return (
                  <div key={r.id} className="border border-amber-200 rounded-xl p-4 bg-amber-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{r.farmerName}</h4>
                        <p className="text-xs text-gray-500">Token: {r.tokenNumber} • {r.id}</p>
                      </div>
                      <button
                        onClick={() => advanceProcurement(r.id)}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        ✓ Verify
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                      <div><p className="text-gray-500 text-xs">Produce</p><p className="font-semibold">{r.produce}</p></div>
                      <div><p className="text-gray-500 text-xs">Quantity</p><p className="font-semibold">{r.quantity} kg</p></div>
                      <div><p className="text-gray-500 text-xs">Grade</p><p className="font-semibold">{r.grade}</p></div>
                    </div>
                    {farmer && (
                      <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-gray-500">
                        <p>Farmer ID: {farmer.farmerId} • {farmer.mobile} • {farmer.village}, {farmer.district}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Records */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">All Procurement Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Record</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Produce</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {all.map(r => (
                  <tr key={r.id} className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{r.id}</td>
                    <td className="px-4 py-2 text-gray-700">{r.farmerName}</td>
                    <td className="px-4 py-2 text-gray-700">{r.produce} • {r.quantity} kg</td>
                    <td className="px-4 py-2 text-gray-700">₹{r.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        r.status === 'payment_completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status.replace(/_/g, ' ')}
                      </span>
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
