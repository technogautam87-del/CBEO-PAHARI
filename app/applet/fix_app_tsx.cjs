const fs = require('fs');

const filePath = './src/App.tsx';
let data = fs.readFileSync(filePath, 'utf8');

// We will find the surrounding lines and replace the entire region with the clean code:
const startMarker = '                  <div className="bg-white p-5 md:p-6 rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 text-left">';
const findEndStr = '<span>प्रशिक्षण एवं सुदृढ़ीकरण नीतियां</span>';

const indexStart = data.indexOf(startMarker);
if (indexStart === -1) {
  console.error("Could not find startMarker!");
  process.exit(1);
}

const indexEnd = data.indexOf(findEndStr);
if (indexEnd === -1) {
  console.error("Could not find endMarker!");
  process.exit(1);
}

// Find the corresponding </h4>
const headingCloseIndex = data.indexOf('</h4>', indexEnd);

// We replace from indexStart to headingCloseIndex + 5
const prefix = data.substring(0, indexStart + startMarker.length);
const suffix = data.substring(headingCloseIndex + 5);

const midContent = `
                    <div className="flex items-center gap-2 text-amber-600 font-bold">
                      <Info className="w-5 h-5 text-amber-500 shrink-0" />
                      <h5 className="font-bold text-sm">बाहरी वेब लिंक रीडायरेक्शन अलर्ट!</h5>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-normal font-medium font-sans">
                      आप मुख्य ब्लॉक पहाड़ी के सुरक्षित विंग से प्रस्थान कर <strong>"{redirectWarningUrl.title}"</strong> अधिकृत राज्य स्तरीय शिक्षा विभाग पोर्टल पर जा रहे हैं। क्या आप जारी रखना चाहते हैं?
                    </p>
                    
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setRedirectWarningUrl(null)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        रद्द करें ✕
                      </button>
                      <a
                        href={redirectWarningUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setRedirectWarningUrl(null)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        हाँ, आगे बढ़ें ➔
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* M. INCLUSIVE EDUCATION (CWSN) PANEL */}
          {activeTab === 'inclusive_edu' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left font-sans" id="inclusive-panel">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center text-left">
                <div>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded uppercase font-display">
                    विशेष योग्यजन समन्वयक (CWSN Wing)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">❤️ समावेशी शिक्षा: विशेष आवश्यकता वाले बच्चों का संबल</h3>
                  <p className="text-xs text-slate-500 mt-1">पहाड़ी ब्लॉक के अंतर्गत पंजीकृत दिव्यांग (CWSN) बालकों के लिए संचालित शैक्षणिक नीतियां व परिवहन भत्ते की स्थिति</p>
                </div>
                <Heart className="w-8 h-8 text-rose-500 animate-pulse hidden sm:block shrink-0" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-tr from-rose-50/50 to-pink-50/30 border border-rose-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-rose-600">{inclusiveStats.totalCwsn}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">कुल पंजीकृत CWSN छात्र</p>
                </div>
                <div className="bg-gradient-to-tr from-orange-50/50 to-amber-50/30 border border-orange-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-orange-600">{inclusiveStats.escortGirls}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">परिवहन/एस्कॉर्ट प्राप्त छात्र</p>
                </div>
                <div className="bg-gradient-to-tr from-indigo-50/50 to-blue-50/30 border border-indigo-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-indigo-600">{inclusiveStats.specialEducators}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">पदस्थापित विशेष शिक्षक</p>
                </div>
                <div className="bg-gradient-to-tr from-emerald-50/50 to-teal-50/30 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-emerald-600">{inclusiveStats.equipmentsDistributed}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">वितरित उपकरण व सामग्री</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
                <div className="border rounded-xl p-5 bg-slate-50/50 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-1.5 font-display text-rose-955">
                    <Heart className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>प्रशिक्षण एवं सुदृढ़ीकरण नीतियां</span>
                  </h4>`;

fs.writeFileSync(filePath, prefix + midContent + suffix, 'utf8');
console.log('App.tsx has been successfully reconstructed!');
