import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import DemoWalkthrough from './components/DemoWalkthrough';

// Public
import LandingPage from './pages/LandingPage';
import DemoLogin from './pages/DemoLogin';

// Farmer
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerProfile from './pages/farmer/FarmerProfile';
import MyProduce from './pages/farmer/MyProduce';
import Marketplace from './pages/farmer/Marketplace';
import SmartSell from './pages/farmer/SmartSell';
import GovProcurement from './pages/farmer/GovProcurement';
import FarmerOrders from './pages/farmer/FarmerOrders';
import Queue from './pages/farmer/Queue';
import FarmerPayments from './pages/farmer/FarmerPayments';

// Buyer
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerMarketplace from './pages/buyer/BuyerMarketplace';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerLogistics from './pages/buyer/BuyerLogistics';
import BuyerProfile from './pages/buyer/BuyerProfile';

// Procurement Officer
import ProcDashboard from './pages/procurement/ProcDashboard';
import ProcQueue from './pages/procurement/ProcQueue';
import ProcSlots from './pages/procurement/ProcSlots';
import ProcVerify from './pages/procurement/ProcVerify';
import ProcProcess from './pages/procurement/ProcProcess';
import ProcPayments from './pages/procurement/ProcPayments';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminFarmers from './pages/admin/AdminFarmers';
import AdminBuyers from './pages/admin/AdminBuyers';
import AdminMarketplace from './pages/admin/AdminMarketplace';
import AdminProcurement from './pages/admin/AdminProcurement';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPayments from './pages/admin/AdminPayments';
import AdminMap from './pages/admin/AdminMap';

// Shared
import Notifications from './pages/shared/Notifications';
import BuyerPayments from './pages/shared/Payments';
import DemandForecast from './pages/shared/DemandForecast';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<DemoLogin />} />
            <Route path="/demo" element={<DemoLogin />} />

            {/* Farmer */}
            <Route path="/farmer" element={<Layout><FarmerDashboard /></Layout>} />
            <Route path="/farmer/profile" element={<Layout><FarmerProfile /></Layout>} />
            <Route path="/farmer/produce" element={<Layout><MyProduce /></Layout>} />
            <Route path="/farmer/marketplace" element={<Layout><Marketplace /></Layout>} />
            <Route path="/farmer/smart-sell" element={<Layout><SmartSell /></Layout>} />
            <Route path="/farmer/procurement" element={<Layout><GovProcurement /></Layout>} />
            <Route path="/farmer/orders" element={<Layout><FarmerOrders /></Layout>} />
            <Route path="/farmer/queue" element={<Layout><Queue /></Layout>} />
            <Route path="/farmer/payments" element={<Layout><FarmerPayments /></Layout>} />
            <Route path="/farmer/notifications" element={<Layout><Notifications /></Layout>} />

            {/* Buyer */}
            <Route path="/buyer" element={<Layout><BuyerDashboard /></Layout>} />
            <Route path="/buyer/marketplace" element={<Layout><BuyerMarketplace /></Layout>} />
            <Route path="/buyer/orders" element={<Layout><BuyerOrders /></Layout>} />
            <Route path="/buyer/logistics" element={<Layout><BuyerLogistics /></Layout>} />
            <Route path="/buyer/payments" element={<Layout><BuyerPayments /></Layout>} />
            <Route path="/buyer/profile" element={<Layout><BuyerProfile /></Layout>} />

            {/* Procurement Officer */}
            <Route path="/procurement" element={<Layout><ProcDashboard /></Layout>} />
            <Route path="/procurement/queue" element={<Layout><ProcQueue /></Layout>} />
            <Route path="/procurement/slots" element={<Layout><ProcSlots /></Layout>} />
            <Route path="/procurement/verify" element={<Layout><ProcVerify /></Layout>} />
            <Route path="/procurement/process" element={<Layout><ProcProcess /></Layout>} />
            <Route path="/procurement/payments" element={<Layout><ProcPayments /></Layout>} />

            {/* Admin */}
            <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/analytics" element={<Layout><AdminAnalytics /></Layout>} />
            <Route path="/admin/farmers" element={<Layout><AdminFarmers /></Layout>} />
            <Route path="/admin/buyers" element={<Layout><AdminBuyers /></Layout>} />
            <Route path="/admin/marketplace" element={<Layout><AdminMarketplace /></Layout>} />
            <Route path="/admin/procurement" element={<Layout><AdminProcurement /></Layout>} />
            <Route path="/admin/orders" element={<Layout><AdminOrders /></Layout>} />
            <Route path="/admin/payments" element={<Layout><AdminPayments /></Layout>} />
            <Route path="/admin/map" element={<Layout><AdminMap /></Layout>} />

            {/* Shared */}
            <Route path="/demand" element={<Layout><DemandForecast /></Layout>} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
      {/* Demo Walkthrough - shown on all authenticated pages */}
          {['/farmer', '/buyer', '/procurement', '/admin'].some(p => window.location.pathname.startsWith(p)) && <DemoWalkthrough />}
    </BrowserRouter>
  );
}
