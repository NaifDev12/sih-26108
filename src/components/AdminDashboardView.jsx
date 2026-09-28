import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Database, 
  Plus, 
  Upload, 
  CheckCircle2, 
  Bell, 
  Layers, 
  Search,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { MOCK_ANALYTICS, MOCK_CATEGORIES } from '../data/mockData';

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, standards, users

  const COLORS = ['#003366', '#FF9933', '#138808', '#FFB81C', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#003366]" />
            <span>DoCIA Government Admin Console</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            System administration, BIS standards catalog maintenance, Quality Control Order (QCO) monitoring, and access delegation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'analytics' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standards Coverage
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'standards' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standards Catalog Mgt
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'users' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Access & Logs
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Quick Metrics Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">Database Capacity</div>
              <div className="text-2xl font-black text-[#003366] mt-1">2,540 Standards</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-0.5">✓ 100% BIS Gazette Aligned</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">Mandatory QCO Orders</div>
              <div className="text-2xl font-black text-[#E67E00] mt-1">420 Enforced</div>
              <div className="text-[10px] text-amber-700 font-bold mt-0.5">⚠️ 14 Pending DPIIT Verification</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">System Accuracy Rate</div>
              <div className="text-2xl font-black text-[#138808] mt-1">96.4% Verified</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">NLP Model v2.4</div>
            </div>
          </div>

          {/* Standards Coverage by Industry Sector Pie Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#138808]" />
                  <span>Standards Coverage by Industry Sector</span>
                </h3>
                <p className="text-xs text-slate-500">Breakdown of 2,540 Indian & International Standards indexed in system</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-[#138808] font-mono px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Live Distribution
              </span>
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_ANALYTICS.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={(entry) => `${entry.name} (${entry.percentage}%)`}
                  >
                    {MOCK_ANALYTICS.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'standards' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">BIS & Allied Standards Database Management</h3>
            <button 
              onClick={() => alert("Simulating Bulk Import XML/JSON for BIS standards")}
              className="bg-[#003366] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#FFB81C]" />
              <span>Bulk XML / JSON Import</span>
            </button>
          </div>

          <p className="text-xs text-slate-600">
            Maintain national standards repository, append new Quality Control Orders (QCO), and sync with BIS Bureau of Indian Standards API registry.
          </p>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#E67E00]" />
              <span>Pending Audit Action: 14 QCO Amendments requiring verification</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Department for Promotion of Industry and Internal Trade (DPIIT) issued QCO 2026 affecting stainless steel and HDPE pipes.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Registered Procurement Officers & Access Delegation</h3>
          <p className="text-xs text-slate-600">
            Active government officials from Ministry of Consumer Affairs, CPWD, Jal Shakti, and Indian Railways.
          </p>

          <div className="overflow-x-auto border rounded-lg border-slate-200">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Officer Name</th>
                  <th className="py-2.5 px-3">Ministry / Department</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Dr. A. K. Sharma</td>
                  <td className="py-2.5 px-3">Department of Consumer Affairs (DoCIA)</td>
                  <td className="py-2.5 px-3 font-bold text-amber-700">System Administrator</td>
                  <td className="py-2.5 px-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Active</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Rajesh K. Verma</td>
                  <td className="py-2.5 px-3">Ministry of Consumer Affairs</td>
                  <td className="py-2.5 px-3 font-semibold text-blue-700">Procurement Officer (Normal User)</td>
                  <td className="py-2.5 px-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
