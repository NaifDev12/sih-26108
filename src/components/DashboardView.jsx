import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Layers,
  Search,
  BellRing
} from 'lucide-react';
import { MOCK_ANALYTICS, MOCK_NEWS, MOCK_MY_SPECIFICATIONS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function DashboardView({ setCurrentView, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.English;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#003366] via-[#004080] to-[#002244] text-white rounded-xl shadow-xl overflow-hidden p-6 md:p-10">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-[#FFB81C] border border-amber-400/40 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.subTitle}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroHeadline}
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-normal leading-relaxed">
            {t.heroDescription}
          </p>
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setCurrentView('recommendation')}
              className="flex items-center space-x-2 bg-[#FFB81C] hover:bg-amber-400 text-[#003366] font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              <Sparkles className="w-5 h-5 text-[#003366]" />
              <span>{t.launchEngine}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => setCurrentView('library')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-lg border border-white/20 transition cursor-pointer text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.browseStandards}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-[#003366] rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{MOCK_ANALYTICS.totalStandards}</div>
            <div className="text-xs font-semibold text-slate-500">{t.statsTotalStandards}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-[#138808] rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{MOCK_ANALYTICS.activeOfficers}</div>
            <div className="text-xs font-semibold text-slate-500">{t.statsActiveUsers}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-[#E67E00] rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{MOCK_ANALYTICS.specificationsGenerated}</div>
            <div className="text-xs font-semibold text-slate-500">{t.statsSpecsGenerated}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{MOCK_ANALYTICS.recommendationAccuracy}</div>
            <div className="text-xs font-semibold text-slate-500">{t.statsAccuracy}</div>
          </div>
        </div>
      </section>

      {/* Featured Actions Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#003366]" />
          <span>{t.coreWorkflows}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action 1 */}
          <div 
            onClick={() => setCurrentView('recommendation')}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group hover:border-blue-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-amber-100 text-[#E67E00] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#003366] transition">
                {t.newRecommendation}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t.newRecDesc}
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#003366] group-hover:translate-x-1 transition">
              <span>{t.startAnalysis}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Action 2 */}
          <div 
            onClick={() => setCurrentView('library')}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group hover:border-blue-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-blue-100 text-[#003366] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#003366] transition">
                {t.library}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Explore 2,500+ Indian Standards (IS), test codes, and certification schemes filtered by industry category.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#003366] group-hover:translate-x-1 transition">
              <span>{t.exploreCatalog}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Action 3 */}
          <div 
            onClick={() => setCurrentView('my-specs')}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group hover:border-blue-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-emerald-100 text-[#138808] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-[#003366] transition">
                {t.mySpecs}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                View, manage, edit, and export your saved procurement documents in official PDF or Word formats.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#003366] group-hover:translate-x-1 transition">
              <span>{t.viewSavedDrafts}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section: Recent Activity + Latest Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#003366]" />
              <span>{t.recentTenderSpecs}</span>
            </h2>
            <button 
              onClick={() => setCurrentView('my-specs')}
              className="text-xs font-bold text-[#003366] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Specification ID & Name</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Standards</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MY_SPECIFICATIONS.map((spec) => (
                  <tr key={spec.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 truncate max-w-xs">{spec.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{spec.id} | {spec.department}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">{spec.modifiedDate}</td>
                    <td className="py-3 px-3 font-semibold text-[#003366]">{spec.standardsCount} Standards</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        spec.status === 'Finalized' ? 'bg-emerald-100 text-emerald-800' :
                        spec.status === 'Published' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {spec.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button 
                        onClick={() => setCurrentView('builder')}
                        className="text-xs text-[#003366] font-bold hover:underline"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* News & Updates Section (1 Column) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#E67E00]" />
            <span>{t.standardsUpdates}</span>
          </h2>

          <div className="space-y-4">
            {MOCK_NEWS.map((item) => (
              <div key={item.id} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-amber-50/50 transition">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#003366] bg-blue-100 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <span className="text-slate-400 font-mono">{item.date}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-800 mt-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
