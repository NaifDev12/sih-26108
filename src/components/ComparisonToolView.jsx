import React from 'react';
import { 
  Sliders, 
  X, 
  Plus, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { MOCK_STANDARDS } from '../data/mockData';

export default function ComparisonToolView({ 
  compareStandards = [], 
  onRemoveFromCompare, 
  onAddMoreClick, 
  onBackToEngine 
}) {
  // Fallback to first 3 standards if none selected yet
  const standardsToCompare = compareStandards.length > 0 
    ? compareStandards 
    : [MOCK_STANDARDS[0], MOCK_STANDARDS[1], MOCK_STANDARDS[2]];

  const rowCategories = [
    { key: 'code', label: 'Standard Code' },
    { key: 'status', label: 'Mandatory Status' },
    { key: 'title', label: 'Title & Focus' },
    { key: 'publishedYear', label: 'Publication Year & Revision' },
    { key: 'category', label: 'Industry Category' },
    { key: 'scope', label: 'Scope of Standard' },
    { key: 'keyRequirements', label: 'Key Technical Requirements' },
    { key: 'testMethods', label: 'Mandatory Test Protocols' },
    { key: 'certificationRequirements', label: 'Certification Schemes (BIS / QCO)' },
    { key: 'relevance', label: 'AI Match Score' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToEngine}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
            title="Back to Recommendation Engine"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#003366]" />
              <span>Standards Comparison Grid</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side technical requirement matrix highlighting differences and compliance overlaps.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert("Comparison matrix exported as PDF document.")}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-2 rounded-lg text-xs border border-slate-300 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#003366]" />
            <span>Export Matrix PDF</span>
          </button>
          <button
            onClick={onAddMoreClick}
            className="flex items-center space-x-1.5 bg-[#003366] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg text-xs shadow transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#FFB81C]" />
            <span>Add Standard to Matrix</span>
          </button>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="flex items-center space-x-4 bg-blue-50/70 border border-blue-200 px-4 py-2.5 rounded-lg text-xs">
        <span className="font-bold text-[#003366]">Grid Legend:</span>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded" />
          <span className="text-slate-700">Common / Compatible Clause</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded" />
          <span className="text-slate-700">Differing Parameter / Divergence</span>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white border-b border-slate-800">
              <th className="p-4 w-52 text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-900 sticky left-0 z-20">
                Evaluation Metric
              </th>
              {standardsToCompare.map((std) => (
                <th key={std.id} className="p-4 min-w-[280px] max-w-[340px] text-left relative border-l border-slate-800">
                  <button
                    onClick={() => onRemoveFromCompare(std.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-400 p-1 rounded-full transition"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="font-mono font-black text-sm text-[#FFB81C]">{std.code}</div>
                  <div className="text-xs font-medium text-slate-300 line-clamp-1 mt-1">{std.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {/* Row 1: Mandatory Status */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Mandatory Status
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-white">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider ${
                    std.status === 'MANDATORY' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {std.status}
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 2: Title */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Title & Description
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 font-semibold text-slate-800 bg-white">
                  {std.title}
                </td>
              ))}
            </tr>

            {/* Row 3: Category */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Industry Category
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-white">
                  <span className="bg-blue-50 text-[#003366] px-2 py-0.5 rounded font-semibold text-xs border border-blue-200">
                    {std.category}
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 4: Scope */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Standard Scope
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 text-slate-600 leading-relaxed bg-slate-50/50">
                  {std.scope}
                </td>
              ))}
            </tr>

            {/* Row 5: Key Technical Requirements (Highlighted Differences) */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Key Requirements
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-amber-50/40">
                  <ul className="space-y-1.5">
                    {std.keyRequirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-1.5 text-slate-800">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row 6: Test Protocols (Highlighted Compatible) */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Test Protocols
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-emerald-50/30">
                  <ul className="space-y-1">
                    {std.testMethods.map((test, i) => (
                      <li key={i} className="text-slate-700 font-mono text-[11px]">
                        ✓ {test}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row 7: Certification Schemes */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                Mandatory Certification
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-white">
                  <div className="space-y-1">
                    {std.certificationRequirements.map((cert, i) => (
                      <div key={i} className="text-xs text-slate-800 font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 8: Relevance Match */}
            <tr>
              <td className="p-4 font-bold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                AI Match Rating
              </td>
              {standardsToCompare.map((std) => (
                <td key={std.id} className="p-4 border-l border-slate-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full" 
                        style={{ width: `${std.relevance}%` }}
                      />
                    </div>
                    <span className="font-extrabold text-[#003366] text-xs">{std.relevance}%</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
