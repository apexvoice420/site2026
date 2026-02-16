
import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, Loader2, Info, RefreshCcw } from 'lucide-react';
import { Lead } from '../types';

const DemoSandbox: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callPhase, setCallPhase] = useState<number>(0);
  const [demoLeads, setDemoLeads] = useState<Lead[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const callScripts = [
    { text: "Thanks for calling Apex Voice Solutions, this is Ava. How can I help you today?", role: "Ava" },
    { text: "Hi, I have a burst pipe in my basement, it's flooding!", role: "Customer" },
    { text: "I'm sorry to hear that. Is water spreading right now?", role: "Ava" },
    { text: "Yes, it's getting everywhere!", role: "Customer" },
    { text: "Okay, I'm flagging this as an emergency. Can I get your name and address?", role: "Ava" },
    { text: "I'm John Doe at 123 Main St, New York.", role: "Customer" },
    { text: "Got it John. I've notified the on-call technician. Help is on the way.", role: "Ava" }
  ];

  const startDemo = () => {
    setIsSimulating(true);
    setIsCalling(true);
    setCallPhase(0);
  };

  useEffect(() => {
    if (isCalling && callPhase < callScripts.length) {
      const timer = setTimeout(() => {
        setCallPhase(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isCalling && callPhase >= callScripts.length) {
      const finishCall = async () => {
        setIsCalling(false);
        const newLead: Lead = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          name: "John Doe",
          phone: "555-0123",
          service: "Plumbing",
          urgency: "Urgent",
          status: "New",
          summary: "Burst pipe in basement. Customer is John Doe at 123 Main St. Emergency flag triggered."
        };
        setDemoLeads(prev => [newLead, ...prev]);
        setIsSimulating(false);
      };
      finishCall();
    }
  }, [isCalling, callPhase]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Phone UI */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-800 aspect-[9/18.5] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-gray-800 rounded-b-3xl z-20"></div>
            
            <div className="flex-grow flex flex-col items-center justify-center text-white space-y-6 px-6">
              {!isCalling ? (
                <div className="text-center space-y-8">
                  <div className="w-24 h-24 bg-[#1479FF] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
                    <Phone className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Apex Demo Line</h2>
                    <p className="text-gray-400 text-sm">Experience the AI Receptionist</p>
                  </div>
                  <button 
                    disabled={isSimulating}
                    onClick={startDemo}
                    className="bg-[#1479FF] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
                  >
                    {isSimulating ? <Loader2 className="animate-spin" /> : "Start Test Call"}
                  </button>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    * This is a simulated demo environment
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col h-full pt-12">
                  <div className="text-center mb-8">
                    <div className="text-[#1479FF] text-xs font-bold uppercase tracking-widest mb-1">Live Call Simulation</div>
                    <div className="text-xl font-bold">Ava Receptionist</div>
                    <div className="text-xs text-green-500 font-mono mt-1">00:{callPhase < 10 ? `0${callPhase}` : callPhase}</div>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto space-y-4 scroll-smooth pr-2 custom-scrollbar">
                    {callScripts.slice(0, callPhase + 1).map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'Ava' ? 'items-start' : 'items-end'}`}>
                        <span className="text-[10px] font-bold text-gray-500 mb-1 px-1 uppercase">{msg.role}</span>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] ${
                          msg.role === 'Ava' ? 'bg-[#1479FF] text-white rounded-tl-none' : 'bg-gray-700 text-white rounded-tr-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="py-8 flex justify-center">
                    <button 
                      onClick={() => setIsCalling(false)}
                      className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                    >
                      <Phone className="rotate-[135deg] text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live CRM Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1E2A38]">Live Demo CRM</h2>
                <p className="text-gray-500 text-sm">Watch the leads flow in from the demo calls.</p>
              </div>
              <div className="flex gap-2">
                 <button className="flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold border hover:bg-gray-100 transition-all">
                  <RefreshCcw size={16} /> Refresh
                </button>
                <div className="flex items-center gap-2 bg-blue-50 text-[#1479FF] px-4 py-2 rounded-lg text-sm font-bold border border-blue-100">
                  <div className="w-2 h-2 rounded-full bg-[#1479FF] animate-pulse"></div>
                  SYSTEM ONLINE
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-4">Timestamp</th>
                    <th className="pb-4">Caller</th>
                    <th className="pb-4">Service</th>
                    <th className="pb-4">Urgency</th>
                    <th className="pb-4">Summary</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {demoLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-gray-400 italic">
                        No demo calls yet. Start a call on the left to see magic happen.
                      </td>
                    </tr>
                  ) : (
                    demoLeads.map((lead) => (
                      <tr key={lead.id} className="text-sm hover:bg-gray-50 transition-colors group">
                        <td className="py-5 font-medium text-gray-500">{lead.timestamp}</td>
                        <td className="py-5 font-bold text-[#1E2A38]">{lead.name}</td>
                        <td className="py-5">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                            lead.service === 'Roofing' ? 'border-orange-100 text-orange-600 bg-orange-50' : 'border-blue-100 text-[#1479FF] bg-blue-50'
                          }`}>
                            {lead.service}
                          </span>
                        </td>
                        <td className="py-5">
                           <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                            lead.urgency === 'Urgent' ? 'border-red-100 text-red-600 bg-red-50' : 'border-gray-100 text-gray-600 bg-gray-50'
                          }`}>
                            {lead.urgency}
                          </span>
                        </td>
                        <td className="py-5 max-w-xs truncate text-gray-500">{lead.summary}</td>
                        <td className="py-5">
                          <div className="flex items-center gap-2 text-green-600 font-bold">
                            <CheckCircle2 size={16} /> LOGGED
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="bg-[#1479FF] p-2 rounded-lg text-white">
                <Info size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#1E2A38] text-sm">How it works:</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  As soon as the call hangs up, the <strong>Vapi Webhook</strong> fires data to our <strong>n8n automation</strong>. 
                  n8n parses the intent and summary, then appends a new row to this CRM automatically. 
                  In a real scenario, this row would trigger an <strong>Instant SMS</strong> to the business owner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSandbox;
