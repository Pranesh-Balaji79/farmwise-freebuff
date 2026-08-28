import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../context/AppContext';

export default function ProcSlots() {
  const { slots } = useApp();

  const dates = [...new Set(slots.map(s => s.date))].sort();

  return (
    <div>
      <TopBar title="Slot Management" subtitle="Manage procurement centre slots" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {dates.map(date => {
          const dateSlots = slots.filter(s => s.date === date);
          const available = dateSlots.filter(s => s.available).length;
          return (
            <div key={date} className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">
                  📅 {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <span className="text-sm text-gray-500">{available}/{dateSlots.length} available</span>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {dateSlots.map(slot => (
                  <div
                    key={slot.id}
                    className={`py-3 rounded-lg text-center text-sm font-semibold border ${
                      slot.available
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-500 line-through'
                    }`}
                  >
                    {slot.time}
                    <p className="text-xs font-normal mt-0.5">{slot.available ? 'Open' : 'Booked'}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
