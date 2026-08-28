import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Step {
  title: string;
  description: string;
  role: 'farmer' | 'buyer' | 'procurement_officer' | 'admin';
  route: string;
  tip: string;
}

const scenarioA: Step[] = [
  { title: '1. Login as Farmer', description: 'Enter FarmWise as Ravi Kumar, a rice farmer from Salem, Tamil Nadu.', role: 'farmer', route: '/farmer', tip: 'Show the landing page first — highlight the two pillars: Direct Marketplace + Smart Procurement.' },
  { title: '2. View Dashboard', description: 'Ravi sees his produce, active orders, pending payments, and a Smart Recommendation.', role: 'farmer', route: '/farmer', tip: 'Point out the AI recommendation card: "Direct Buyer B could provide ₹2,500 higher net value."' },
  { title: '3. Add Produce', description: 'Ravi lists 1,000 kg of Rice (Ponni, Grade A) at ₹28/kg.', role: 'farmer', route: '/farmer/produce', tip: 'Show the add produce form — farmer-friendly with dropdowns and minimal typing.' },
  { title: '4. View Marketplace', description: 'Ravi sees 4 buyer offers for his rice with different prices and terms.', role: 'farmer', route: '/farmer/marketplace', tip: 'Highlight the estimated net value on each card — logistics cost deducted automatically.' },
  { title: '5. Smart Sell Comparison', description: 'FarmWise compares Government Procurement (₹25/kg) vs Direct Buyers (₹27-29/kg).', role: 'farmer', route: '/farmer/smart-sell', tip: 'This is the KEY feature — show the scoring breakdown and AI recommendation. Emphasize: "AI-assisted, farmer decides."' },
  { title: '6. Accept Buyer B', description: 'Ravi accepts FreshHarvest Direct at ₹29/kg — estimated net ₹27,000.', role: 'farmer', route: '/farmer/marketplace', tip: 'After accepting, show that the order appears in Orders, the dashboard updates, and a notification is sent.' },
  { title: '7. Track Order', description: 'Ravi tracks the order through confirmation, logistics, and delivery.', role: 'farmer', route: '/farmer/orders', tip: 'Use the "Advance" demo button to simulate order status progression.' },
  { title: '8. View Payment', description: 'Payment of ₹27,000 is processed and tracked.', role: 'farmer', route: '/farmer/payments', tip: 'Show the payment history — pending, processing, completed states.' },
];

const scenarioB: Step[] = [
  { title: '9. Book Procurement Slot', description: 'Ravi books a slot at Salem District Procurement Centre.', role: 'farmer', route: '/farmer/procurement', tip: 'Show the centre cards with distance, available slots, and estimated wait time.' },
  { title: '10. Get Token #48', description: 'Ravi gets token 48 and can see the live queue.', role: 'farmer', route: '/farmer/queue', tip: 'Show the queue — 7 farmers ahead, ~30 min wait. Use "Simulate Queue Progress" button.' },
  { title: '11. Queue Advances', description: 'Click simulate — queue moves from 41 to 42, 43, 44. Notifications sent.', role: 'farmer', route: '/farmer/queue', tip: 'Each click advances the queue and generates a notification for the next farmer.' },
  { title: '12. Officer Processes', description: 'Switch to Procurement Officer — verify, weigh, quality check, complete.', role: 'procurement_officer', route: '/procurement', tip: 'Use the Officer dashboard to advance procurement status through each step.' },
  { title: '13. Payment Tracked', description: 'Payment of ₹25,000 is initiated and tracked.', role: 'farmer', route: '/farmer/payments', tip: 'Show how the procurement payment appears alongside marketplace payments.' },
  { title: '14. Admin Analytics', description: 'Admin sees platform-wide stats — farmers, orders, wait time improvements.', role: 'admin', route: '/admin', tip: 'Show the dashboard with charts — wait time dropped from 55 min to 28 min.' },
];

const allSteps = [...scenarioA, ...scenarioB];

export default function DemoWalkthrough() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<'A' | 'B' | 'all'>('all');
  const { login } = useAuth();
  const navigate = useNavigate();

  const steps = activeScenario === 'A' ? scenarioA : activeScenario === 'B' ? scenarioB : allSteps;
  const step = steps[currentStep];

  const goToStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return;
    setCurrentStep(idx);
    const s = steps[idx];
    login(s.role);
    navigate(s.route);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-all z-50 flex items-center gap-2 text-sm font-semibold"
      >
        🎯 Demo Walkthrough
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">🎯 Demo Walkthrough</h3>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-lg">✕</button>
        </div>
        {/* Scenario Tabs */}
        <div className="flex gap-1 mt-3">
          {(['all', 'A', 'B'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setActiveScenario(s); setCurrentStep(0); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeScenario === s ? 'bg-white text-primary-700' : 'text-white/70 hover:bg-white/20'
              }`}
            >
              {s === 'all' ? 'Full Demo' : s === 'A' ? 'Scenario A (Marketplace)' : 'Scenario B (Procurement)'}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs text-gray-500 capitalize">Role: {step.role.replace('_', ' ')}</span>
        </div>
        <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 font-medium">💡 Presenter Tip:</p>
          <p className="text-xs text-amber-600 mt-0.5">{step.tip}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => goToStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-primary-500' : i < currentStep ? 'bg-primary-200' : 'bg-gray-200'}`} />
            ))}
          </div>
          <button
            onClick={() => goToStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
