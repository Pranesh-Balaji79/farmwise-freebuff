import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';
import { isOnline, saveOffline } from '../../utils/offline';
import type { ProduceListing } from '../../types';

export default function MyProduce() {
  const { produceListings, addProduce } = useApp();
  const [showForm, setShowForm] = useState(false);
  const myProduce = produceListings.filter(p => p.farmerId === 'F001');

  return (
    <div>
      <TopBar title="My Produce" subtitle="Manage your agricultural produce listings" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">{myProduce.length} listings</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            {showForm ? '✕ Cancel' : '+ Add Produce'}
          </button>
        </div>

        {/* Add Produce Form */}
        {showForm && <AddProduceForm onSubmit={(listing) => {
          if (isOnline()) {
            addProduce(listing);
          } else {
            saveOffline({ type: 'produce_listing', data: listing as unknown as Record<string, unknown> });
          }
          setShowForm(false);
        }} onCancel={() => setShowForm(false)} />}

        {/* Listings */}
        <div className="space-y-4">
          {myProduce.length === 0 ? (
            <EmptyState />
          ) : (
            myProduce.map(p => (
              <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900 text-lg">{p.produce}</h3>
                      <span className="text-sm text-gray-500">({p.variety})</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        p.status === 'available' ? 'bg-green-100 text-green-700' :
                        p.status === 'sold' ? 'bg-gray-100 text-gray-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Quantity</p>
                        <p className="font-semibold text-gray-800">{p.quantity.toLocaleString()} {p.unit}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Grade</p>
                        <p className="font-semibold text-gray-800">{p.grade}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Expected Price</p>
                        <p className="font-semibold text-primary-600">₹{p.expectedPrice}/{p.unit}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Location</p>
                        <p className="font-semibold text-gray-800">{p.location}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Harvested: {p.harvestDate} • Available from: {p.availableDate}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AddProduceForm({ onSubmit, onCancel }: { onSubmit: (l: ProduceListing) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    produce: 'Rice', variety: 'Ponni', quantity: '500', unit: 'kg', grade: 'A',
    harvestDate: '2026-08-25', expectedPrice: '28', availableDate: '2026-08-29',
    location: 'Mettur, Salem',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing: ProduceListing = {
      id: `PL-${Date.now()}`,
      farmerId: 'F001',
      farmerName: 'Ravi Kumar',
      produce: form.produce,
      variety: form.variety,
      quantity: parseInt(form.quantity) || 0,
      unit: form.unit,
      grade: form.grade,
      harvestDate: form.harvestDate,
      expectedPrice: parseInt(form.expectedPrice) || 0,
      availableDate: form.availableDate,
      location: form.location,
      status: 'available',
    };
    onSubmit(listing);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const labelClass = "text-xs font-medium text-gray-600 mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-primary-200 rounded-xl p-6 mb-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Add New Produce</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Produce *</label>
          <select value={form.produce} onChange={e => setForm({ ...form, produce: e.target.value })} className={inputClass}>
            <option>Rice</option><option>Wheat</option><option>Groundnut</option>
            <option>Cotton</option><option>Turmeric</option><option>Onion</option>
            <option>Tomato</option><option>Potato</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Variety *</label>
          <input value={form.variety} onChange={e => setForm({ ...form, variety: e.target.value })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Quantity *</label>
          <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className={inputClass} required min="1" />
        </div>
        <div>
          <label className={labelClass}>Unit</label>
          <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className={inputClass}>
            <option>kg</option><option>quintal</option><option>tonne</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Grade</label>
          <select value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} className={inputClass}>
            <option>A</option><option>B</option><option>C</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Expected Price (₹/kg) *</label>
          <input type="number" value={form.expectedPrice} onChange={e => setForm({ ...form, expectedPrice: e.target.value })} className={inputClass} required min="1" />
        </div>
        <div>
          <label className={labelClass}>Harvest Date</label>
          <input type="date" value={form.harvestDate} onChange={e => setForm({ ...form, harvestDate: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Available From</label>
          <input type="date" value={form.availableDate} onChange={e => setForm({ ...form, availableDate: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
          ✓ Submit Listing
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
      <div className="text-4xl mb-3">🌾</div>
      <p className="text-gray-600 font-medium">No produce listed yet</p>
      <p className="text-gray-400 text-sm mt-1">Click "Add Produce" to list your first crop.</p>
    </div>
  );
}
