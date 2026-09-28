import React, { useState } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import RecommendationEngineView from './components/RecommendationEngineView';
import ComparisonToolView from './components/ComparisonToolView';
import SpecificationBuilderView from './components/SpecificationBuilderView';
import StandardsLibraryView from './components/StandardsLibraryView';
import MySpecificationsView from './components/MySpecificationsView';
import AdminDashboardView from './components/AdminDashboardView';
import HelpAndSupportView from './components/HelpAndSupportView';
import { MOCK_STANDARDS } from './data/mockData';
import { TRANSLATIONS } from './data/translations';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // User Account Role State: 'user' (Procurement Officer) vs 'admin' (DoCIA System Admin)
  const [userRole, setUserRole] = useState('user');

  // Multilingual Language State: 'English' | 'Hindi' | 'Tamil' | 'Malayalam'
  const [currentLang, setCurrentLang] = useState('English');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.English;

  // Shared state for comparison matrix
  const [compareStandards, setCompareStandards] = useState([
    MOCK_STANDARDS[0],
    MOCK_STANDARDS[1]
  ]);

  // Shared state for specification builder queue
  const [specStandards, setSpecStandards] = useState([
    MOCK_STANDARDS[0],
    MOCK_STANDARDS[1]
  ]);

  // Handler: Add to Specification Queue
  const handleAddToSpec = (std) => {
    if (!specStandards.some(s => s.id === std.id)) {
      setSpecStandards(prev => [...prev, std]);
    }
  };

  // Handler: Remove from Specification Queue
  const handleRemoveFromSpec = (stdId) => {
    setSpecStandards(prev => prev.filter(s => s.id !== stdId));
  };

  // Handler: Add to Comparison Queue
  const handleAddToCompare = (std) => {
    if (!compareStandards.some(s => s.id === std.id)) {
      if (compareStandards.length >= 4) {
        alert("You can compare up to 4 standards side-by-side.");
        return;
      }
      setCompareStandards(prev => [...prev, std]);
      setCurrentView('compare');
    } else {
      setCurrentView('compare');
    }
  };

  // Handler: Remove from Comparison Queue
  const handleRemoveFromCompare = (stdId) => {
    setCompareStandards(prev => prev.filter(s => s.id !== stdId));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased">
      {/* Global Header */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {currentView === 'dashboard' && (
          <DashboardView 
            setCurrentView={setCurrentView}
            currentLang={currentLang}
          />
        )}

        {currentView === 'recommendation' && (
          <RecommendationEngineView 
            onAddToSpec={handleAddToSpec}
            onAddToCompare={handleAddToCompare}
            selectedCompareIds={compareStandards.map(s => s.id)}
            currentLang={currentLang}
          />
        )}

        {currentView === 'compare' && (
          <ComparisonToolView 
            compareStandards={compareStandards}
            onRemoveFromCompare={handleRemoveFromCompare}
            onAddMoreClick={() => setCurrentView('library')}
            onBackToEngine={() => setCurrentView('recommendation')}
          />
        )}

        {currentView === 'builder' && (
          <SpecificationBuilderView 
            specStandards={specStandards}
            onRemoveFromSpec={handleRemoveFromSpec}
            onAddMoreStandards={() => setCurrentView('recommendation')}
          />
        )}

        {currentView === 'library' && (
          <StandardsLibraryView 
            onAddToSpec={handleAddToSpec}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {currentView === 'my-specs' && (
          <MySpecificationsView 
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboardView />
        )}

        {currentView === 'help' && (
          <HelpAndSupportView />
        )}
      </main>

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#FFB81C]" />
              <span>Ministry of Consumer Affairs</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Department of Consumer Affairs (DoCIA), Government of India. Smart AI Automation for Procurement & BIS Standards Identification.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs mb-2 uppercase tracking-wider">Government Portals</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li><a href="https://bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">Bureau of Indian Standards (BIS) <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://gem.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">Government e-Marketplace (GeM) <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">Department of Consumer Affairs <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs mb-2 uppercase tracking-wider">Features</h4>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li><button onClick={() => setCurrentView('recommendation')} className="hover:text-white">{t.recommendation}</button></li>
              <li><button onClick={() => setCurrentView('compare')} className="hover:text-white">{t.compare}</button></li>
              <li><button onClick={() => setCurrentView('builder')} className="hover:text-white">{t.builder}</button></li>
              <li><button onClick={() => setCurrentView('library')} className="hover:text-white">{t.library}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs mb-2 uppercase tracking-wider">Compliance & Security</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Designed in compliance with WCAG 2.1 AA Accessibility & Government of India Web Guidelines (GIGW).
            </p>
            <div className="mt-3 text-[10px] text-slate-500 font-mono">
              System Version 2.4.0-AI | Operational 2026
            </div>
          </div>
        </div>

        <div className="bg-slate-950 py-3 px-4 text-center text-[11px] text-slate-500 border-t border-slate-900">
          © 2026 Ministry of Consumer Affairs, Food & Public Distribution | All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
