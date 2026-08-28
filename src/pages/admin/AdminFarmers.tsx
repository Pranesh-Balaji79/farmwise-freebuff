import TopBar from '../../components/layout/TopBar';
import { demoFarmers } from '../../data/demo-data';

export default function AdminFarmers() {
  return (
    <div>
      <TopBar title="Farmers" subtitle="Registered farmers" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Farmer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Crops</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Sales</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {demoFarmers.map(f => (
                  <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">{f.name.charAt(0)}</div>
                        <div>
                          <p className="font-medium text-gray-900">{f.name}</p>
                          <p className="text-xs text-gray-500">{f.mobile}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{f.farmerId}</td>
                    <td className="px-4 py-3 text-gray-600">{f.village}, {f.district}</td>
                    <td className="px-4 py-3 text-gray-600">{f.mainCrops.join(', ')}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{f.totalSales}</td>
                    <td className="px-4 py-3 font-bold text-primary-600">₹{f.totalEarnings.toLocaleString()}</td>
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
