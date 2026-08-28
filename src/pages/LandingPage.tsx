import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold text-primary-800">FarmWise</span>
        </div>
        <Link
          to="/login"
          className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          Enter FarmWise
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-earth-50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            SIH 2026 — Unified Farmer Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
            🌾 <span className="text-primary-700">Farm</span>Wise
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 font-medium">
            "Sell Smarter. Wait Less. Earn Better."
          </p>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            One digital platform connecting farmers with direct buyers and government procurement
            while helping them make smarter selling decisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="bg-primary-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all hover:scale-[1.02]"
            >
              Enter FarmWise
            </Link>
            <Link
              to="/demo"
              className="bg-white text-primary-700 border-2 border-primary-200 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all hover:scale-[1.02]"
            >
              Explore Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Marketplace */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-2xl mb-4">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-900">Direct Marketplace</h3>
            <p className="text-sm text-primary-600 font-medium mt-1 mb-3">Problem Statement 26033</p>
            <p className="text-gray-600 leading-relaxed">
              Connect farmers and FPOs directly with buyers. Provide order management,
              logistics support, and transparent pricing. No intermediaries.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Direct Buyers', 'Fair Prices', 'Order Tracking', 'Logistics'].map(tag => (
                <span key={tag} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Procurement */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-earth-100 rounded-xl flex items-center justify-center text-2xl mb-4">
              🏛️
            </div>
            <h3 className="text-xl font-bold text-gray-900">Smart Procurement</h3>
            <p className="text-sm text-earth-600 font-medium mt-1 mb-3">Problem Statement 26032</p>
            <p className="text-gray-600 leading-relaxed">
              Book procurement slots, track queue and procurement status in real-time.
              Reduce waiting time and uncertainty at procurement centres.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Slot Booking', 'Live Queue', 'Status Tracking', 'Payments'].map(tag => (
                <span key={tag} className="bg-earth-50 text-earth-700 px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How FarmWise Works</h2>
          <p className="text-gray-500 mb-10">One farmer journey. Multiple selling options. Smarter decisions.</p>
          <div className="flex flex-col items-center gap-3">
            <FlowNode icon="👨‍🌾" label="Farmer" />
            <Arrow />
            <FlowNode icon="🌾" label="Add Produce" />
            <Arrow />
            <FlowNode icon="🤖" label="Smart Analysis" highlight />
            <Arrow />
            <div className="flex gap-6 items-start">
              <FlowNode icon="🏛️" label="Government Procurement" small />
              <span className="text-gray-400 text-2xl font-bold mt-4">or</span>
              <FlowNode icon="🛒" label="Direct Marketplace" small />
            </div>
            <Arrow />
            <FlowNode icon="🚚" label="Logistics / Queue" />
            <Arrow />
            <FlowNode icon="💰" label="Payment" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why FarmWise?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🌾', label: 'Better farmer earnings' },
            { icon: '🛒', label: 'Direct access to buyers' },
            { icon: '🏛️', label: 'Easier government procurement' },
            { icon: '⏱️', label: 'Less waiting time' },
            { icon: '🚚', label: 'Better logistics' },
            { icon: '💰', label: 'Transparent payments' },
            { icon: '🤖', label: 'Smarter selling decisions' },
            { icon: '📊', label: 'Market insights' },
          ].map(v => (
            <div key={v.label} className="text-center p-4">
              <div className="text-3xl mb-2">{v.icon}</div>
              <p className="text-sm font-medium text-gray-700">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-primary-200 py-8 text-center text-sm">
        <p className="font-semibold text-white">🌾 FarmWise — SIH 2026</p>
        <p className="mt-1">One Platform. Multiple Selling Options. Smarter Decisions.</p>
      </footer>
    </div>
  );
}

function FlowNode({ icon, label, highlight, small }: { icon: string; label: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${
      highlight
        ? 'border-primary-400 bg-primary-100 shadow-md'
        : 'border-gray-200 bg-white'
    } ${small ? 'text-sm' : ''}`}>
      <span className={small ? 'text-lg' : 'text-xl'}>{icon}</span>
      <span className={`font-medium ${highlight ? 'text-primary-700' : 'text-gray-700'}`}>{label}</span>
    </div>
  );
}

function Arrow() {
  return <div className="text-gray-300 text-xl">↓</div>;
}
