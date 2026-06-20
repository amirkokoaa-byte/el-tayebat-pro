import React from 'react';
import { SYMPTOMS_PROTOCOLS } from '../../data';
import { Activity, ShieldAlert, HeartPulse, Info } from 'lucide-react';

export function SymptomsGuideView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Activity size={24} className="text-blue-400" />
          دليل الأعراض والعلاج (طبياً)
        </h2>
        <p className="text-slate-400 text-sm">
          تفسير وعلاج الأمراض الشائعة وفقاً للبروتوكول الرسمي لنظام الطيبات.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {SYMPTOMS_PROTOCOLS.map((item, idx) => (
          <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <HeartPulse size={20} className="text-slate-400" />
              {item.symptom}
            </h3>
            
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-orange-400 mb-2">
                <ShieldAlert size={16} /> السبب الحقيقي (جذر المشكلة):
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-700">
                {item.rootCause}
              </p>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold text-green-400 mb-2 mt-4">العلاج والبروتوكول (الطيبات):</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {item.protocol.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-blue-900/50 text-blue-400 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-blue-800">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
          <Info size={14} /> 
          <span className="font-bold">ملاحظة هامة:</span> هذا البرنامج مبرمج بناءً على الفيديوهات الرسمية والموثقة للدكتور ضياء العوضي لنظام الطيبات، ولا يحتوي على أي اجتهادات شخصية أو توقعات ذكاء اصطناعي لسلامتك.
        </p>
      </div>
    </div>
  );
}
