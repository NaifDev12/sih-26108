import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Filter, 
  Search, 
  Sliders, 
  CheckCircle2, 
  ShieldAlert, 
  ExternalLink, 
  Plus, 
  Grid, 
  List, 
  X, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  FileCheck,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Info
} from 'lucide-react';
import { MOCK_STANDARDS, MOCK_CATEGORIES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function RecommendationEngineView({ 
  onAddToSpec, 
  onAddToCompare, 
  selectedCompareIds = [],
  currentLang = 'English'
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.English;

  // Input State
  const [description, setDescription] = useState(
    "Stainless steel food-grade storage containers, 20L capacity, suitable for storage of dairy products in institutional public procurement."
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Filters State
  const [standardType, setStandardType] = useState('ALL'); // ALL, IS, ISO, MANDATORY
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [latestVersionOnly, setLatestVersionOnly] = useState(true);
  const [relevanceThreshold, setRelevanceThreshold] = useState(70);
  const [resultLimit, setResultLimit] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Scope filters
  const [scopes, setScopes] = useState({
    product: true,
    test: true,
    safety: true,
    installation: true,
    certification: true
  });

  // Display & Selection State
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'code', 'date'
  const [selectedStandard, setSelectedStandard] = useState(MOCK_STANDARDS[0]);
  const [addedSpecSuccess, setAddedSpecSuccess] = useState(null);

  // Sample Presets
  const samplePresets = [
    {
      title: "Food Stainless Steel",
      text: "Stainless steel food-grade storage containers, 20L capacity, suitable for storage of dairy products in institutional public procurement."
    },
    {
      title: "HDPE Water Pipe",
      text: "High-density polyethylene (HDPE) pressure pipes, 110mm diameter, PE 100 grade for municipal drinking water supply scheme."
    },
    {
      title: "Electrical Cable",
      text: "Single core copper conductor FRLS PVC insulated flexible electric power cables 1.1kV for government building wiring."
    },
    {
      title: "Structural Steel",
      text: "Hot rolled medium tensile E250 structural steel beams, angles, and plates for bridge girder construction."
    }
  ];

  // Handle File Upload Simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      });
      // Extract text simulation
      setDescription(`[Extracted from ${file.name}]: High-grade HDPE PE-100 potable water distribution pipeline requirements with hydrostatic strength test specs.`);
    }
  };

  // Run Recommendation AI Engine
  const handleGetRecommendations = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 800);
  };

  // Filtered and Sorted Standards
  const filteredStandards = useMemo(() => {
    return MOCK_STANDARDS.filter(std => {
      // Relevance threshold
      if (std.relevance < relevanceThreshold) return false;

      // Standard Type filter
      if (standardType === 'IS' && !std.code.startsWith('IS')) return false;
      if (standardType === 'ISO' && !std.alliedStandards.some(s => s.startsWith('ISO'))) return false;
      if (standardType === 'MANDATORY' && std.status !== 'MANDATORY') return false;

      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = MOCK_CATEGORIES.find(c => c.id === selectedCategory);
        if (catObj && std.industry !== catObj.name) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'relevance') return b.relevance - a.relevance;
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'date') return b.publishedYear - a.publishedYear;
      return 0;
    }).slice(0, resultLimit);
  }, [standardType, selectedCategory, relevanceThreshold, resultLimit, description, sortBy]);

  const handleAddSpecClick = (std) => {
    onAddToSpec(std);
    setAddedSpecSuccess(std.id);
    setTimeout(() => setAddedSpecSuccess(null), 2500);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E67E00]" />
            <span>{t.recommendation}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Extract and identify applicable BIS Indian Standards, test parameters, and QCO mandatory requirements.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setDescription(preset.text)}
                className="text-[11px] bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-[#003366] px-2.5 py-1 rounded border border-slate-200 font-medium transition"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* THREE PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT PANEL - INPUT & FILTERS (3 of 12 columns = 25%) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-5">
          {/* Section A: Description Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {t.productSpecsLabel}
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {description.length}/2000
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g. 'Stainless steel food-grade storage containers, 20L capacity...'"
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366] outline-none transition bg-slate-50 focus:bg-white"
            />
            <p className="text-[11px] text-slate-500 italic">
              Be specific about materials, voltage, dimensions, or usage parameters.
            </p>
          </div>

          {/* Section B: File Upload */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
              <span>{t.uploadTenderPDF}</span>
              <span className="text-[10px] text-slate-400 font-normal">Max 10MB</span>
            </label>

            {uploadedFile ? (
              <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-xs">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-4 h-4 text-[#003366] shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{uploadedFile.name}</span>
                </div>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-[#003366] rounded-lg p-3 text-center block cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition">
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#003366]">Click to upload tender file</span>
                <span className="block text-[10px] text-slate-400">PDF, DOCX, TXT accepted</span>
                <input 
                  type="file" 
                  accept=".pdf,.docx,.txt" 
                  onChange={handleFileUpload}
                  className="hidden" 
                />
              </label>
            )}
          </div>

          {/* Section C: Filters */}
          <div className="space-y-4 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#003366]" />
                <span>{t.searchFilters}</span>
              </span>
              <button
                onClick={() => {
                  setStandardType('ALL');
                  setSelectedCategory('all');
                  setRelevanceThreshold(70);
                }}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Filter 1: Standard Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700">Standard Scope & Type</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'ALL', label: 'All Standards' },
                  { id: 'IS', label: 'Indian (IS) Only' },
                  { id: 'ISO', label: 'ISO / International' },
                  { id: 'MANDATORY', label: 'BIS Mandatory' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setStandardType(item.id)}
                    className={`px-2 py-1.5 rounded border text-[11px] font-medium transition text-left ${
                      standardType === item.id
                        ? 'bg-[#003366] text-white border-[#003366]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Industry Category */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700">Industry / Domain</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 focus:bg-white outline-none"
              >
                {MOCK_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                ))}
              </select>
            </div>

            {/* Filter 3: Relevance Threshold */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-slate-700">Relevance Cutoff</span>
                <span className="font-bold text-[#003366]">{relevanceThreshold}%+</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={relevanceThreshold}
                onChange={(e) => setRelevanceThreshold(Number(e.target.value))}
                className="w-full accent-[#003366] cursor-pointer"
              />
            </div>
          </div>

          {/* Section D: Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleGetRecommendations}
              disabled={isAnalyzing}
              className="w-full bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-extrabold py-3 rounded-lg shadow-md transition flex items-center justify-center space-x-2 cursor-pointer text-xs uppercase tracking-wider"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#003366] border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Standards...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#003366]" />
                  <span>{t.getRecommendations}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* CENTER PANEL - RESULTS DISPLAY (6 of 12 columns = 50%) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Results Header */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900">
                {t.foundStandards}: {filteredStandards.length}
              </div>
              <div className="text-xs text-slate-500">
                Sorted by highest AI relevance match
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 text-xs">
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 border border-slate-300 rounded bg-slate-50 text-xs font-semibold focus:bg-white"
                >
                  <option value="relevance">Relevance %</option>
                  <option value="code">Standard Code</option>
                  <option value="date">Publication Date</option>
                </select>
              </div>

              <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-1.5 rounded transition ${viewMode === 'card' ? 'bg-white shadow text-[#003366]' : 'text-slate-500'}`}
                  title="Card View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-white shadow text-[#003366]' : 'text-slate-500'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results List / Grid */}
          {isAnalyzing ? (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-600">
                Evaluating product criteria against 2,500+ Indian & International Standards...
              </p>
            </div>
          ) : (
            <div className={viewMode === 'card' ? 'space-y-4' : 'space-y-2'}>
              {filteredStandards.map((std) => {
                const isSelected = selectedStandard?.id === std.id;
                const isInCompare = selectedCompareIds.includes(std.id);

                return (
                  <div
                    key={std.id}
                    onClick={() => setSelectedStandard(std)}
                    className={`bg-white rounded-xl border p-4 transition cursor-pointer relative ${
                      isSelected 
                        ? 'border-[#003366] ring-2 ring-blue-600/20 shadow-md' 
                        : 'border-slate-200 hover:border-blue-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-extrabold text-sm text-[#003366] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                          {std.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          (Rev: {std.publishedYear})
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1.5 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px] font-bold">
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-600 rounded-full" 
                              style={{ width: `${std.relevance}%` }}
                            />
                          </div>
                          <span className="text-emerald-700">{std.relevance}% Match</span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          std.status === 'MANDATORY' ? 'bg-red-100 text-red-700 border border-red-200' :
                          std.status === 'RECOMMENDED' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {std.status === 'MANDATORY' ? t.mandatoryStatus :
                           std.status === 'RECOMMENDED' ? t.recommendedStatus : t.referenceStatus}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mt-3 leading-snug hover:text-[#003366]">
                      {std.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {std.scope}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStandard(std);
                        }}
                        className="text-[#003366] font-bold hover:underline flex items-center space-x-1"
                      >
                        <span>{t.inspectSpecs}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCompare(std);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition border ${
                            isInCompare 
                              ? 'bg-amber-100 border-amber-300 text-amber-900' 
                              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isInCompare ? 'In Compare ✓' : '+ Compare'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddSpecClick(std);
                          }}
                          className="bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-bold px-3 py-1 rounded text-[11px] shadow-sm transition flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addToSpec}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT PANEL - DETAILS & PREVIEW (3 of 12 columns = 25%) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 sticky top-24 max-h-[85vh] overflow-y-auto">
          {selectedStandard ? (
            <>
              <div className="space-y-2 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-[#003366] text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedStandard.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedStandard.status === 'MANDATORY' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedStandard.status}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {selectedStandard.title}
                </h3>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Standard Scope
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {selectedStandard.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleAddSpecClick(selectedStandard)}
                  className="w-full bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-extrabold py-2.5 rounded-lg shadow transition flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addToSpec}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">Select any standard card to inspect detailed scope and requirements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
