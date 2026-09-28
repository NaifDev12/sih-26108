import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Trash2, 
  Edit3, 
  Copy, 
  Share2, 
  CheckCircle2, 
  Search, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { MOCK_MY_SPECIFICATIONS } from '../data/mockData';

export default function MySpecificationsView({ setCurrentView, onOpenSpec }) {
  const [specs, setSpecs] = useState(MOCK_MY_SPECIFICATIONS);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecs = specs.filter(s => {
    if (filterStatus !== 'ALL' && s.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.department.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSpecs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSpecs.map(s => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#003366]" />
            <span>My Procurement Specifications</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, edit, export, and duplicate saved tender specification documents across government ministries.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => alert(`Exporting ${selectedIds.length} specifications as ZIP archive...`)}
              className="flex items-center space-x-1 bg-amber-100 text-amber-900 font-bold px-3 py-2 rounded-lg text-xs border border-amber-300 transition"
            >
              <Download className="w-4 h-4" />
              <span>Bulk Export ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('builder')}
            className="flex items-center space-x-1.5 bg-[#003366] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg text-xs shadow transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#FFB81C]" />
            <span>Create New Specification</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-700">Filter Status:</span>
          {['ALL', 'Finalized', 'Published', 'Draft'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                filterStatus === status 
                  ? 'bg-[#003366] text-white border-[#003366]' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search saved specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* Specifications Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-900 text-white font-bold border-b border-slate-800">
            <tr>
              <th className="py-3 px-3 w-10">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === filteredSpecs.length && filteredSpecs.length > 0}
                  onChange={toggleSelectAll}
                  className="accent-[#FFB81C]"
                />
              </th>
              <th className="py-3 px-3">Specification Name & ID</th>
              <th className="py-3 px-3">Department / Ministry</th>
              <th className="py-3 px-3">Modified</th>
              <th className="py-3 px-3">Standards</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSpecs.map((spec) => {
              const isChecked = selectedIds.includes(spec.id);
              return (
                <tr key={spec.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-3">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => toggleSelectOne(spec.id)}
                      className="accent-[#003366]"
                    />
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 text-xs leading-snug">{spec.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{spec.id} | Author: {spec.author}</div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700">{spec.department}</td>
                  <td className="py-3.5 px-3 font-mono whitespace-nowrap">{spec.modifiedDate}</td>
                  <td className="py-3.5 px-3 font-bold text-[#003366]">
                    {spec.standardsCount} IS Standards
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                      spec.status === 'Finalized' ? 'bg-emerald-100 text-emerald-800' :
                      spec.status === 'Published' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {spec.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setCurrentView('builder')}
                        className="p-1.5 text-[#003366] hover:bg-blue-50 rounded transition font-bold text-xs"
                        title="Edit in Specification Builder"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => alert(`Exporting ${spec.name} as PDF`)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                        title="Export Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Duplicated specification ${spec.id}`)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                        title="Duplicate Spec"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
