
import React, { useState } from 'react';
import { Copy, Sparkles, Send, Check, Mail, Phone, Facebook, Youtube } from 'lucide-react';
import { generateMarketingContent } from '../services/gemini';

const LeadPack: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [niche, setNiche] = useState('Roofing');
  const [topic, setTopic] = useState('Missed Calls Costing Money');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await generateMarketingContent(niche, topic);
      setAiContent(content);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-[#1E2A38]">Apex Marketing Agent (MIA)</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Generate high-impact content to attract roofers and plumbers to your AI agency. Powered by Gemini.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
             <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Niche</label>
               <select 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-gray-50 border rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option>Roofing</option>
                 <option>Plumbing</option>
                 <option>HVAC</option>
                 <option>Contractors</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Topic / Hook</label>
               <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Roof leaks at night"
                className="w-full bg-gray-50 border rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
             <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#1479FF] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50"
             >
               {isGenerating ? <LoaderIcon className="animate-spin" /> : <Sparkles size={18} />}
               Generate Pack
             </button>
          </div>
        </div>

        {/* AI Results */}
        <div className="lg:col-span-3">
          {aiContent ? (
            <div className="grid md:grid-cols-1 gap-6">
              <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#1479FF]">
                  <Youtube size={24} />
                  <h3 className="font-bold text-xl uppercase tracking-tight">TikTok / Reel Script</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl relative font-medium leading-relaxed italic text-gray-700">
                  {aiContent.tiktokScript}
                  <button 
                    onClick={() => handleCopy(aiContent.tiktokScript, 'tiktok')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#1479FF]"
                  >
                    {copied === 'tiktok' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[#1479FF] pt-4">
                  <Mail size={24} />
                  <h3 className="font-bold text-xl uppercase tracking-tight">Cold Email</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl relative">
                  <div className="text-xs text-gray-400 font-bold uppercase mb-2">Subject Line:</div>
                  <div className="font-bold text-gray-800 mb-4">{aiContent.emailSubject}</div>
                  <button 
                    onClick={() => handleCopy(aiContent.emailSubject, 'email')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#1479FF]"
                  >
                     {copied === 'email' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[#1479FF] pt-4">
                  <Facebook size={24} />
                  <h3 className="font-bold text-xl uppercase tracking-tight">Facebook Group Post</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl relative text-gray-700 leading-relaxed">
                  {aiContent.facebookPost}
                  <button 
                    onClick={() => handleCopy(aiContent.facebookPost, 'facebook')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#1479FF]"
                  >
                     {copied === 'facebook' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
             <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
               <Sparkles size={48} className="mb-4 opacity-50" />
               <p className="font-bold">Enter a niche and click Generate to build your Lead Pack.</p>
               <p className="text-sm italic mt-2 max-w-sm">MIA will use real market drivers to write content that sells.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);

export default LeadPack;
