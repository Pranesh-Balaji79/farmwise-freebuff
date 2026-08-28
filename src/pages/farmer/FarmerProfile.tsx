import TopBar from '../../components/layout/TopBar';
import { demoFarmers } from '../../data/demo-data';
import { useApp } from '../../context/AppContext';

const farmer = demoFarmers[0];

export default function FarmerProfile() {
  const { procurementRecords, payments } = useApp();
  const myProcurements = procurementRecords.filter(r => r.farmerId === 'F001');
  const myPayments = payments.filter(p => p.farmerId === 'F001');
  const totalPaid = myPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <TopBar title="Profile" subtitle="Your FarmWise account details" />
      <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-2xl font-bold">
              {farmer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{farmer.name}</h2>
              <p className="text-sm text-gray-500">{farmer.farmerId}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoField label="Mobile" value={farmer.mobile} />
            <InfoField label="State" value={farmer.state} />
            <InfoField label="District" value={farmer.district} />
            <InfoField label="Village" value={farmer.village} />
            <InfoField label="FPO" value={farmer.fpo || 'Not registered'} />
            <InfoField label="Preferred Language" value={farmer.preferredLanguage} />
            <InfoField label="Main Crops" value={farmer.mainCrops.join(', ')} />
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <SummaryCard label="Total Sales" value={`${farmer.totalSales}`} icon="📊" />
          <SummaryCard label="Total Earnings" value={`₹${farmer.totalEarnings.toLocaleString()}`} icon="💰" />
          <SummaryCard label="Payments Received" value={`₹${totalPaid.toLocaleString()}`} icon="✅" />
        </div>

        {/* Procurement History */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">Procurement History</h3>
          {myProcurements.length === 0 ? (
            <p className="text-gray-400 text-sm">No procurement records yet.</p>
          ) : (
            <div className="space-y-3">
              {myProcurements.map(r => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{r.id} — {r.produce}</p>
                    <p className="text-xs text-gray-500">{r.quantity} kg • ₹{r.pricePerUnit}/kg • {r.centreName}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    r.status === 'payment_completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {r.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm text-gray-800 font-semibold mt-0.5">{value}</p>
    </div>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
