import TopBar from '../../components/layout/TopBar';
import { demoBuyers } from '../../data/demo-data';

const buyer = demoBuyers[1]; // Priya Sharma

export default function BuyerProfile() {
  return (
    <div>
      <TopBar title="Profile" subtitle="Your buyer account" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold">
              {buyer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{buyer.name}</h2>
              <p className="text-sm text-gray-500">{buyer.company}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div><p className="text-xs text-gray-500">Mobile</p><p className="text-sm font-semibold">{buyer.mobile}</p></div>
            <div><p className="text-xs text-gray-500">Location</p><p className="text-sm font-semibold">{buyer.location}</p></div>
            <div><p className="text-xs text-gray-500">Type</p><p className="text-sm font-semibold capitalize">{buyer.type}</p></div>
            <div><p className="text-xs text-gray-500">Rating</p><p className="text-sm font-semibold">⭐ {buyer.rating}</p></div>
            <div><p className="text-xs text-gray-500">Total Orders</p><p className="text-sm font-semibold">{buyer.totalOrders}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
