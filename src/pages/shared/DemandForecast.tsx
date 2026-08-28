import TopBar from '../../components/layout/TopBar';
import { demoDemandData } from '../../data/demo-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DemandForecast() {
  return (
    <div>
      <TopBar title="Market Insights" subtitle="Demand forecasting for key crops" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 text-sm">
            📊 Demand is estimated using historical marketplace activity. Forecast values are projections based on past trends.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Rice Demand — 2026</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demoDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit=" tons" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="demand" stroke="#15803d" strokeWidth={2} name="Actual Demand" connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm text-gray-500">Sep Forecast</p>
            <p className="text-xl font-bold text-primary-600">180 tons</p>
            <p className="text-xs text-green-600 mt-1">↑ 12.5% from Aug</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">🌾</div>
            <p className="text-sm text-gray-500">Peak Demand</p>
            <p className="text-xl font-bold text-primary-600">Nov — 210 tons</p>
            <p className="text-xs text-gray-400 mt-1">Festival season demand</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">💡</div>
            <p className="text-sm text-gray-500">Insight</p>
            <p className="text-lg font-bold text-primary-600">Rising demand Q4</p>
            <p className="text-xs text-gray-400 mt-1">Plan ahead for better prices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
