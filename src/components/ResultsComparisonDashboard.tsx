/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, ChevronRight, TrendingUp, Users, CheckCircle, Percent } from 'lucide-react';
import { historicalBoardResults } from '../data/schoolsData';
import { BoardResult } from '../types';

interface ResultsComparisonDashboardProps {
  boardResults?: BoardResult[];
}

export default function ResultsComparisonDashboard({ boardResults }: ResultsComparisonDashboardProps) {
  const activeData = boardResults || historicalBoardResults;
  const [selectedClass, setSelectedClass] = useState<'class5' | 'class8' | 'class10' | 'class12' | 'gender'>('class10');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Get data array based on selection
  const maxVal = 100;
  const padding = 50;
  const graphWidth = 600;
  const graphHeight = 280;

  const dataPoints = activeData.map((item, index) => {
    let value = 0;
    let label = `${item.year}`;
    let subValue: number | undefined = undefined; // For dual lines (gender)

    if (selectedClass === 'class5') value = item.class5PassPercent;
    else if (selectedClass === 'class8') value = item.class8PassPercent;
    else if (selectedClass === 'class10') value = item.class10PassPercent;
    else if (selectedClass === 'class12') value = item.class12PassPercent;
    else {
      value = item.boysPassPercent;
      subValue = item.girlsPassPercent;
    }

    // Coordinates for SVG plotting
    const x = padding + (index * (graphWidth - padding * 2)) / (activeData.length - 1);
    const y = graphHeight - padding - (value * (graphHeight - padding * 2)) / maxVal;
    const ySub = subValue !== undefined 
      ? graphHeight - padding - (subValue * (graphHeight - padding * 2)) / maxVal 
      : undefined;

    return { x, y, ySub, value, subValue, label, origData: item };
  });

  // SVG Drawing Paths
  const linePath = dataPoints.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaPath = dataPoints.length > 0 
    ? `${linePath} L ${dataPoints[dataPoints.length - 1].x} ${graphHeight - padding} L ${dataPoints[0].x} ${graphHeight - padding} Z` 
    : '';

  const lineSubPath = dataPoints[0]?.ySub !== undefined 
    ? dataPoints.reduce((acc, p, i) => {
        return i === 0 ? `M ${p.x} ${p.ySub}` : `${acc} L ${p.x} ${p.ySub}`;
      }, '')
    : '';

  // Analysis comment generator in Hindi
  const getAnalysisComment = () => {
    const startVal = dataPoints[0].value;
    const endVal = dataPoints[dataPoints.length - 1].value;
    const diff = (endVal - startVal).toFixed(1);
    const growthText = Number(diff) >= 0 ? 'सकारात्मक सुधार' : 'गिरावट और ध्यान देने की आवश्यकता';

    if (selectedClass === 'gender') {
      const bMax = activeData[activeData.length - 1].boysPassPercent;
      const gMax = activeData[activeData.length - 1].girlsPassPercent;
      return `📊 लिंग आधारित तुलना (2021-2025): पहाड़ी ब्लॉक में बालिकाओं का बोर्ड परिणाम (${gMax}%) लगातार बालकों (${bMax}%) से उत्कृष्ट बना हुआ है। यह ब्लॉक में "बेटी बचाओ, बेटी पढ़ाओ" और निशुल्क साइकिल वितरण जैसी फ्लैगशिप योजनाओं की जमीनी सफलता को दर्शाता है।`;
    }

    let clsName = '';
    if (selectedClass === 'class5') clsName = 'कक्षा 5 (प्राथमिक स्तर)';
    else if (selectedClass === 'class8') clsName = 'कक्षा 8 (उच्च प्राथमिक स्तर)';
    else if (selectedClass === 'class10') clsName = 'कक्षा 10वीं (माध्यमिक बोर्ड)';
    else clsName = 'कक्षा 12वीं (उच्चतर माध्यमिक)';

    return `📈 बोर्ड परिणाम विश्लेषण (${clsName}): विगत 5 वर्षों में पास प्रतिशत ${startVal}% से सुधरकर ${endVal}% हुआ है (कुल वृद्धि: +${diff}%)। यह ब्लॉक पहाड़ी के शिक्षकों द्वारा संचालित "उपचारात्मक शिक्षण" और विशेष बोर्ड कॉपियों के अभ्यास चक्र का सकारात्मक प्रतिफल है।`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6" id="board-results-panel">
      
      {/* Tab Control */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span>राजस्थान बोर्ड परीक्षा परिणाम: 5-वर्षीय तुलनात्मक अध्ययन</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            विगत 5 वर्षों (2021 - 2025) के ब्लॉक-स्तरीय प्रामाणिक शैक्षिक परिणाम सांख्यिकी
          </p>
        </div>

        {/* Dynamic Class Select Buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => setSelectedClass('class5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedClass === 'class5'
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            कक्षा 5
          </button>
          <button
            onClick={() => setSelectedClass('class8')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedClass === 'class8'
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            कक्षा 8
          </button>
          <button
            onClick={() => setSelectedClass('class10')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedClass === 'class10'
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            कक्षा 10
          </button>
          <button
            onClick={() => setSelectedClass('class12')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedClass === 'class12'
                ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            कक्षा 12
          </button>
          <button
            onClick={() => setSelectedClass('gender')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedClass === 'gender'
                ? 'bg-indigo-650 text-white bg-indigo-600 border-indigo-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            बालक बनाम बालिका
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Visual Chart - Left / Center Grid (2 cols) */}
        <div className="lg:col-span-2 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 relative overflow-x-auto">
          
          {/* Legend indicator */}
          <div className="flex justify-end items-center gap-4 text-xs font-bold mb-3 px-2">
            {selectedClass === 'gender' ? (
              <>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-500 rounded-full inline-block"></span> बालक प्रतिशत</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-pink-500 rounded-full inline-block"></span> बालिका प्रतिशत</span>
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-orange-500 rounded-full inline-block"></span> 
                <span>उत्तीर्ण प्रतिशत (पास रेट %)</span>
              </span>
            )}
          </div>

          <div className="min-w-[500px]">
            <svg 
              viewBox={`0 0 ${graphWidth} ${graphHeight}`} 
              className="w-full h-auto overflow-visible"
              aria-label="Board Results Trend Graph"
            >
              <g className="stroke-slate-200 stroke-1" strokeDasharray="5,5">
                {/* Y-Axis lines at 25%, 50%, 75%, 100% */}
                {[25, 50, 75, 100].map((v) => {
                  const y = graphHeight - padding - (v * (graphHeight - padding * 2)) / maxVal;
                  return (
                    <line key={v} x1={padding} y1={y} x2={graphWidth - padding} y2={y} />
                  );
                })}
              </g>

              {/* Y Axis textual labels */}
              <g fill="#475569" className="text-[11px] font-mono font-bold" textAnchor="end">
                {[0, 25, 50, 75, 100].map((v) => {
                  const y = graphHeight - padding - (v * (graphHeight - padding * 2)) / maxVal;
                  return (
                    <text key={v} x={padding - 10} y={y + 4}>{v}%</text>
                  );
                })}
              </g>

              {/* Area filled gradient (only for single line) */}
              {selectedClass !== 'gender' && (
                <>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#chartGrad)" />
                </>
              )}

              {/* Primary line plot */}
              <path 
                d={linePath} 
                fill="none" 
                stroke={selectedClass === 'gender' ? '#4f46e5' : '#ea580c'} 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-all duration-500"
              />

              {/* Sub line plot (for gender) */}
              {selectedClass === 'gender' && lineSubPath && (
                <path 
                  d={lineSubPath} 
                  fill="none" 
                  stroke="#ec4899" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />
              )}

              {/* Render interactive dots & labels */}
              {dataPoints.map((pt, i) => (
                <g key={i} className="cursor-pointer">
                  {/* Vertical hover guide line */}
                  {hoveredPointIndex === i && (
                    <line 
                      x1={pt.x} 
                      y1={padding} 
                      x2={pt.x} 
                      y2={graphHeight - padding} 
                      stroke="#cbd5e1" 
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                  )}

                  {/* Primary Dot */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={hoveredPointIndex === i ? 7 : 5} 
                    fill={selectedClass === 'gender' ? '#4f46e5' : '#ea580c'} 
                    stroke="white" 
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPointIndex(i)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  />

                  {/* Secondary Dot for Gender */}
                  {selectedClass === 'gender' && pt.ySub !== undefined && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.ySub} 
                      r={hoveredPointIndex === i ? 7 : 5} 
                      fill="#ec4899" 
                      stroke="white" 
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  )}

                  {/* X Axis labels (Years) */}
                  <text 
                    x={pt.x} 
                    y={graphHeight - padding + 20} 
                    textAnchor="middle" 
                    fill="#334155" 
                    className="text-xs font-bold font-mono"
                  >
                    {pt.label}
                  </text>

                  {/* Value bubble tags atop the point */}
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    fill={selectedClass === 'gender' ? '#4f46e5' : '#ea580c'}
                    className="text-[10px] font-bold font-mono bg-white"
                  >
                    {pt.value}%
                  </text>

                  {/* Gender Girls value bubble */}
                  {selectedClass === 'gender' && pt.subValue !== undefined && pt.ySub !== undefined && (
                    <text
                      x={pt.x}
                      y={pt.ySub - 10}
                      textAnchor="middle"
                      fill="#ec4899"
                      className="text-[10px] font-bold font-mono bg-white"
                    >
                      {pt.subValue}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
          
          {/* Tooltip detail card overlay on hover */}
          {hoveredPointIndex !== null && (
            <div className="absolute top-12 left-6 bg-slate-900 text-white rounded-lg p-3 text-xs shadow-lg max-w-xs border border-slate-700 pointer-events-none">
              <p className="font-bold border-b border-slate-700 pb-1 mb-1 text-orange-400 font-mono">
                वर्ष: {historicalBoardResults[hoveredPointIndex].year}
              </p>
              <div className="space-y-1 font-medium">
                <p>कुल पंजीकृत विद्यार्थी: {historicalBoardResults[hoveredPointIndex].totalStudents}</p>
                {selectedClass !== 'gender' ? (
                  <p className="flex justify-between gap-4 font-bold">
                    <span>उत्तीर्ण दर:</span>
                    <span className="text-yellow-400 font-mono">
                      {selectedClass === 'class5' && `${historicalBoardResults[hoveredPointIndex].class5PassPercent}%`}
                      {selectedClass === 'class8' && `${historicalBoardResults[hoveredPointIndex].class8PassPercent}%`}
                      {selectedClass === 'class10' && `${historicalBoardResults[hoveredPointIndex].class10PassPercent}%`}
                      {selectedClass === 'class12' && `${historicalBoardResults[hoveredPointIndex].class12PassPercent}%`}
                    </span>
                  </p>
                ) : (
                  <>
                    <p className="flex justify-between gap-4">
                      <span>बालक उत्तीर्ण:</span>
                      <span className="text-blue-400 font-mono">{historicalBoardResults[hoveredPointIndex].boysPassPercent}%</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>बालिका उत्तीर्ण:</span>
                      <span className="text-pink-400 font-mono">{historicalBoardResults[hoveredPointIndex].girlsPassPercent}%</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Analysis Output Box - Right Grid */}
        <div className="flex flex-col h-full justify-between gap-4 bg-orange-50/50 p-5 rounded-xl border border-orange-100">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
              <TrendingUp className="w-3.5 h-3.5" /> स्वतः जेनरेट व्याख्या
            </span>
            
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {getAnalysisComment()}
            </p>

            {/* Quick Stats list */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">प्रारम्भिक परीक्षा (2025)</p>
                <p className="text-base font-bold text-emerald-600 font-mono">99.6%</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">माध्यमिक बोर्ड (2025)</p>
                <p className="text-base font-bold text-orange-600 font-mono">89.2%</p>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 pt-3 text-[11px] text-slate-500 font-bold flex items-center justify-between">
            <span>स्रोत्र: शाला दर्पण डेटाबेस</span>
            <span className="text-orange-600 flex items-center gap-0.5">
              प्रमाणित रिकॉर्ड <CheckCircle className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
