
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, PhoneIncoming, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Mon', calls: 24, booked: 8 },
  { name: 'Tue', calls: 18, booked: 5 },
  { name: 'Wed', calls: 35, booked: 12 },
  { name: 'Thu', calls: 27, booked: 9 },
  { name: 'Fri', calls: 42, booked: 15 },
  { name: 'Sat', calls: 15, booked: 4 },
  { name: 'Sun', calls: 10, booked: 3 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E2A38]">Welcome back, Maurice</h1>
          <p className="text-gray-500">Here's how Apex Voice is performing for your business.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-white border rounded-lg px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Calls', val: '171', icon: <PhoneIncoming />, change: '+12%', color: 'blue' },
          { label: 'Jobs Booked', val: '56', icon: <Clock />, change: '+8%', color: 'green' },
          { label: 'New Leads', val: '92', icon: <Users />, change: '+18%', color: 'purple' },
          { label: 'Missed Calls Saved', val: '100%', icon: <TrendingUp />, change: 'Stable', color: 'orange' }
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl bg-${m.color}-50 text-${m.color}-600`}>
                {m.icon}
              </div>
              <div className={`flex items-center text-xs font-bold ${m.change.startsWith('+') ? 'text-green-500' : 'text-gray-400'}`}>
                {m.change} {m.change.startsWith('+') ? <ArrowUpRight size={14} /> : null}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">{m.label}</div>
              <div className="text-3xl font-extrabold text-[#1E2A38]">{m.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Call Volume & Conversions</h3>
            <div className="flex gap-4 text-xs font-bold uppercase">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#1479FF]"></div> Calls</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-400"></div> Booked</div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="calls" fill="#1479FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="booked" fill="#4ADE80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
           <h3 className="font-bold text-lg mb-8 text-[#1E2A38]">Recent Transcripts Analysis</h3>
           <div className="space-y-4">
             {[
               { name: 'John Peterson', time: '2 mins ago', issue: 'Roof Leak', urgency: 'High', color: 'red' },
               { name: 'Sarah Miller', time: '1 hour ago', issue: 'Drain Clog', urgency: 'Normal', color: 'blue' },
               { name: 'Unknown Caller', time: '3 hours ago', issue: 'HVAC Inquiry', urgency: 'Low', color: 'gray' },
               { name: 'Mike Ross', time: '5 hours ago', issue: 'Sump Pump', urgency: 'High', color: 'red' }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-full border flex items-center justify-center font-bold text-xs">
                     {item.name.charAt(0)}
                   </div>
                   <div>
                     <div className="font-bold text-sm">{item.name}</div>
                     <div className="text-[10px] text-gray-400 font-bold uppercase">{item.issue} • {item.time}</div>
                   </div>
                 </div>
                 <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded bg-${item.color}-50 text-${item.color}-600 border border-${item.color}-100`}>
                   {item.urgency}
                 </span>
               </div>
             ))}
             <button className="w-full text-center text-[#1479FF] text-sm font-bold pt-2">View All Logs</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
