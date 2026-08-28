import TopBar from '../../components/layout/TopBar';
import { produceVolumeData, earningsData, farmerActivityData, waitingTimeData } from '../../data/demo-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#15803d', '#a8873c', '#0ea5e9', '#f59e0b', '#ef4444'];

export default function AdminAnalytics() {
  return (
    <div>
      <TopBar title="Analytics" subtitle="Platform-wide analytics and impact" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Demo Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-center">
          <p className="text-amber-700 text-xs font-semibold">🧪 DEMO / SIMULATED METRICS — Not real-world outcomes</p>
        </div>

        {/* Impact Metrics */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-primary-900 text-lg mb-4">📊 Farmer Impact Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImpactCard label="Avg Wait Time" before="55 min" after="28 min" improvement="-49%" />
            <ImpactCard label="Direct Marketplace" before="Baseline" after="+32%" improvement="+32%" />
            <ImpactCard label="Net Farmer Value" before="Baseline" after="+12%" improvement="+12%" />
            <ImpactCard label="Orders Completed" before="—" after="184" improvement="184" />
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Produce Volume by Crop</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={produceVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="rice" fill="#15803d" stackId="a" />
                <Bar dataKey="wheat" fill="#a8873c" stackId="a" />
                <Bar dataKey="cotton" fill="#0ea5e9" stackId="a" />
                <Bar dataKey="turmeric" fill="#f59e0b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#15803d]" /> Rice</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#a8873c]" /> Wheat</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#0ea5e9]" /> Cotton</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#f59e0b]" /> Turmeric</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Earnings Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="marketplace" stroke="#15803d" strokeWidth={2} name="Marketplace" />
                <Line type="monotone" dataKey="procurement" stroke="#a8873c" strokeWidth={2} name="Procurement" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>● Marketplace earnings</span>
              <span>● Procurement earnings</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Platform Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={farmerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="farmers" stroke="#15803d" strokeWidth={2} name="Farmers" />
                <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Wait Time Improvement</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={waitingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" min" />
                <Tooltip />
                <Bar dataKey="avgWait" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">↓ Waiting time reduced from 55 min to 28 min over 8 months</p>
          </div>
        </div>

        {/* Distribution Pie */}
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Selling Channel Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={300} height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Government Procurement', value: 236 },
                    { name: 'Marketplace Orders', value: 184 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell fill="#a8873c" />
                  <Cell fill="#15803d" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactCard({ label, before, after, improvement }: { label: string; before: string; after: string; improvement: string }) {
  return (
    <div className="bg-white rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-lg font-bold text-primary-700 mt-1">{improvement}</p>
      <p className="text-xs text-gray-400 mt-1">{before} → {after}</p>
    </div>
  );
}
