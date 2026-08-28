import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function GovProcurement() {
  const { procurementCentres, slots, bookSlot } = useApp();
  const [selectedCentre, setSelectedCentre] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-08-29');
  const [bookedToken, setBookedToken] = useState<number | null>(null);

  const centreSlots = selectedCentre
    ? slots.filter(s => s.centreId === selectedCentre && s.date === selectedDate)
    : [];

  const dates = [...new Set(slots.filter(s => s.centreId === selectedCentre).map(s => s.date))];

  const handleBook = (slotId: string) => {
    const token = bookSlot(slotId, 'F001', 'Ravi Kumar', 'Rice', 1000);
    setBookedToken(token.tokenNumber);
  };

  return (
    <div>
      <TopBar title="Government Procurement" subtitle="Book slots at nearby procurement centres" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Success Banner */}
        {bookedToken && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fade-in">
            <p className="text-green-800 font-bold">✅ Slot Booked Successfully!</p>
            <p className="text-green-600 text-sm mt-1">Token Number: <strong>{bookedToken}</strong> • Track your queue in the Queue section.</p>
          </div>
        )}

        {/* Centre Listing */}
        <h3 className="font-bold text-gray-900 mb-4">Nearby Procurement Centres</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {procurementCentres.map(centre => (
            <div
              key={centre.id}
              onClick={() => setSelectedCentre(centre.id)}
              className={`bg-white border-2 rounded-xl p-5 cursor-pointer transition-all ${
                selectedCentre === centre.id ? 'border-primary-400 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{centre.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{centre.address}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  centre.status === 'open' ? 'bg-green-100 text-green-700' :
                  centre.status === 'busy' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {centre.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Distance</p>
                  <p className="font-semibold text-gray-800">{centre.distance} km</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Available Slots</p>
                  <p className="font-semibold text-gray-800">{centre.availableSlots}/{centre.totalSlots}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Est. Wait</p>
                  <p className="font-semibold text-gray-800">{centre.estimatedWait} min</p>
                </div>
              </div>
              {/* Slot indicator bar */}
              <div className="mt-3 bg-gray-100 rounded-full h-2 w-full">
                <div
                  className={`h-2 rounded-full ${centre.status === 'open' ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${((centre.totalSlots - centre.availableSlots) / centre.totalSlots) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Slot Selection */}
        {selectedCentre && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Select Date & Time Slot</h3>

            {/* Date Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {dates.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedDate === d ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {new Date(d).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {centreSlots.length === 0 ? (
                <p className="text-gray-400 text-sm col-span-5">No slots available for this date.</p>
              ) : (
                centreSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && handleBook(slot.id)}
                    disabled={!slot.available}
                    className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                      slot.available
                        ? 'bg-primary-50 border border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 cursor-pointer'
                        : 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))
              )}
            </div>
            <p className="text-xs text-gray-400 mt-3">Select an available slot to book. Booking is instant and generates a token number.</p>
          </div>
        )}
      </div>
    </div>
  );
}
