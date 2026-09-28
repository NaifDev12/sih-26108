import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Video, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Bell,
  Eye,
  ExternalLink,
  PlayCircle
} from 'lucide-react';

export default function HelpAndSupportView() {
  const [activeTab, setActiveTab] = useState('faq'); // faq, videos, chatbot, settings
  const [openFaqId, setOpenFaqId] = useState(1);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! I am the DoCIA AI Procurement Assistant. How can I assist you with Indian Standards (IS), QCO compliance, or tender specification drafting today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const videoTutorials = [
    {
      id: 1,
      title: "How to Generate Standards Recommendations from Tender PDFs",
      duration: "4 mins",
      tag: "DoCIA Training",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Step-by-step walkthrough of uploading procurement documents and analyzing IS codes."
    },
    {
      id: 2,
      title: "Using the Side-by-Side Standards Comparison Matrix",
      duration: "3 mins",
      tag: "Best Practices",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Learn how to highlight technical differences and test protocols across multiple standards."
    },
    {
      id: 3,
      title: "Drafting Official BIS Tender Specifications with AI Drafter",
      duration: "5 mins",
      tag: "Specification Builder",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Auto-compile QCO mandatory legal notices and export formatted .DOCX & .PDF documents."
    },
    {
      id: 4,
      title: "Understanding Quality Control Orders (QCO) & BIS Licensing",
      duration: "6 mins",
      tag: "Compliance Guide",
      url: "https://bis.gov.in",
      description: "Overview of Department for Promotion of Industry and Internal Trade (DPIIT) QCO mandates."
    }
  ];

  const faqs = [
    {
      id: 1,
      q: "What is a Quality Control Order (QCO) and how does it affect government tender evaluation?",
      a: "A Quality Control Order (QCO) issued by government ministries (e.g. DPIIT, Ministry of Steel, Ministry of Textiles) renders specific Indian Standards (IS) legally mandatory for manufacturing, import, and procurement. Products under QCO MUST bear the mandatory BIS ISI mark; uncertified tenders must be rejected during technical evaluation."
    },
    {
      id: 2,
      q: "How does the AI Recommendation Engine extract standards from raw text or PDFs?",
      a: "The engine uses Natural Language Processing (NLP) models trained on 2,500+ Indian & International Standards schemas. It analyzes material compositions, voltage ratings, pressure parameters, and safety requirements in your description to map exact IS codes."
    },
    {
      id: 3,
      q: "Can I export specifications directly to Microsoft Word (.docx) or PDF format?",
      a: "Yes! The Specification Builder compiles standard clauses, test protocols, and QCO legal notices into official government tender layout downloadable as formatted .docx or .pdf files."
    },
    {
      id: 4,
      q: "How often is the Bureau of Indian Standards (BIS) database updated in e-Standards?",
      a: "The database is synchronized on a monthly basis with BIS official gazette notifications, ensuring all amendments, revisions, and new QCO mandates are reflected immediately."
    }
  ];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // AI bot reply simulation
    setTimeout(() => {
      let botReply = "Thank you for asking. Based on BIS guidelines, please ensure your tender specifies mandatory ISI Mark certification under the relevant QCO.";
      if (userText.toLowerCase().includes("pipe") || userText.toLowerCase().includes("hdpe")) {
        botReply = "For HDPE potable water pipes, specify IS 4984:2016 (PE 100 grade) with mandatory hydrostatic strength testing at 80°C.";
      } else if (userText.toLowerCase().includes("steel") || userText.toLowerCase().includes("utensil")) {
        botReply = "Food-grade stainless steel utensils require IS 1234:2023 with Ra <= 0.4 µm surface roughness and FSSAI heavy metal migration compliance.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#003366]" />
            <span>Help, Video Tutorials & Documentation</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Video training guides, procurement FAQs, AI Assistant support, and accessibility controls.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'faq' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FAQs & Video Tutorials
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'chatbot' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Assistant Chatbot
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'settings' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Settings & Accessibility
          </button>
        </div>
      </div>

      {activeTab === 'faq' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Accordion (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#003366]" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full text-left p-4 font-bold text-xs text-slate-900 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#003366]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Tutorials Sidebar with Clickable Video Links (1 Col) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-[#E67E00]" />
              <span>Clickable Video Tutorials</span>
            </h3>

            <div className="space-y-3 text-xs">
              {videoTutorials.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-slate-50 hover:bg-blue-50/80 rounded-lg border border-slate-200 hover:border-blue-400 transition group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-800 group-hover:text-[#003366] transition flex items-start gap-1.5">
                      <PlayCircle className="w-4 h-4 text-[#E67E00] shrink-0 mt-0.5 group-hover:scale-110 transition" />
                      <span>{video.title}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003366] shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="bg-blue-100 text-[#003366] px-2 py-0.5 rounded font-bold">{video.tag}</span>
                    <span className="text-slate-400 font-mono">Duration: {video.duration}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chatbot' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 max-w-3xl mx-auto space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-full bg-[#003366] text-[#FFB81C] flex items-center justify-center font-bold">
              AI
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">DoCIA Standards AI Assistant</h3>
              <p className="text-[11px] text-slate-500">Ask any question regarding BIS standards, QCO compliance, or test methods</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md p-3 rounded-xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#003366] text-white rounded-br-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none font-sans'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendChat} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about IS 1234, HDPE pipes, QCO orders..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] outline-none"
            />
            <button
              type="submit"
              className="bg-[#003366] hover:bg-blue-900 text-white p-3 rounded-lg font-bold shadow transition cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#FFB81C]" />
            </button>
          </form>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            User Preferences & Accessibility Controls
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">High Contrast UI Mode (WCAG AAA)</div>
                <div className="text-slate-500">Increases visual distinction for government accessibility standards</div>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#003366]" />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <div className="font-bold text-slate-800">Email Alerts on BIS Amendments</div>
                <div className="text-slate-500">Receive instant updates when saved standards issue new revisions</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#003366]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
