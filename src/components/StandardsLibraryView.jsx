import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FileText, 
  Filter, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { MOCK_STANDARDS, MOCK_CATEGORIES } from '../data/mockData';

export default function StandardsLibraryView({ onAddToSpec, onAddToCompare }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [expandedCats, setExpandedCats] = useState({ food: true, civil: true });
  const [selectedStandard, setSelectedStandard] = useState(MOCK_STANDARDS[0]);

  const toggleCatExpand = (catId) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const filteredStandards = MOCK_STANDARDS.filter(std => {
    // Category match
    if (selectedCatId !== 'all') {
      const catObj = MOCK_CATEGORIES.find(c => c.id === selectedCatId);
      if (catObj && std.industry !== catObj.name) return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return std.code.toLowerCase().includes(q) ||
             std.title.toLowerCase().includes(q) ||
             std.scope.toLowerCase().includes(q) ||
             std.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#003366]" />
            <span>BIS & International Standards Catalog</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore 2,500+ Indian Standards (IS), ISO codes, and Quality Control Order (QCO) mandatory guidelines.
          </p>
        </div>

        {/* Global Catalog Search Box */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search standard code, title, material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#003366] outline-none"
          />
        </div>
      </div>

      {/* TWO PANEL MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: CATEGORY NAVIGATION (3 of 12 = 25%) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
            Browse by Sector
          </div>

          <div className="space-y-1 text-xs">
            {MOCK_CATEGORIES.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              const hasSub = cat.sub && cat.sub.length > 0;
              const isExpanded = expandedCats[cat.id];

              return (
                <div key={cat.id} className="space-y-1">
                  <div 
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      if (hasSub) toggleCatExpand(cat.id);
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                      isSelected 
                        ? 'bg-[#003366] text-white font-bold' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Folder className="w-4 h-4 shrink-0 text-[#FFB81C]" />
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] opacity-75 font-mono">({cat.count})</span>
                  </div>

                  {/* Subcategories Tree */}
                  {hasSub && isExpanded && (
                    <div className="pl-6 space-y-1 border-l-2 border-slate-200 ml-3">
                      {cat.sub.map((subName, i) => (
                        <div 
                          key={i}
                          onClick={() => setSelectedCatId(cat.id)}
                          className="py-1 px-2 text-[11px] text-slate-600 hover:text-[#003366] cursor-pointer hover:font-bold transition"
                        >
                          • {subName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER TABLE & DETAILS (9 of 12 = 75%) */}
        <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* TABLE AREA (7 of 9 = 58.3%) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">
              <span>Showing {filteredStandards.length} Standards</span>
              <span className="text-slate-400">Click row for full specification</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Standard Title</th>
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStandards.map((std) => {
                    const isSelected = selectedStandard?.id === std.id;
                    return (
                      <tr 
                        key={std.id}
                        onClick={() => setSelectedStandard(std)}
                        className={`cursor-pointer transition ${
                          isSelected ? 'bg-blue-50/80 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-[#003366] whitespace-nowrap">
                          {std.code}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900 leading-snug line-clamp-1">{std.title}</div>
                          <div className="text-[10px] text-slate-400">{std.category}</div>
                        </td>
                        <td className="py-3 px-3 font-mono whitespace-nowrap">{std.publishedYear}</td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            std.status === 'MANDATORY' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {std.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INSPECTOR DRAWER (5 of 9 = 41.7%) */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 sticky top-24">
            {selectedStandard ? (
              <>
                <div className="border-b border-slate-100 pb-3 space-y-1">
                  <span className="font-mono font-black text-xs text-[#003366] bg-blue-50 px-2 py-0.5 rounded">
                    {selectedStandard.code}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug mt-1">
                    {selectedStandard.title}
                  </h3>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wide block">Scope:</span>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed text-[11px]">
                    {selectedStandard.scope}
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wide block">Mandatory Parameters:</span>
                  <ul className="space-y-1">
                    {selectedStandard.keyRequirements.map((r, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onAddToSpec(selectedStandard)}
                    className="w-full bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-bold py-2 rounded text-xs shadow-sm transition cursor-pointer"
                  >
                    + Add to Tender Specification
                  </button>
                  <button
                    onClick={() => onAddToCompare(selectedStandard)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded text-xs transition border border-slate-300 cursor-pointer"
                  >
                    + Add to Comparison Matrix
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">
                Select a standard from the catalog table to inspect details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
