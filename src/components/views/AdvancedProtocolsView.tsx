import React from 'react';
import { SPECIAL_PROTOCOLS, SPECIAL_DEMOGRAPHICS, BEVERAGES_RULES, SPICES_RULES } from '../../data';
import { Stethoscope, Coffee, AlertOctagon, Baby, Flame, Info } from 'lucide-react';

export function AdvancedProtocolsView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Stethoscope size={24} className="text-blue-400" />
          بروتوكولات خاصة وحالات متقدمة
        </h2>
        <p className="text-slate-400 text-sm">التطبيقات العلاجية المتقدمة والمسموحات/الممنوعات الاستثنائية لنظام الطيبات.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-blue-300 flex items-center gap-2">
            <Flame size={20} /> البروتوكولات العلاجية
          </h3>
          {SPECIAL_PROTOCOLS.map((protocol, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">{protocol.title}</h4>
              <p className="text-sm text-slate-400 mb-4">{protocol.description}</p>
              
              {protocol.duration && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-500 block mb-1">المدة:</span>
                  <p className="text-sm text-blue-200 bg-slate-900 border border-slate-700 p-2 rounded-lg">{protocol.duration}</p>
                </div>
              )}
              
              {protocol.allowed && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-500 block mb-1">المسموح خلالها:</span>
                  <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                    {protocol.allowed.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
              
              {protocol.actionPlan && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-500 block mb-1">خطة العمل:</span>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {protocol.actionPlan.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold shrink-0">{i + 1}.</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {protocol.breakingFast && (
                <div className="mt-4 p-3 bg-blue-900/40 rounded-lg border border-blue-900 text-sm text-blue-100">
                  <span className="font-bold">ملاحظة:</span> {protocol.breakingFast}
                </div>
              )}
            </div>
          ))}

          <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2 mt-8">
            <Baby size={20} /> الفئات الخاصة
          </h3>
          {SPECIAL_DEMOGRAPHICS.map((demographic, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-lg font-bold text-slate-100 mb-3">{demographic.target}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{demographic.advice}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <Coffee size={20} /> المشروبات والتوابل
          </h3>
          
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-white mb-4">قواعد المشروبات العشبية والمنبهات</h4>
            <div className="space-y-6">
              {BEVERAGES_RULES.map((rule, idx) => (
                <div key={idx}>
                  <h5 className={`font-bold mb-2 ${rule.type === 'المسموحات' ? 'text-green-400' : 'text-red-400'}`}>
                    {rule.type}
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 mb-2">
                    {rule.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p className="text-xs text-slate-500 bg-slate-900 p-2 rounded border border-slate-700">{rule.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-white mb-4">قواعد التوابل والمكملات</h4>
            <div className="space-y-4">
              {SPICES_RULES.map((rule, idx) => (
                <div key={idx}>
                  <h5 className={`font-bold mb-2 flex flex-col ${rule.type.includes('المسموحات') ? 'text-green-400' : 'text-red-400'}`}>
                    {rule.type}
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                    {rule.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-orange-900/30 border border-orange-700/50 p-6 rounded-2xl flex items-start gap-3 text-orange-200">
            <AlertOctagon className="shrink-0 mt-1" size={20} />
            <div className="text-sm leading-relaxed">
              <strong>قاعدة الأدوية:</strong> نظام الطيبات نظام غذائي علاجي يعتمد على ضبط المدخلات، ولا نصف أدوية كيميائية. يرجى مراجعة طبيبك المعالج لتعديل جرعات أدويتك بناءً على تحسن صحتك.
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1 mt-8">
         <Info size={14} /> بناءً على الفيديوهات الرسمية للدكتور ضياء العوضي.
      </p>
    </div>
  );
}
