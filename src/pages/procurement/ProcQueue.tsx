import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function ProcQueue() {
  const { queueTokens, advanceQueue } = useApp();
  const centreTokens = queueTokens
    .filter(t => t.centreId === 'PC001')
    .sort((a, b) => a.tokenNumber - b.tokenNumber);

  const currentServing = centreTokens.find(t => t.status === 'serving');
  const waiting = centreTokens.filter(t => t.status === 'waiting');

  return (
    <div>
      <TopBar title="Today's Queue" subtitle="Manage procurement queue" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Controls */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-amber-700 text-sm font-medium">Queue Control</p>
            <p className="text-amber-600 text-xs mt-0.5">Currently serving: Token {currentServing?.tokenNumber || '—'} | Waiting: {waiting.length}</p>
          </div>
          <button
            onClick={() => advanceQueue('PC001')}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            ▶ Call Next Farmer
          </button>
        </div>

        {/* Queue List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Token</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Produce</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Quantity</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Slot Time</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {centreTokens.map(t => {
                  const isServing = t.status === 'serving';
                  const isWaiting = t.status === 'waiting';
                  return (
                    <tr key={t.id} className={`border-b border-gray-50 ${
                      isServing ? 'bg-green-50' : ''
                    }`}>
                      <td className="px-4 py-3 font-bold text-gray-900">{t.tokenNumber}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">{t.farmerName}</td>
                      <td className="px-4 py-3 text-gray-700">{t.produce}</td>
                      <td className="px-4 py-3 text-gray-700">{t.quantity} kg</td>
                      <td className="px-4 py-3 text-gray-600">{t.bookedTime}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isServing ? 'bg-green-100 text-green-700' :
                          t.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {isServing ? '🟢 Serving' : t.status === 'completed' ? '✓ Done' : '⏳ Waiting'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {isServing && (
                          <div className="flex gap-1">
                            <ActionBtn label="Verify" />
                            <ActionBtn label="Weigh" />
                            <ActionBtn label="QC" />
                          </div>
                        )}
                        {isWaiting && (
                          <span className="text-xs text-gray-400">In queue</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ label }: { label: string }) {
  return (
    <button className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold hover:bg-primary-200 transition-colors">
      {label}
    </button>
  );
}
