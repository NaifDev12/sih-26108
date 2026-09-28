import React, { useState } from 'react';
import { 
  Layers, 
  Trash2, 
  Plus, 
  Download, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Edit3, 
  Copy, 
  Share2,
  Save,
  Bold,
  Italic,
  List,
  Heading,
  Printer
} from 'lucide-react';
import { MOCK_STANDARDS } from '../data/mockData';

export default function SpecificationBuilderView({ 
  specStandards = [], 
  onRemoveFromSpec, 
  onAddMoreStandards 
}) {
  const activeStandards = specStandards.length > 0 ? specStandards : [MOCK_STANDARDS[0], MOCK_STANDARDS[1]];

  const [specTitle, setSpecTitle] = useState(
    "Tender Specifications for Supply of Stainless Steel Utensils & HDPE Water Pipelines"
  );
  const [styleMode, setStyleMode] = useState("Technical"); // Technical, Concise, Detailed
  const [docLanguage, setDocLanguage] = useState("English");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Editable specification clauses text state
  const [specText, setSpecText] = useState(`SECTION 1: GENERAL SCOPE & COMPLIANCE

1.1 The contractor/supplier shall manufacture, test, and deliver items strictly conforming to the relevant Bureau of Indian Standards (BIS) specifications detailed herein.

1.2 MANDATORY BIS CERTIFICATION:
All stainless steel utensils supplied under this tender must bear the mandatory BIS ISI mark in accordance with Quality Control Order (QCO) 2023 for IS 1234:2023. Supplier must present valid BIS License & FSSAI food contact suitability certificate prior to dispatch.

SECTION 2: MATERIAL & TECHNICAL PARAMETERS

2.1 Stainless Steel Utensils (Conforming to IS 1234:2023):
- Material Grade: Austenitic Stainless Steel Grade 304 (18/8) or 316.
- Surface Roughness: Ra <= 0.4 µm for food contact surfaces.
- Leaching Test: Heavy metal release limits strictly complying with FSSAI regulations.

2.2 HDPE Water Pipeline System (Conforming to IS 4984:2016):
- Raw Material: PE 100 grade virgin resin.
- Hydrostatic Strength: Minimum 100 hours at 80°C under 4.5 MPa stress.
- Carbon Black Content: 2.0% to 2.5% uniformly dispersed for UV protection.

SECTION 3: TESTING & INSPECTION CLAUSES

3.1 Pre-dispatch Inspection (PDI) shall be conducted by a NABL Accredited Third Party Inspection Agency.
3.2 Sampling protocols shall strictly follow IS 9845 and IS 12235 test methods.`);

  const handleAutoGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSpecText(`SECTION 1: MANDATORY COMPLIANCE CLAUSES

1.1 Standard Specifications:
Items supplied under this contract must strictly comply with the following Indian Standards:
${activeStandards.map(s => `- ${s.code}: ${s.title} (${s.status})`).join('\n')}

SECTION 2: DETAILED MATERIAL & QUALITY ASSURANCE PARAMETERS

${activeStandards.map(s => `2.${s.code.replace(/[^0-9]/g, '')} Technical Criteria for ${s.code}:
${s.keyRequirements.map(req => `   • ${req}`).join('\n')}
   • Required Test Protocol: ${s.testMethods.join('; ')}
   • Certification Scheme: ${s.certificationRequirements.join('; ')}`).join('\n\n')}

SECTION 3: LEGAL & PROCUREMENT OBLIGATIONS

3.1 Any tenderer offering non-BIS marked items under QCO mandatory categories shall be disqualified at technical evaluation stage.`);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#003366]" />
            <span>Interactive Specification Builder</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-generate, edit, and compile official government tender specification clauses based on selected Indian Standards.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert("Draft saved in 'My Specifications'")}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-2 rounded-lg text-xs border border-slate-300 transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => alert("Downloading Specification as Microsoft Word (.docx)...")}
            className="flex items-center space-x-1.5 bg-[#003366] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg text-xs shadow transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FFB81C]" />
            <span>Export .DOCX / .PDF</span>
          </button>
        </div>
      </div>

      {/* THREE COLUMN BUILDER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* COLUMN 1: STANDARDS QUEUE (3 of 12 = 25%) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Selected Standards ({activeStandards.length})
            </span>
            <button
              onClick={onAddMoreStandards}
              className="text-[11px] text-[#003366] font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add More
            </button>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {activeStandards.map((std, idx) => (
              <div 
                key={std.id}
                className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition space-y-1.5 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs text-[#003366] bg-blue-100 px-2 py-0.5 rounded">
                    {std.code}
                  </span>
                  <button
                    onClick={() => onRemoveFromSpec(std.id)}
                    className="text-slate-400 hover:text-red-500 p-0.5"
                    title="Remove standard"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-semibold text-xs text-slate-800 line-clamp-1">
                  {std.title}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <span>Clause Count: {std.keyRequirements.length + 2}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Controls */}
          <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 space-y-2 text-xs">
            <div className="font-bold text-[#003366] flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#E67E00]" />
              <span>AI Auto-Drafter</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-600 block">Drafter Tone:</label>
              <select 
                value={styleMode} 
                onChange={(e) => setStyleMode(e.target.value)}
                className="w-full p-1.5 border border-amber-300 rounded text-xs bg-white"
              >
                <option value="Technical">Formal / Technical</option>
                <option value="Concise">Concise Tender Clause</option>
                <option value="Detailed">Comprehensive Legal Spec</option>
              </select>
            </div>

            <button
              onClick={handleAutoGenerate}
              disabled={isGenerating}
              className="w-full bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-bold py-2 rounded text-xs shadow-sm transition flex items-center justify-center space-x-1 cursor-pointer"
            >
              {isGenerating ? (
                <span>Regenerating Clauses...</span>
              ) : (
                <span>Re-Generate Specification</span>
              )}
            </button>
          </div>
        </div>

        {/* COLUMN 2: LIVE SPECIFICATION EDITOR (5 of 12 = 41.6%) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          {/* Document Title Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Specification Document Title</label>
            <input
              type="text"
              value={specTitle}
              onChange={(e) => setSpecTitle(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border border-slate-300 rounded bg-slate-50 focus:bg-white outline-none"
            />
          </div>

          {/* Editor Formatting Toolbar */}
          <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded border border-slate-200 text-xs">
            <div className="flex items-center space-x-1">
              <button className="p-1 hover:bg-white rounded text-slate-700" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
              <button className="p-1 hover:bg-white rounded text-slate-700" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
              <button className="p-1 hover:bg-white rounded text-slate-700" title="Heading"><Heading className="w-3.5 h-3.5" /></button>
              <button className="p-1 hover:bg-white rounded text-slate-700" title="List"><List className="w-3.5 h-3.5" /></button>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Word Count: {specText.split(/\s+/).length} words
            </span>
          </div>

          {/* Text Editor Area */}
          <textarea
            rows={18}
            value={specText}
            onChange={(e) => setSpecText(e.target.value)}
            className="w-full text-xs font-mono p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003366] outline-none leading-relaxed bg-slate-50 focus:bg-white"
          />
        </div>

        {/* COLUMN 3: LIVE PREVIEW & EXPORT (4 of 12 = 33.3%) */}
        <div className="lg:col-span-4 bg-slate-100 p-4 rounded-xl border border-slate-300 shadow-inner space-y-3 sticky top-24 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-300 pb-2">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#003366]" />
              <span>Official Document Preview</span>
            </span>
            <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border">A4 Tender Format</span>
          </div>

          {/* Preview Page Simulation */}
          <div className="bg-white p-6 rounded shadow border border-slate-300 text-[11px] space-y-4 font-serif min-h-[500px]">
            {/* Government Emblem Header */}
            <div className="text-center border-b border-slate-200 pb-3">
              <div className="font-extrabold text-[#003366] text-xs uppercase tracking-wider">
                GOVERNMENT OF INDIA
              </div>
              <div className="text-[10px] text-slate-600 uppercase">
                MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                Ref ID: DoCIA/TENDER/2026/SPECS-089
              </div>
            </div>

            {/* Document Title */}
            <div className="font-bold text-xs text-slate-900 leading-snug text-center">
              {specTitle}
            </div>

            {/* Formatted Content Body */}
            <div className="text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {specText}
            </div>

            {/* Signature Block */}
            <div className="pt-8 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-sans">
              <div>
                <div>Prepared by AI Recommendation Engine</div>
                <div className="font-mono text-[9px]">Verified against BIS QCO Registry 2026</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-700">Procurement Officer Signature</div>
                <div>Department of Consumer Affairs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
