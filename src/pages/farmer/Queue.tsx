import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function Queue() {
  const { queueTokens, advanceQueue } = useApp();
  const centreId = 'PC001';
  const centreTokens = queueTokens.filter(t => t.centreId === centreId).sort((a, b) => a.tokenNumber - b.tokenNumber);

  const myToken = centreTokens.find(t => t.farmerId === 'F001' && t.status === 'waiting');
  const currentServing = centreTokens.find(t => t.status === 'serving');
  const farmersAhead = myToken
    ? centreTokens.filter(t => t.status === 'waiting' && t.tokenNumber < myToken.tokenNumber).length
    : 0;

  const estimatedWait = farmersAhead * 12; // ~12 min per farmer

  return (
    <div>
      <TopBar title="Live Queue" subtitle="Salem District Procurement Centre" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Demo Controls */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <p className="text-amber-700 text-sm font-medium">⏱️ Demo Controls</p>
          <button
            onClick={() => advanceQueue(centreId)}
            className="bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
          >
            Simulate Queue Progress
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Your Token */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
            <p className="text-sm text-primary-600 font-medium">Your Token</p>
            <p className="text-5xl font-extrabold text-primary-700 mt-2">{myToken?.tokenNumber || '—'}</p>
            {myToken && <p className="text-xs text-primary-500 mt-2">{myToken.produce} • {myToken.quantity} kg</p>}
          </div>

          {/* Currently Serving */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 font-medium">Currently Serving</p>
            <p className="text-5xl font-extrabold text-gray-900 mt-2">{currentServing?.tokenNumber || '—'}</p>
            {currentServing && <p className="text-xs text-gray-500 mt-2">{currentServing.farmerName}</p>}
          </div>

          {/* Waiting Stats */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 font-medium">Farmers Ahead</p>
            <p className="text-5xl font-extrabold text-amber-600 mt-2">{farmersAhead}</p>
            <p className="text-xs text-gray-500 mt-2">Est. wait: {estimatedWait} min</p>
          </div>
        </div>

        {/* Queue List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Queue — Token {currentServing?.tokenNumber || '—'} onwards</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {centreTokens.map(t => {
              const isMe = t.farmerId === 'F001';
              const isServing = t.status === 'serving';
              const isCompleted = t.status === 'completed';
              return (
                <div
                  key={t.id}
                  className={`flex items-center justify-between px-5 py-3 ${
                    isMe ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                  } ${isServing ? 'bg-green-50' : ''} ${isCompleted ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isServing ? 'bg-green-500 text-white' :
                      isMe ? 'bg-primary-500 text-white' :
                      isCompleted ? 'bg-gray-300 text-gray-500' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {t.tokenNumber}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${isMe ? 'text-primary-700 font-bold' : 'text-gray-800'}`}>
                        {t.farmerName} {isMe && '(YOU)'}
                      </p>
                      <p className="text-xs text-gray-500">{t.produce} • {t.quantity} kg • Slot: {t.bookedTime}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isServing ? 'bg-green-100 text-green-700' :
                    isMe ? 'bg-primary-100 text-primary-700' :
                    isCompleted ? 'bg-gray-100 text-gray-500' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {isServing ? '🟢 Serving' : isCompleted ? '✓ Done' : isMe ? '📍 You' : '⏳ Waiting'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notification hint */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl">🔔</span>
          <div>
            <p className="text-blue-800 font-semibold text-sm">Real-time Notifications</p>
            <p className="text-blue-600 text-sm">When your turn approaches, you will receive a notification: "Your turn is approaching. Please proceed to Counter 2."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
