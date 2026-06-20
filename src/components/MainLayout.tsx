import React from 'react';
import { 
  CalendarDays, 
  Scale, 
  Droplets, 
  Activity, 
  BookOpen, 
  Menu,
  X,
  CloudLightning,
  HeartPulse,
  Stethoscope,
  Info,
  Bot
} from 'lucide-react';
import { DietPlanView } from './views/DietPlanView';
import { WeightManagerView } from './views/WeightManagerView';
import { WaterTrackerView } from './views/WaterTrackerView';
import { ExerciseLogView } from './views/ExerciseLogView';
import { FoodDictionaryView } from './views/FoodDictionaryView';
import { SymptomsGuideView } from './views/SymptomsGuideView';
import { AdvancedProtocolsView } from './views/AdvancedProtocolsView';
import { AssistantView } from './views/AssistantView';

export function MainLayout() {
  const [activeTab, setActiveTab] = React.useState('diet');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const tabs = [
    { id: 'diet', label: 'نظام 30 يوم', icon: CalendarDays },
    { id: 'symptoms', label: 'دليل الأعراض', icon: HeartPulse },
    { id: 'advanced', label: 'بروتوكولات وحالات', icon: Stethoscope },
    { id: 'dictionary', label: 'دليل السعرات', icon: BookOpen },
    { id: 'assistant', label: 'المساعد الذكي', icon: Bot },
    { id: 'weight', label: 'التخسيس والزيادة', icon: Scale },
    { id: 'water', label: 'تتبع الماء', icon: Droplets },
    { id: 'exercise', label: 'سجل التمارين', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'diet': return <DietPlanView />;
      case 'symptoms': return <SymptomsGuideView />;
      case 'advanced': return <AdvancedProtocolsView />;
      case 'dictionary': return <FoodDictionaryView />;
      case 'assistant': return <AssistantView />;
      case 'weight': return <WeightManagerView />;
      case 'water': return <WaterTrackerView />;
      case 'exercise': return <ExerciseLogView />;
      default: return <DietPlanView />;
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col p-4 bg-slate-900 border-l border-slate-800">
      <div className="mb-8 mt-4 px-2">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <CloudLightning className="text-blue-500" />
          خبير الطيبات
        </h1>
        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
          تطبيق دقيق جداً مبني على فيديوهات د. ضياء العوضي.
        </p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-blue-200' : 'text-slate-500'} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-sm font-bold border border-slate-700 transition-colors flex justify-center items-center gap-2">
           <CloudLightning size={16} className="text-blue-400"/>
           مزامنة سحابية (حفظ)
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex" dir="rtl">
      {/* Mobile Header / Hamburger */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-md z-40 border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <CloudLightning className="text-blue-500" size={20} />
          خبير الطيبات
        </h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-slate-300 bg-slate-800 rounded-lg">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-slate-900" onClick={e => e.stopPropagation()}>
            <div className="h-16"></div> {/* spacer for header */}
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-screen sticky top-0 bg-slate-900 z-20">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pt-20 md:pt-8 min-h-screen flex flex-col">
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center border-t border-slate-800 space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 leading-relaxed text-justify md:text-center">
              <span className="font-bold text-slate-300">ملاحظة هامة:</span> هذا البرنامج مبرمج بناءً على الفيديوهات الرسمية والموثقة للدكتور ضياء العوضي لنظام الطيبات، ولا يحتوي على أي اجتهادات شخصية أو توقعات ذكاء اصطناعي لسلامتك.
            </p>
          </div>
          <p className="text-slate-500 font-medium text-sm">مع تحيات المطور Amir Lamay</p>
        </footer>
      </main>
    </div>
  );
}
