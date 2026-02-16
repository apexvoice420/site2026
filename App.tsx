
import React, { useState } from 'react';
import { AppView } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import DemoSandbox from './components/DemoSandbox';
import Dashboard from './components/Dashboard';
import Dashboard from './components/Dashboard';
// import LeadPack from './components/LeadPack';
import Pricing from './components/Pricing';
import Login from './components/Login';

const SetupGuide = () => (
  <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
    <h1 className="text-4xl font-extrabold">Technical Setup Guide</h1>
    <div className="space-y-8">
      {[
        { step: 1, title: 'Create Vapi Account', desc: 'Sign up for Vapi.ai and purchase a phone number directly from their dashboard.' },
        { step: 2, title: 'Deploy Vapi Agent', desc: 'Import the Cora Receptionist agent and assign your Vapi number.' },
        { step: 3, title: 'Setup Google Sheets', desc: 'Duplicate the Apex Master CRM template and set restricted sharing.' },
        { step: 4, title: 'Activate n8n Flow', desc: 'Import our JSON workflow, set your credentials, and you are live.' }
      ].map((s, i) => (
        <div key={i} className="flex gap-6 items-start p-8 bg-white border rounded-3xl shadow-sm">
          <div className="bg-[#1479FF] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {s.step}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage setView={setView} />;
      case AppView.DEMO:
        return <DemoSandbox />;
      case AppView.PRICING:
        return <Pricing />;
      case AppView.LOGIN:
        return <Login />;
      case AppView.DASHBOARD:
        return <Dashboard />;
      // case AppView.LEAD_PACK:
      //   return <LeadPack />;
      case AppView.SETUP:
        return <SetupGuide />;
      default:
        return <LandingPage setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar currentView={view} setView={setView} />
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Global Persistent CTA (Only on Dashboard/Demo/Pack) */}
      {view !== AppView.LANDING && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => setView(AppView.SETUP)}
            className="bg-[#1E2A38] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-[#1479FF] transition-all flex items-center gap-2 border border-white/10"
          >
            Go Live Now 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
