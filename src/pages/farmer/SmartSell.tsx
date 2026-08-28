import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';
import { govtProcurementPrice } from '../../data/demo-data';

interface ComparisonOption {
  id: string;
  name: string;
  type: 'government' | 'buyer';
  pricePerUnit: number;
  quantity: number;
  logisticsCost: number;
  waitTime: string;
  distance: string;
}

const govPrice = govtProcurementPrice['Rice'] || 25;

const defaultOptions: ComparisonOption[] = [
  {
    id: 'gov',
    name: 'Government Procurement',
    type: 'government',
    pricePerUnit: govPrice,
    quantity: 1000,
    logisticsCost: 500,
    waitTime: '30 min',
    distance: '8 km',
  },
  {
    id: 'b1',
    name: 'ABC Foods Pvt Ltd',
    type: 'buyer',
    pricePerUnit: 27,
    quantity: 500,
    logisticsCost: 800,
    waitTime: 'Low',
    distance: '45 km',
  },
  {
    id: 'b2',
    name: 'FreshHarvest Direct',
    type: 'buyer',
    pricePerUnit: 29,
    quantity: 1000,
    logisticsCost: 2000,
    waitTime: 'Low',
    distance: '210 km',
  },
  {
    id: 'b3',
    name: 'GreenLeaf Traders',
    type: 'buyer',
    pricePerUnit: 28,
    quantity: 700,
    logisticsCost: 1200,
    waitTime: 'Low',
    distance: '55 km',
  },
];

function scoreOption(opt: ComparisonOption) {
  const maxPrice = Math.max(...defaultOptions.map(o => o.pricePerUnit));
  const maxQty = Math.max(...defaultOptions.map(o => o.quantity));
  const minLogistics = Math.min(...defaultOptions.map(o => o.logisticsCost));

  const priceScore = (opt.pricePerUnit / maxPrice) * 30;
  const qtyScore = (opt.quantity / maxQty) * 25;
  const logisticsScore = (minLogistics / Math.max(opt.logisticsCost, 1)) * 25;
  const demandScore = opt.type === 'government' ? 10 : (opt.quantity >= 1000 ? 10 : opt.quantity >= 700 ? 7 : 5);
  const speedScore = opt.waitTime === 'Low' ? 10 : 6;

  return Math.round(priceScore + qtyScore + logisticsScore + demandScore + speedScore);
}

export default function SmartSell() {
  const { acceptOffer } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [acceptedId, setAcceptedId] = useState<string | null>(null);

  const scored = defaultOptions.map(opt => ({
    ...opt,
    gross: opt.quantity * opt.pricePerUnit,
    net: opt.quantity * opt.pricePerUnit - opt.logisticsCost,
    score: scoreOption(opt),
  }));

  scored.sort((a, b) => b.score - a.score);
  const bestId = scored[0].id;

  const handleAccept = (opt: ComparisonOption) => {
    setAcceptedId(opt.id);
    setTimeout(() => setAcceptedId(null), 3000);
  };

  return (
    <div>
      <TopBar title="Smart Sell" subtitle="Compare your selling options" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* AI Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-xl">🤖</span>
          <div>
            <p className="text-blue-800 font-semibold text-sm">AI-Assisted Recommendation</p>
            <p className="text-blue-600 text-sm mt-1">
              FarmWise analyzes selling price, quantity, logistics cost, waiting time, and demand
              to help you make an informed decision. <strong>You are always in control.</strong>
            </p>
          </div>
        </div>

        {/* Scoring Legend */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Scoring Criteria (out of 100)</h3>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span>💰 Price Score: 30 pts</span>
            <span>📦 Quantity Match: 25 pts</span>
            <span>🚚 Logistics Cost: 25 pts</span>
            <span>📈 Demand: 10 pts</span>
            <span>⏱️ Speed: 10 pts</span>
          </div>
        </div>

        {/* Accepted Banner */}
        {acceptedId && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-green-700 font-semibold text-sm animate-fade-in">
            ✅ Choice recorded! Proceed with the selected option.
          </div>
        )}

        {/* Options */}
        <div className="space-y-4">
          {scored.map((opt, idx) => {
            const isBest = opt.id === bestId;
            const isExpanded = expandedId === opt.id;
            return (
              <div
                key={opt.id}
                className={`bg-white border-2 rounded-xl p-5 transition-all ${
                  isBest ? 'border-primary-400 shadow-lg' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                {isBest && (
                  <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{opt.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                      opt.type === 'government' ? 'bg-earth-100 text-earth-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {opt.type === 'government' ? '🏛️ Government' : '🛒 Direct Buyer'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-primary-600">{opt.score}</div>
                    <p className="text-xs text-gray-500">/100</p>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mt-3 bg-gray-100 rounded-full h-3 w-full">
                  <div
                    className={`h-3 rounded-full transition-all ${isBest ? 'bg-primary-500' : 'bg-gray-400'}`}
                    style={{ width: `${opt.score}%` }}
                  />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Price</p>
                    <p className="font-bold text-gray-900">₹{opt.pricePerUnit}/kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Quantity Accepted</p>
                    <p className="font-bold text-gray-900">{opt.quantity.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Gross Value</p>
                    <p className="font-bold text-gray-900">₹{opt.gross.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Logistics Cost</p>
                    <p className="font-bold text-red-600">-₹{opt.logisticsCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                  <div className="text-lg font-extrabold text-primary-700">
                    Estimated Net: ₹{opt.net.toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : opt.id)}
                      className="text-sm text-gray-500 hover:text-primary-600 font-medium"
                    >
                      {isExpanded ? '▾ Hide Details' : '▸ Why this score?'}
                    </button>
                    <button
                      onClick={() => handleAccept(opt)}
                      className={`px-5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                        isBest
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Select This Option
                    </button>
                  </div>
                </div>

                {/* Expanded explanation */}
                {isExpanded && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm text-gray-600 animate-fade-in">
                    <p className="font-semibold text-gray-800 mb-2">Score Breakdown:</p>
                    <div className="space-y-1">
                      <p>💰 <strong>Price Score:</strong> ₹{opt.pricePerUnit}/kg vs best ₹{Math.max(...defaultOptions.map(o => o.pricePerUnit))}/kg = {Math.round((opt.pricePerUnit / Math.max(...defaultOptions.map(o => o.pricePerUnit))) * 30)}/30</p>
                      <p>📦 <strong>Quantity Match:</strong> {opt.quantity} kg accepted out of 1000 kg = {Math.round((opt.quantity / 1000) * 25)}/25</p>
                      <p>🚚 <strong>Logistics:</strong> ₹{opt.logisticsCost} cost = {Math.round((Math.min(...defaultOptions.map(o => o.logisticsCost)) / Math.max(opt.logisticsCost, 1)) * 25)}/25</p>
                      <p>📈 <strong>Demand:</strong> {opt.type === 'government' ? 'Stable government demand' : 'Active buyer demand'} = {opt.type === 'government' ? 10 : (opt.quantity >= 1000 ? 10 : 7)}/10</p>
                      <p>⏱️ <strong>Speed:</strong> {opt.waitTime === 'Low' ? 'Fast pickup' : opt.waitTime + ' wait'} = {opt.waitTime === 'Low' ? 10 : 6}/10</p>
                    </div>
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500">Trade-offs:</p>
                      <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                        {opt.type === 'government' && <li>• Lower price but guaranteed procurement</li>}
                        {opt.logisticsCost > 1000 && <li>• Higher logistics cost due to longer distance</li>}
                        {opt.quantity < 1000 && <li>• Only accepts {opt.quantity} kg of your 1,000 kg stock</li>}
                        {opt.pricePerUnit >= 29 && <li>• Best price available on the market</li>}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Government Price Reference */}
        <div className="mt-6 bg-earth-50 border border-earth-200 rounded-xl p-4">
          <p className="text-sm text-earth-700 font-medium">
            🏛️ Current Government Procurement Price for Rice: ₹{govPrice}/kg (MSP reference)
          </p>
        </div>
      </div>
    </div>
  );
}
