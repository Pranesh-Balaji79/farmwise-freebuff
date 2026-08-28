import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function Marketplace() {
  const { buyerOffers, acceptOffer } = useApp();
  const [filter, setFilter] = useState('All');
  const [acceptedId, setAcceptedId] = useState<string | null>(null);

  const produceTypes = ['All', ...new Set(buyerOffers.map(o => o.produce))];
  const filtered = filter === 'All' ? buyerOffers : buyerOffers.filter(o => o.produce === filter);

  const handleAccept = (offerId: string) => {
    const offer = buyerOffers.find(o => o.id === offerId);
    if (!offer) return;
    acceptOffer(offer, 'F001', 'Ravi Kumar');
    setAcceptedId(offerId);
    setTimeout(() => setAcceptedId(null), 3000);
  };

  return (
    <div>
      <TopBar title="Marketplace" subtitle="Direct buyer offers for your produce" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {produceTypes.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === p ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Accepted Banner */}
        {acceptedId && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-green-700 font-semibold text-sm animate-fade-in">
            ✅ Order placed successfully! Check My Orders for tracking.
          </div>
        )}

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(offer => (
            <div key={offer.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{offer.buyerName}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-amber-500 text-sm">{'★'.repeat(Math.floor(offer.buyerRating))}</span>
                    <span className="text-xs text-gray-500">{offer.buyerRating}</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary-600">₹{offer.pricePerUnit}/{offer.unit}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Produce</p>
                  <p className="font-semibold text-gray-800">{offer.produce}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Quantity</p>
                  <p className="font-semibold text-gray-800">{offer.quantity} {offer.unit}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Pickup Date</p>
                  <p className="font-semibold text-gray-800">{offer.pickupDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Delivery</p>
                  <p className="font-semibold text-gray-800">{offer.deliveryRequirement}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <p className="font-semibold text-gray-800">{offer.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Est. Logistics</p>
                  <p className="font-semibold text-gray-800">₹{offer.logisticsEstimate.toLocaleString()}</p>
                </div>
              </div>

              {/* Estimated Net */}
              <div className="bg-primary-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500">Estimated Net Value</p>
                <p className="text-lg font-bold text-primary-700">
                  ₹{((offer.quantity * offer.pricePerUnit) - offer.logisticsEstimate).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  ({offer.quantity} × ₹{offer.pricePerUnit} - ₹{offer.logisticsEstimate} logistics)
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(offer.id)}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Accept Offer
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">🛒</div>
            <p className="text-gray-600 font-medium">No offers available</p>
            <p className="text-gray-400 text-sm mt-1">Check back later for buyer offers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
