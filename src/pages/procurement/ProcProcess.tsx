import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function ProcProcess() {
  const { procurementRecords, advanceProcurement } = useApp();

  return (
    <div>
      <TopBar title="Procurement Processing" subtitle="Manage procurement workflow" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="space-y-4">
          {procurementRecords.map(r => {
            const isComplete = r.status === 'payment_completed';
            const nextStatuses = ['verification', 'weighing', 'quality_check', 'procurement', 'payment_processing', 'payment_completed'];
            const canAdvance = !isComplete && nextStatuses.includes(r.status);

            return (
              <div key={r.id} className={`bg-white border rounded-xl p-5 ${isComplete ? 'border-gray-200 opacity-70' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">{r.id}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{r.farmerName} • {r.produce} • {r.quantity} kg • ₹{r.totalAmount.toLocaleString()}</p>
                  </div>
                  {canAdvance && (
                    <button
                      onClick={() => advanceProcurement(r.id)}
                      className="bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Advance →
                    </button>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex flex-wrap gap-2">
                  {r.timeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        step.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? '✓' : '○'} {step.label}
                      </span>
                      {i < r.timeline.length - 1 && <span className="text-gray-300">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
