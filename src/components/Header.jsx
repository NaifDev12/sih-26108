import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  User, 
  Globe,
  ChevronDown, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Layers, 
  HelpCircle,
  Menu,
  X,
  Sliders,
  Sparkles,
  Lock,
  RefreshCw,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ 
  currentView, 
  setCurrentView, 
  userRole, 
  setUserRole,
  currentLang = 'English',
  setCurrentLang,
  breadcrumbPath = [] 
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.English;

  const languages = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'हिंदी (Hindi)' },
    { code: 'Tamil', label: 'தமிழ் (Tamil)' },
    { code: 'Malayalam', label: 'മലയാളം (Malayalam)' }
  ];

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
    { id: 'recommendation', label: t.recommendation, icon: Sparkles, badge: 'AI' },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'compare', label: t.compare, icon: Sliders },
    { id: 'builder', label: t.builder, icon: Layers },
    { id: 'my-specs', label: t.mySpecs, icon: FileText },
    { id: 'admin', label: t.admin, icon: ShieldCheck, restricted: true },
    { id: 'help', label: t.help, icon: HelpCircle }
  ];

  const handleNavClick = (itemId, restricted) => {
    if (restricted && userRole === 'user') {
      setShowAccessDeniedModal(true);
      return;
    }
    setCurrentView(itemId);
  };

  const toggleUserRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    if (newRole === 'admin') {
      setCurrentView('admin');
    } else if (currentView === 'admin') {
      setCurrentView('dashboard');
    }
    setShowProfileMenu(false);
    setShowAccessDeniedModal(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Banner - Govt Identity Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="truncate">{t.govtIdentity}</span>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          {/* Active Role Indicator Badge */}
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <span className="text-[10px] text-slate-400">Account:</span>
            {userRole === 'admin' ? (
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> System Admin
              </span>
            ) : (
              <span className="text-blue-300 font-bold flex items-center gap-1 text-[10px]">
                <UserCheck className="w-3 h-3 text-blue-300" /> Normal User
              </span>
            )}
          </div>
          <span>|</span>
          <button className="hover:text-white transition cursor-pointer" onClick={() => alert("High contrast mode toggled")}>
            A+ High Contrast
          </button>
        </div>
      </div>

      {/* Main Deep Blue Navigation Header */}
      <div className="bg-[#003366] text-white px-4 lg:px-8 py-3 flex items-center justify-between shadow-lg">
        {/* Left: Ministry / App Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setCurrentView('dashboard')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] p-0.5 flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-[#003366] rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#FFB81C] group-hover:scale-110 transition duration-200" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-lg lg:text-xl tracking-tight flex items-center gap-2">
              <span className="text-white">e-Standards</span>
              <span className="bg-[#FFB81C] text-[#003366] text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                DoCIA AI
              </span>
            </div>
            <div className="text-xs text-blue-200 font-medium tracking-wide">
              {t.appTitle}
            </div>
          </div>
        </div>

        {/* Center: Main Nav Links (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isRestrictedForUser = item.restricted && userRole === 'user';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.restricted)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold transition cursor-pointer relative ${
                  isActive 
                    ? 'bg-[#FF9933] text-slate-950 font-bold shadow' 
                    : isRestrictedForUser
                    ? 'text-blue-200/70 hover:bg-blue-900/40 opacity-80'
                    : 'text-blue-100 hover:bg-blue-900/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isRestrictedForUser && (
                  <Lock className="w-3 h-3 text-amber-300 ml-0.5" title="Requires Admin Account" />
                )}
                {item.badge && !isRestrictedForUser && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#FFB81C] text-[#003366] text-[10px] rounded font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls, Multilingual Selector & Profile */}
        <div className="flex items-center space-x-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 bg-blue-900/70 hover:bg-blue-800 text-xs px-3 py-1.5 rounded-md border border-blue-700/60 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span className="font-bold text-white">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 font-medium transition flex items-center justify-between"
                  >
                    <span>{lang.label}</span>
                    {currentLang === lang.code && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button 
            onClick={() => alert("Notifications: 1. BIS Amendment 4 issued for IS 4984. 2. DPIIT QCO updated.")}
            className="relative p-2 text-blue-100 hover:bg-blue-900/80 rounded-full transition cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-blue-100" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* User Profile & Account Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 bg-slate-900/60 hover:bg-slate-900 px-3 py-1.5 rounded-md border border-blue-600/40 transition cursor-pointer"
            >
              <div className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center ${
                userRole === 'admin' ? 'bg-[#FF9933] text-slate-950' : 'bg-[#FFB81C] text-[#003366]'
              }`}>
                {userRole === 'admin' ? 'SA' : 'PO'}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-semibold leading-none text-white">
                  {userRole === 'admin' ? 'Dr. A. K. Sharma' : 'Rajesh K. Verma'}
                </div>
                <div className="text-[10px] text-blue-200 leading-none mt-0.5">
                  {userRole === 'admin' ? 'System Administrator' : 'Procurement Officer'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-md shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-bold text-[#003366]">
                    {userRole === 'admin' ? 'Dr. A. K. Sharma' : 'Rajesh K. Verma'}
                  </p>
                  <p className="text-[11px] text-slate-500">Ministry of Consumer Affairs</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      userRole === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {userRole === 'admin' ? '🛡 Admin Account' : '👤 Normal User Account'}
                    </span>
                  </div>
                </div>

                {/* Account Switcher Button */}
                <div className="p-2 border-b border-slate-100">
                  <button
                    onClick={toggleUserRole}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-2 rounded text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#FFB81C]" />
                    <span>Switch to {userRole === 'user' ? 'Admin Account' : 'Normal User Account'}</span>
                  </button>
                </div>

                <button 
                  onClick={() => { setCurrentView('my-specs'); setShowProfileMenu(false); }} 
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center space-x-2"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.mySpecs}</span>
                </button>
                <button 
                  onClick={() => handleNavClick('admin', true)} 
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.admin} {userRole === 'user' && '(Restricted)'}</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('help'); setShowProfileMenu(false); }} 
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center space-x-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.help}</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button 
                  onClick={() => alert("Logged out successfully")} 
                  className="w-full text-left px-4 py-2 text-xs text-red-600 font-semibold hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="xl:hidden p-2 text-white hover:bg-blue-900 rounded-md"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Access Denied Modal (for Normal User trying to access Admin) */}
      {showAccessDeniedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4 animate-scale-up">
            <div className="w-12 h-12 bg-amber-100 text-[#E67E00] rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-extrabold text-lg text-slate-900">Admin Account Required</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are currently logged in as a <strong>Standard Procurement Officer (Normal User Account)</strong>.
              </p>
              <p className="text-xs text-slate-500">
                The Admin Dashboard contains database management, QCO audit registries, and user access delegation restricted to System Administrators.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <button
                onClick={toggleUserRole}
                className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-2.5 rounded-lg text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-[#FFB81C]" />
                <span>Switch to Admin Account Now</span>
              </button>
              <button
                onClick={() => setShowAccessDeniedModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-xs transition cursor-pointer"
              >
                Stay as Normal User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {showMobileMenu && (
        <div className="xl:hidden bg-[#002244] text-white px-4 py-3 border-t border-blue-800 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item.id, item.restricted);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold ${
                  isActive ? 'bg-[#FF9933] text-slate-950 font-bold' : 'text-blue-100 hover:bg-blue-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.restricted && userRole === 'user' && <Lock className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-100 text-slate-600 text-xs px-4 lg:px-8 py-2 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span 
            onClick={() => setCurrentView('dashboard')}
            className="hover:text-[#003366] cursor-pointer font-medium"
          >
            {t.dashboard}
          </span>
          {currentView !== 'dashboard' && (
            <>
              <span>/</span>
              <span className="font-semibold text-[#003366] capitalize">
                {navItems.find(n => n.id === currentView)?.label || currentView}
              </span>
            </>
          )}
        </div>
        <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
          Logged in as: <strong className="text-slate-800">{userRole === 'admin' ? 'System Administrator' : 'Normal User (Procurement Officer)'}</strong> | Lang: <strong className="text-[#003366]">{currentLang}</strong>
        </div>
      </div>
    </header>
  );
}
