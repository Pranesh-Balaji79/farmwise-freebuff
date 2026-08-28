import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function BuyerMarketplace() {
  const { produceListings } = useApp();
  const [search, setSearch] = useState('');
  const [filterProduce, setFilterProduce] = useState('All');

  const produceTypes = ['All', ...new Set(produceListings.map(p => p.produce))];
  const filtered = produceListings.filter(p => {
    const matchSearch = search === '' || p.farmerName.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchProduce = filterProduce === 'All' || p.produce === filterProduce;
    return matchSearch && matchProduce && p.status === 'available';
  });

  return (
    <div>
      <TopBar title="Marketplace" subtitle="Browse available agricultural produce" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by farmer or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-2 overflow-x-auto">
            {produceTypes.map(p => (
              <button
                key={p}
                onClick={() => setFilterProduce(p)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  filterProduce === p ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{p.produce} — {p.variety}</h3>
                  <p className="text-sm text-gray-500">Farmer: {p.farmerName}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Available</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Quantity</p>
                  <p className="font-semibold text-gray-800">{p.quantity.toLocaleString()} {p.unit}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Grade</p>
                  <p className="font-semibold text-gray-800">{p.grade}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Price</p>
                  <p className="font-bold text-primary-600">₹{p.expectedPrice}/{p.unit}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <p className="font-semibold text-gray-800">{p.location}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                  Place Order
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-600 font-medium">No produce found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
