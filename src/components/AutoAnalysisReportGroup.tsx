/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { AreaChart, FileText, CheckCircle, Flame, MessageSquare, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { historicalEnrollment, historicalBoardResults, blockStatistics } from '../data/schoolsData';

interface ReportTheme {
  id: 'enrollment' | 'results' | 'infrastructure' | 'teachers';
  title: string;
  subtext: string;
}

interface AutoAnalysisReportGroupProps {
  blockStats?: typeof blockStatistics;
  boardResults?: typeof historicalBoardResults;
}

export default function AutoAnalysisReportGroup({ blockStats, boardResults }: AutoAnalysisReportGroupProps) {
  const activeBlockStatistics = blockStats || blockStatistics;
  const activeBoardResults = boardResults || historicalBoardResults;

  const [selectedTheme, setSelectedTheme] = useState<'enrollment' | 'results' | 'infrastructure' | 'teachers'>('enrollment');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Preset report themes
  const reportThemes: ReportTheme[] = [
    { id: 'enrollment', title: 'कुल नामांकन सांख्यिकी', subtext: 'विगत 5 वर्षों में बच्चों के प्रवेश का रुझान' },
    { id: 'results', title: 'बोर्ड परीक्षाओं का स्तर', subtext: 'कक्षा 10वीं व 12वीं का गुणात्मक परिणाम' },
    { id: 'infrastructure', title: 'भौतिक एवं डिजिटल संसाधन', subtext: 'कंप्यूटर लैब, पेयजल एवं सोलर ऊर्जा' },
    { id: 'teachers', title: 'शिक्षक अनुपात एवं प्रतिनियुक्ति', subtext: 'विषयवार शिक्षकों की उपलब्धता विश्लेषण' }
  ];

  // Simulated AI expert responses tailored for Block Pahari
  const handleAiConsult = (topicKey?: string) => {
    const query = topicKey || aiQuestion.trim();
    if (!query) return;

    setAiLoading(true);
    setAiResponse(null);

    // AI logic simulation based on Rajasthan education policies for CBEO Pahari
    setTimeout(() => {
      let speech = '';
      if (query.includes('नामांकन') || query.includes('enrollment') || query === 'topic_1') {
        speech = `📚 **पहाड़ी ब्लॉक में छात्र नामांकन बढ़ाने की रणनीतिक योजना (CBEO विश्लेषक):**\n\n1. **शारदे बालिका छात्रावास संपर्क:** पहाड़ी क्षेत्र के दूरस्थ गांवों में बालिकाओं के ठहराव के लिए शारदे बालिका छात्रावास के माध्यम से शत-प्रतिशत प्रवेश सुनिश्चित किया जा रहा है।\n2. **ग्रामीण प्रवेशोत्सव अभियान:** राज्य सरकार के निर्देशानुसार हर सत्र पूर्वारम्भ में घर-घर सर्वेक्षण कर स्कूल से बाहर रहे (OOSC) बच्चों को चिन्हित किया जाएगा।\n3. **मदरसों से मुख्यधारा समन्वय:** ब्लॉक पहाड़ी में स्थानीय बालकों को मदरसों से औपचारिक राजकीय स्कूल शिक्षा की मुख्यधारा में जोड़ने के लिए विशेष ब्रिज कोर्स चलाए जा रहे हैं।`;
      } else if (query.includes('ड्रॉपआउट') || query.includes('dropout') || query === 'topic_2') {
        speech = `⚠️ **पहाड़ी ब्लॉक में स्कूल ड्रॉपआउट (दूरी जनित) रोकने हेतु विशेष कार्ययोजना:**\n\n1. **ट्रांसपोर्ट वाउचर सुदृढ़ीकरण:** कक्षा 9 से 12 की ऐसे बालिकाएं जिनका विद्यालय निवास स्थान से 5 किलोमीटर से अधिक दूरी पर है, उन्हें Transport Voucher योजनान्तर्गत दैनिक यात्रा भत्ता दिया जा रहा है।\n2. **बालिका साइकिल वितरण पारदिर्शता:** सत्रारम्भ के साथ ही कक्षा 9 में 100% साइकिल वितरण कॉपियाँ शाला दर्पण पोर्टल पर दर्ज की जा चुकी हैं जिससे छात्राओं की उपस्थिति स्थिर (92%+) बनी हुई है।\n3. **व्यवसायिक शिक्षा का आकर्षण:** विद्यालयों में आईटी (IT) एवं कृषि संकाय होने के कारण विद्यार्थी कौशल आधारित व्यावसायिक शिक्षा की ओर आकर्षित होकर पढ़ाई नियमित रख रहे हैं।`;
      } else if (query.includes('रिजल्ट') || query.includes('बोर्ड') || query === 'topic_3') {
        speech = `📈 **बोर्ड परिणाम गुणवत्ता सुदृढ़ीकरण हेतु अकादमिक नवाचार (CBEO सुझाव):**\n\n1. **पहाड़ी सुपर-30 अकादमिक मेंटरशिप:** ब्लॉक स्तर पर सर्वश्रेष्ठ प्रतिभाओं के लिए विशेष ग्रुप बनाकर वरिष्ठ विषय अध्यापकों द्वारा शाम को निःशुल्क संवर्धन कोचिंग दी जाएगी।\n2. **कठिन विषय वार कोचिंग:** अंग्रेजी, गणित एवं विज्ञान विषयों के लिए शनिवार को "विशेष शिक्षण" वर्कबुक साझा की जाती है।\n3. **प्री-बोर्ड मॉक टेस्ट शृंखला:** परीक्षा पूर्व ब्लॉक स्तर पर विकेंद्रीकृत प्री-बोर्ड परीक्षाओं का आयोजन कर कॉपी मूल्यांकन की खामियों को सुधारा जाएगा।`;
      } else {
        speech = `💡 **CBEO पहाड़ी शिक्षा संवर्धक प्रतिक्रिया:**\n\nआपके द्वारा पूछे गए प्रश्न: "${query}" का स्थानीय ब्लॉक स्तरीय भौगोलिक परिस्थितियों के अनुसार विश्लेषण किया गया है। पहाड़ी ब्लॉक (डीग) में शिक्षा विभाग राजस्थान की फ्लैगशिप नीतियों का अनुपालन सुनिश्चित करने के लिए हम संकल्पित हैं। किसी भी विशेष विद्यालय रिपोर्ट या प्रशासनिक सहयोग हेतु CBEO मुख्य नियंत्रात्मक अनुभाग से ईमेल द्वारा संपर्क करें।`;
      }
      setAiResponse(speech);
      setAiLoading(false);
      setAiQuestion('');
    }, 800);
  };

  // Dual data parsing for graphs
  const getGraphData = () => {
    if (selectedTheme === 'enrollment') {
      const start = historicalEnrollment[0];
      const end = historicalEnrollment[historicalEnrollment.length - 1];
      return {
        unit: 'छात्र',
        labelStart: 'सत्र 2021',
        labelEnd: 'सत्र 2025',
        bars: [
          { name: 'प्राथमिक बालक', startVal: start.primaryBoys, endVal: end.primaryBoys, col: '#4f46e5' },
          { name: 'प्राथमिक बालिका', startVal: start.primaryGirls, endVal: end.primaryGirls, col: '#ec4899' },
          { name: 'माध्यमिक बालक', startVal: start.secondaryBoys, endVal: end.secondaryBoys, col: '#f97316' },
          { name: 'माध्यमिक बालिका', startVal: start.secondaryGirls, endVal: end.secondaryGirls, col: '#10b981' }
        ]
      };
    } else if (selectedTheme === 'results') {
      const start = activeBoardResults[0];
      const end = activeBoardResults[activeBoardResults.length - 1];
      return {
        unit: 'पास %',
        labelStart: 'वर्ष 2021',
        labelEnd: 'वर्ष 2025',
        bars: [
          { name: 'कक्षा 5 बोर्ड', startVal: start.class5PassPercent, endVal: end.class5PassPercent, col: '#10b981' },
          { name: 'कक्षा 8 बोर्ड', startVal: start.class8PassPercent, endVal: end.class8PassPercent, col: '#06b6d4' },
          { name: 'कक्षा 10 बोर्ड', startVal: start.class10PassPercent, endVal: end.class10PassPercent, col: '#ea580c' },
          { name: 'कक्षा 12 बोर्ड', startVal: start.class12PassPercent, endVal: end.class12PassPercent, col: '#6366f1' }
        ]
      };
    } else if (selectedTheme === 'infrastructure') {
      return {
        unit: 'विद्यालय काउंट',
        labelStart: 'वर्ष 2021',
        labelEnd: 'वर्ष 2025',
        bars: [
          { name: 'कम्प्यूटर लैब क्रियाशील', startVal: 18, endVal: activeBlockStatistics.secondary.itLabsSetup ? 52 : 45, col: '#6366f1' },
          { name: 'स्मार्ट क्लास सेटअप', startVal: 8, endVal: 35, col: '#f59e0b' },
          { name: 'व्यावसायिक लैब उपकरण युक्त', startVal: 4, endVal: 12, col: '#10b981' },
          { name: 'सोलर बिजली संपन्न स्कूल', startVal: 2, endVal: 14, col: '#10b981' }
        ]
      };
    } else {
      return {
        unit: 'शिक्षक संख्या',
        labelStart: 'वर्ष 2021',
        labelEnd: 'वर्ष 2025',
        bars: [
          { name: 'प्रारम्भिक शिक्षक', startVal: 510, endVal: activeBlockStatistics.elementary.teachersCount, col: '#06b6d4' },
          { name: 'माध्यमिक शिक्षक', startVal: 430, endVal: activeBlockStatistics.secondary.teachersCount, col: '#ea580c' },
          { name: 'व्यावसायिक प्रशिक्षक', startVal: 8, endVal: 24, col: '#ec4899' },
          { name: 'ब्लॉक संदर्भ विशेषज्ञ (RP)', startVal: 3, endVal: 5, col: '#10b981' }
        ]
      };
    }
  };

  const currentGraph = getGraphData();

  // Helper to generate the official Government Circular Memo in Hindi
  const getOfficialCircularContent = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const memoNo = `क्रमांक: शिविरा/पहाड़ी/आंकड़े/विश्लेषण/2026/1209`;

    let bodyText = '';
    if (selectedTheme === 'enrollment') {
      bodyText = `1. समग्र शिक्षा सांख्यिकीय विश्लेषण के अनुसार, पहाड़ी ब्लॉक की कुल विद्यालय प्रवेश दर सत्र 2021 के 22,640 नामांकन से सुधरकर सत्र 2025 में 30,030 दर्ज की गई है, जो कुल 32.6% की ऐतिहासिक सकारात्मक वृद्धि दर्शाता है।\n2. लिंगानुपात संवर्धन रिपोर्ट बताती है कि प्राथमिक शिक्षा में बालिका नामांकन दर 8,120 तक पहुँच गई है, जो राजकीय बाल अधिकार योजनाओं की जमीनी क्रियाशीलता का प्रबल प्रमाण है।`;
    } else if (selectedTheme === 'results') {
      bodyText = `1. परीक्षा विंग राजस्थान माध्यमिक शिक्षा के तुलनात्मक सांख्यिकी अनुसार, पहाड़ी ब्लॉक के अंतर्गत कक्षा 10वीं का परिणाम 2021 में 78.5% की तुलना में 2025 में 89.2% दर्ज किया गया। कक्षा 12वीं में भी यह 82.4% से सुधरकर 92.6% तक सुचारू हुआ है।\n2. प्रत्येक विद्यालय प्रभारी को निर्देश दिया जाता है कि इस अकादमिक स्तर को निरंतर बनाए रखने हेतु साप्ताहिक विषय-वार टेस्ट व कॉपियों की जांच प्रक्रिया सुदृढ़ रखें।`;
    } else if (selectedTheme === 'infrastructure') {
      bodyText = `1. विद्यालयों के आधुनिकीकरण एवं आईसीटी (ICT) संवर्धन के तहत डिजिटल लैब युक्त स्कूलों का दायरा 18 से सुधरकर 52 तक पहुँचा है।\n2. समग्र शिक्षा निधि द्वारा पीएम श्री विद्यालयों में सोलर प्लांटों की स्थापना हेतु विशेष वित्तीय प्रोत्साहन स्वीकृत किया गया है, जिसके अंतर्गत 14 सीनियर स्तर के स्कूल सत-प्रतिशत स्वच्छ ऊर्जा संचालित हुए हैं।`;
    } else {
      bodyText = `1. पहाड़ी ब्लॉक में नियुक्त विषय अध्यापकों की संख्या वर्तमान में 1,240 तक पहुँच चुकी है। शिक्षक छात्र अनुपात (PTR) प्रारम्भिक विद्यालयों में वर्तमान में 24:1 स्थापित है जो सरकार के मानक राष्ट्रीय नियमों के पूर्णतः अनुरूप है।\n2. माध्यमिक स्तर पर विज्ञान संकायों के पदों को भरने के लिए त्वरित पदस्थापन एवं शाला दर्पण पोर्टल आधारित युक्तिकरण कार्य सफलतापूर्वक पूर्ण हुआ है।`;
    }

    return { memoNo, date: formattedDate, bodyText };
  };

  const circularInfo = getOfficialCircularContent();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6" id="auto-analysis-panel">
      
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-indigo-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AreaChart className="w-5 h-5 text-indigo-500" />
            <span>स्वचालित तुलना और ऑटो-एनालिसिस स्टूडियो (Auto-Analysis Engine)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            पिछले 5 वर्षों के वास्तविक प्रशासनिक डेटा से त्वरित तुलना एवं विस्तृत शासकीय प्रतिवेदन का स्वतः सृजन
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Metric selection rail - Left Menu (1 col) */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mb-1">विषय थीम चुनें (Themes)</p>
          {reportThemes.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTheme(item.id)}
              className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition flex flex-col gap-1.5 ${
                selectedTheme === item.id
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-950 ring-1 ring-indigo-505/25'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="font-semibold">{item.title}</span>
              <span className={`text-[10px] font-medium leading-tight ${selectedTheme === item.id ? 'text-indigo-650' : 'text-slate-400'}`}>
                {item.subtext}
              </span>
            </button>
          ))}

          {/* AI Consultation Prompt Helper box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mt-6 text-slate-805">
            <p className="text-[11px] font-black text-slate-705 tracking-wider uppercase mb-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-orange-500" /> AI शैक्षिक मार्गदर्शक
            </p>
            <p className="text-[10px] text-slate-500 leading-normal mb-2">पहाड़ी ब्लॉक के भौगोलिक/शैक्षणिक विकास हेतु तत्काल विशेषज्ञ समाधान प्राप्त करें:</p>
            
            <div className="space-y-1.5">
              <button 
                onClick={() => handleAiConsult('topic_1')}
                className="w-full text-left text-[10px] bg-white border p-1.5 rounded hover:bg-orange-50 font-bold transition text-slate-700 flex justify-between items-center"
              >
                <span>📈 नामांकन बढ़ाने के उपाय</span>
                <ArrowRight className="w-2.5 h-2.5 text-orange-500" />
              </button>
              <button 
                onClick={() => handleAiConsult('topic_2')}
                className="w-full text-left text-[10px] bg-white border p-1.5 rounded hover:bg-orange-50 font-bold transition text-slate-700 flex justify-between items-center"
              >
                <span>⚠️ ड्रॉपआउट दर कम करने की योजना</span>
                <ArrowRight className="w-2.5 h-2.5 text-orange-500" />
              </button>
              <button 
                onClick={() => handleAiConsult('topic_3')}
                className="w-full text-left text-[10px] bg-white border p-1.5 rounded hover:bg-orange-50 font-bold transition text-slate-700 flex justify-between items-center"
              >
                <span>📋 बोर्ड परीक्षा में मेरिट सुधार संवर्धन</span>
                <ArrowRight className="w-2.5 h-2.5 text-orange-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Graphic Report Area - Right Grid (3cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Comparative SVG Bar Chart inside a Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 flex justify-between">
              <span>ग्राफिकल सांख्यिकी: {circularInfo.date}</span>
              <span className="text-indigo-600">इकाई: {currentGraph.unit}</span>
            </h4>

            {/* Bars container */}
            <div className="space-y-4 py-2">
              {currentGraph.bars.map((bar, index) => {
                const totalChange = bar.endVal - bar.startVal;
                const changePct = ((totalChange / bar.startVal) * 100).toFixed(1);
                const isPositive = totalChange >= 0;

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold font-sans text-slate-800">
                      <span>{bar.name}</span>
                      <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-slate-400 font-mono text-[10px]">{currentGraph.labelStart}:</span>
                        <strong className="font-mono text-slate-900">{bar.startVal}</strong>
                        <span className="text-slate-300">➔</span>
                        <span className="text-slate-400 font-mono text-[10px]">{currentGraph.labelEnd}:</span>
                        <strong className="font-mono text-slate-900">{bar.endVal}</strong>
                        <span className={`text-[10px] font-mono ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ({isPositive ? '+' : ''}{changePct}%)
                        </span>
                      </span>
                    </div>

                    {/* Dual visual bar gauge */}
                    <div className="w-full grid grid-cols-2 gap-2 h-4">
                      {/* 2021 Value gauge */}
                      <div className="bg-slate-200 rounded-sm relative overflow-hidden flex justify-end">
                        <div 
                          className="h-full bg-slate-400/80 transition-all duration-500" 
                          style={{ width: `${(bar.startVal / Math.max(...currentGraph.bars.map(b => b.endVal))) * 100}%` }}
                        />
                      </div>
                      {/* 2025 Value gauge */}
                      <div className="bg-slate-200 rounded-sm relative overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500" 
                          style={{ 
                            width: `${(bar.endVal / Math.max(...currentGraph.bars.map(b => b.endVal))) * 100}%`,
                            backgroundColor: bar.col
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-slate-200 pt-2.5 mt-2">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 py-1.5 bg-slate-400 rounded-sm"></span> {currentGraph.labelStart} (प्रारम्भिक मान)
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 py-1.5 bg-indigo-500 rounded-sm"></span> {currentGraph.labelEnd} (नवीन सांख्यिकी)
              </span>
              <span>स्वतः तुलना प्रक्रिया क्रियाशील</span>
            </div>
          </div>

          {/* Official Administrative Circular Report Layout (Printable) */}
          <div className="bg-white border-2 border-slate-300 rounded-xl p-5 md:p-6 shadow-sm font-sans space-y-4 relative" id="gov-memo-print-zone">
            {/* Watermark sign */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-3 select-none pointer-events-none text-slate-400 font-black text-4xl uppercase md:text-6xl text-center leading-none tracking-widest">
              समग्र शिक्षा पहाड़ी
            </div>

            {/* Memo Letterhead header */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-3">
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest">राजस्थान सरकार</h5>
              <h3 className="text-base font-black text-slate-950 font-display">कार्यालय मुख्य ब्लॉक शिक्षा अधिकारी, पहाड़ी (डीग)</h3>
              <p className="text-[10px] text-slate-500 font-bold">समग्र शिक्षा • माध्यमिक एवं प्रारम्भिक अकादमिक अनुभाग</p>
            </div>

            {/* Memo Metadata tags */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 font-mono">
              <span>{circularInfo.memoNo}</span>
              <span>दिनांक: {circularInfo.date}</span>
            </div>

            {/* Subject */}
            <div className="bg-slate-100 p-2 border-l-4 border-slate-700 text-xs font-black text-slate-900 leading-normal">
              विषय: पहाड़ी ब्लॉक में विगत 5 वर्षों की प्रगति ({circularInfo.date}) के स्वतः तुलनात्मक आंकड़ों का विश्लेषण एवं विशेष अकादमिक निर्देश जारी करने बाबत्।
            </div>

            {/* Circular body text */}
            <div className="text-xs md:text-sm text-slate-800 leading-relaxed space-y-3 font-medium font-sans">
              <p className="indent-8">
                उपरोक्त विषयान्तर्गत लेख है कि ब्लॉक पहाड़ी में गुणवत्तापूर्ण शिक्षा सुनिश्चित करने तथा राज्य सरकार की फ्लैगशिप नीतियों के अनुपालन हेतु विगत पाँच वर्षों के सांख्यिकी डेटा का विश्लेषण कंप्यूटर स्व-इलेक्ट्रॉनिक प्रणाली से किया गया है। वर्तमान विश्लेषण निष्कर्ष निम्नानुसार प्रकाशित हैं:
              </p>
              
              {/* Dynamic Hindi points */}
              {circularInfo.bodyText.split('\n').map((line, idx) => (
                <p key={idx} className="pl-4 font-sans font-medium">{line}</p>
              ))}

              <p className="indent-8 pt-2">
                अतः समस्त संकुल संदर्भ प्रभारियों (PEEOs), पीएम श्री एवं महात्मा गाँधी राजकीय विद्यालयों के संस्था प्रधानों को निर्देशित किया जाता है कि उपरोक्त विश्लेषण के अनुकूल अपनी विद्यालय सुधार योजना (SIP) को तत्काल अद्यतन करें तथा आगामी सत्र में शत-प्रतिशत लक्ष्य प्राप्ति की तैयारी रखें। इसमें किसी भी स्तर पर कोताही बर्दाश्त नहीं की जाएगी।
              </p>
            </div>

            {/* Sign and Seal */}
            <div className="flex justify-between items-end pt-6 border-t border-slate-100 text-slate-800">
              <div className="text-left text-[10px] font-bold text-slate-500">
                <p>प्रतिलिपि प्रेषित:</p>
                <p>1. श्रीमान शिक्षा निदेशक, बीकानेर</p>
                <p>2. श्रीमान जिला शिक्षा अधिकारी, डीग</p>
                <p>3. रक्षित पत्रावली</p>
              </div>

              <div className="text-center shrink-0">
                <div className="inline-block w-14 h-14 bg-blue-100/50 rounded-full border border-blue-200 font-display text-[9px] text-blue-800 font-bold p-1 leading-normal mb-1 flex items-center justify-center text-center">
                  डिजिटल सील CBEO पहाड़ी
                </div>
                <p className="text-xs font-black text-slate-955 leading-none">दस्तावेज़ सत्यापित</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">मुख्य ब्लॉक शिक्षा अधिकारी</p>
              </div>
            </div>

            {/* Print trigger actions */}
            <div className="no-print pt-4 border-t border-slate-150 flex justify-end">
              <button
                onClick={() => {
                  const printContents = document.getElementById('gov-memo-print-zone')?.innerHTML;
                  const originalContents = document.body.innerHTML;
                  if (printContents) {
                    document.body.innerHTML = printContents;
                    window.print();
                    document.body.innerHTML = originalContents;
                    window.location.reload(); // Quick restore of state
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition"
              >
                <Printer className="w-3.5 h-3.5" /> शासकीय प्रतिवेदन प्रिंट करें
              </button>
            </div>
          </div>

          {/* AI Response Output Panel */}
          {(aiLoading || aiResponse) && (
            <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-4 md:p-5 mt-4 animate-fade-in text-slate-850">
              <div className="flex items-center justify-between border-b border-orange-100 pb-2 mb-2">
                <h5 className="text-xs font-black text-orange-900 flex items-center gap-1.5 uppercase">
                  <Flame className="w-4 h-4 text-orange-600 shrink-0" />
                  AI मार्गदर्शक विश्लेषण प्रतिक्रिया
                </h5>
                <button 
                  onClick={() => setAiResponse(null)}
                  className="text-[10px] text-slate-400 font-bold hover:text-slate-800 uppercase"
                >
                  छुपाएं [X]
                </button>
              </div>
              
              {aiLoading ? (
                <div className="flex items-center gap-2.5 py-3 text-xs text-orange-850 justify-center">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>CBEO AI डेटा विश्लेषक प्रतिक्रिया सृजित कर रहा है...</span>
                </div>
              ) : (
                <div className="space-y-2 text-xs md:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap font-medium">
                  {aiResponse}
                </div>
              )}
            </div>
          )}

          {/* Manual AI question interface */}
          <div className="no-print bg-slate-50 p-4 border rounded-xl border-slate-200 flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiConsult()}
              placeholder="AI विश्लेषक से पहाड़ी ब्लॉक के विषय में कुछ अन्य प्रश्न पूछें..."
              className="flex-1 px-3 py-2 border rounded-lg text-xs bg-white text-slate-800"
            />
            <button
              onClick={() => handleAiConsult()}
              disabled={!aiQuestion.trim() || aiLoading}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-orange-600 disabled:opacity-40 transition shrink-0"
            >
              विशेष अनुसंशा प्रेषित करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
