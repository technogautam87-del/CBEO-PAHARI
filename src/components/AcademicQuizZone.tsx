/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Gamepad2, Award, CheckCircle2, XCircle, RotateCcw, ShieldCheck, Printer, HelpCircle } from 'lucide-react';
import { quizQuestions } from '../data/schoolsData';

export default function AcademicQuizZone() {
  const [activeClassTab, setActiveClassTab] = useState<'3-5' | '6-8' | '9-12'>('3-5');
  const [gameMode, setGameMode] = useState<'quiz' | 'math' | 'vocab'>('quiz');
  
  // States for Quiz
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnsIndex, setSelectedAnsIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // States for Math Wizard
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(4);
  const [mathOp, setMathOp] = useState<'+' | '*'>('+');
  const [childAns, setChildAns] = useState('');
  const [mathScore, setMathScore] = useState(0);
  const [mathCount, setMathCount] = useState(0);
  const [mathFeedback, setMathFeedback] = useState<{ isCorrect: boolean, msg: string } | null>(null);

  // States for Vocab Map Game
  const [vocabPairs, setVocabPairs] = useState<Array<{ eng: string; hin: string; id: number; matched: boolean }>>([]);
  const [selectedEng, setSelectedEng] = useState<string | null>(null);
  const [selectedHin, setSelectedHin] = useState<string | null>(null);
  const [vocabScore, setVocabScore] = useState(0);
  const [vocabCompleted, setVocabCompleted] = useState(false);

  // State for printable Certificate
  const [studentName, setStudentName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const filteredQuizQuestions = quizQuestions.filter(q => q.classLevel === activeClassTab);

  // Restart Quiz
  const handleRestartQuiz = () => {
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedAnsIndex(null);
    setQuizSubmitted(false);
    setQuizCompleted(false);
    setShowCertificate(false);
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnsIndex(null);
    setQuizSubmitted(false);
    if (currentQuizIndex < filteredQuizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleQuizAnswerSelect = (index: number) => {
    if (quizSubmitted) return;
    setSelectedAnsIndex(index);
  };

  const handleQuizSubmit = () => {
    if (selectedAnsIndex === null || quizSubmitted) return;
    
    const correctIdx = filteredQuizQuestions[currentQuizIndex].correctAnswerIndex;
    if (selectedAnsIndex === correctIdx) {
      setQuizScore(prev => prev + 1);
    }
    setQuizSubmitted(true);
  };

  // Math Wizard Game Generative Engine
  const generateMathProblem = () => {
    setChildAns('');
    setMathFeedback(null);
    let n1 = 0, n2 = 0;
    if (activeClassTab === '3-5') {
      n1 = Math.floor(Math.random() * 9) + 1;
      n2 = Math.floor(Math.random() * 9) + 1;
      setMathOp('+');
    } else if (activeClassTab === '6-8') {
      n1 = Math.floor(Math.random() * 25) + 5;
      n2 = Math.floor(Math.random() * 15) + 5;
      setMathOp(Math.random() > 0.5 ? '+' : '*');
    } else {
      n1 = Math.floor(Math.random() * 50) + 10;
      n2 = Math.floor(Math.random() * 19) + 2;
      setMathOp('*');
    }
    setNum1(n1);
    setNum2(n2);
  };

  useEffect(() => {
    generateMathProblem();
    initializeVocabGame();
  }, [activeClassTab, gameMode]);

  const handleMathCheck = () => {
    const parsed = parseInt(childAns);
    if (isNaN(parsed)) return;

    const correctAnswer = mathOp === '+' ? num1 + num2 : num1 * num2;
    const isCorrect = parsed === correctAnswer;

    if (isCorrect) {
      setMathScore(prev => prev + 1);
      setMathFeedback({ isCorrect: true, msg: '🎉 शाबाश! आपका उत्तर बिलकुल सही है।' });
    } else {
      setMathFeedback({ isCorrect: false, msg: `❌ ओहो! सही उत्तर ${correctAnswer} है। घबराएं नहीं, दोबारा प्रयास करें!` });
    }
    setMathCount(prev => prev + 1);
  };

  // Vocab Match Game initializers
  const vocabLibrary = {
    '3-5': [
      { eng: 'Water', hin: 'पानी', id: 1 },
      { eng: 'Book', hin: 'पुस्तक/किताब', id: 2 },
      { eng: 'School', hin: 'विद्यालय', id: 3 },
      { eng: 'Teacher', hin: 'शिक्षक', id: 4 },
    ],
    '6-8': [
      { eng: 'Environment', hin: 'पर्यावरण', id: 5 },
      { eng: 'Library', hin: 'पुस्तकालय', id: 6 },
      { eng: 'Discipline', hin: 'अनुशासन', id: 7 },
      { eng: 'Knowledge', hin: 'ज्ञान', id: 8 },
    ],
    '9-12': [
      { eng: 'Vocational', hin: 'व्यवसायिक', id: 9 },
      { eng: 'Evaluation', hin: 'मूल्यांकन', id: 10 },
      { eng: 'Innovation', hin: 'नवाचार', id: 11 },
      { eng: 'Administration', hin: 'प्रशासन', id: 12 },
    ]
  };

  const initializeVocabGame = () => {
    const list = vocabLibrary[activeClassTab];
    const initialObj = list.map(item => ({ ...item, matched: false }));
    setVocabPairs(initialObj);
    setSelectedEng(null);
    setSelectedHin(null);
    setVocabScore(0);
    setVocabCompleted(false);
  };

  const handlePairClick = (type: 'eng' | 'hin', value: string) => {
    if (type === 'eng') {
      setSelectedEng(value);
      // Check match imediately if Hin is preselected
      if (selectedHin) {
        verifyVocabMatch(value, selectedHin);
      }
    } else {
      setSelectedHin(value);
      if (selectedEng) {
        verifyVocabMatch(selectedEng, value);
      }
    }
  };

  const verifyVocabMatch = (eng: string, hin: string) => {
    const pair = vocabPairs.find(p => p.eng === eng && p.hin === hin);
    if (pair) {
      setVocabPairs(prev => prev.map(p => p.id === pair.id ? { ...p, matched: true } : p));
      setVocabScore(prev => prev + 10);
      
      const allDone = vocabPairs.every(p => p.id === pair.id ? true : p.matched);
      if (allDone) {
        setVocabCompleted(true);
      }
    }
    // reset selection
    setSelectedEng(null);
    setSelectedHin(null);
  };

  const totalPossibleScore = filteredQuizQuestions.length;
  const isHighScorer = quizScore >= totalPossibleScore - 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6" id="kids-games-panel">
      
      {/* Tab bar header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-rose-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-rose-500" />
            <span>बाल जिज्ञासा एवं ज्ञान क्रीड़ा केंद्र (Games & Quizzes)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            छात्रों के लिए क्लास-वाइज अनुकूलित शैक्षिक क्विज, गणित खेल एवं शब्दावली मिलान
          </p>
        </div>

        {/* Level selection */}
        <div className="flex bg-rose-50 p-1.5 rounded-xl border border-rose-100 shrink-0">
          {(['3-5', '6-8', '9-12'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveClassTab(tab);
                handleRestartQuiz();
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeClassTab === tab
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-800 hover:bg-rose-100'
              }`}
            >
              कक्षा {tab} स्तर
            </button>
          ))}
        </div>
      </div>

      {/* Mini sub-menu of educational games */}
      <div className="flex justify-start gap-2 mb-6 border-b border-dashed border-slate-200 pb-4">
        <button
          onClick={() => setGameMode('quiz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            gameMode === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-705 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> बहुविकल्पीय क्विज
        </button>
        <button
          onClick={() => setGameMode('math')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            gameMode === 'math' ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-705 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          🔢 गणित का जादूगर Challenge
        </button>
        <button
          onClick={() => setGameMode('vocab')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            gameMode === 'vocab' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-705 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          🔠 शब्दावली मिलान
        </button>
      </div>

      {/* GAME RUNTIME CONTAINERS */}
      
      {/* 1. STATE QUIZ CONTROLLER */}
      {gameMode === 'quiz' && (
        <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
          {!quizCompleted ? (
            <div className="space-y-4">
              {/* Question progress */}
              <div className="flex justify-between items-center text-xs font-bold text-indigo-700">
                <span>प्रगति: प्रश्न {currentQuizIndex + 1}/{filteredQuizQuestions.length}</span>
                <span>अंक: {quizScore}</span>
              </div>
              
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300" 
                  style={{ width: `${((currentQuizIndex + 1) / filteredQuizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text in Noto Sans Devanagari */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-3">
                <h4 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                  {filteredQuizQuestions[currentQuizIndex]?.question}
                </h4>
              </div>

              {/* Multiple Choice Answers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {filteredQuizQuestions[currentQuizIndex]?.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50';
                  
                  if (selectedAnsIndex === idx) {
                    btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20';
                  }

                  if (quizSubmitted) {
                    const corrIdx = filteredQuizQuestions[currentQuizIndex].correctAnswerIndex;
                    if (idx === corrIdx) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-505/20';
                    } else if (selectedAnsIndex === idx) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                    } else {
                      btnStyle = 'opacity-60 border-slate-100 bg-slate-50/50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswerSelect(idx)}
                      disabled={quizSubmitted}
                      className={`text-left p-3.5 rounded-xl border-2 text-sm transition focus:outline-none flex gap-3 items-center ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-150 flex items-center justify-center font-bold font-mono shrink-0 text-xs border border-slate-300 bg-slate-100">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnsIndex === null}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 disabled:opacity-40 shadow-sm"
                  >
                    उत्तर जाँचे
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                  >
                    {currentQuizIndex === filteredQuizQuestions.length - 1 ? 'पूर्ण परिणाम देखें' : 'अगला प्रश्न'} ➡️
                  </button>
                )}
              </div>

              {/* Explanatory notes appearing on submission */}
              {quizSubmitted && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 animate-fade-in text-slate-850">
                  <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    📖 स्पष्टीकरण (Explanation):
                  </p>
                  <p className="text-xs md:text-sm mt-1 font-medium leading-relaxed font-sans">
                    {filteredQuizQuestions[currentQuizIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Quiz completed scoreboard summary output
            <div className="text-center py-6 space-y-4">
              <Award className="w-16 h-16 text-rose-500 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-slate-900">क्विज सफलतापूर्वक पूर्ण हुआ! 🎊</h4>
              
              <p className="text-sm font-medium text-slate-600 max-w-sm mx-auto leading-relaxed">
                कक्षा {activeClassTab} स्तर के शैक्षिक क्विज में आपने कुल <strong className="text-slate-900 text-lg font-mono">{filteredQuizQuestions.length}</strong> प्रश्नों में से <strong className="text-emerald-600 text-lg font-mono">{quizScore}</strong> सही उत्तर दिए।
              </p>

              <div className="w-56 bg-slate-200 h-3 rounded-full mx-auto overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full" 
                  style={{ width: `${(quizScore / filteredQuizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Certificate option only for high scores */}
              {isHighScorer ? (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl max-w-sm mx-auto space-y-3">
                  <p className="text-xs text-yellow-800 font-bold">🌟 उत्कृष्ट प्रदर्शन! आप सम्मान प्रमाण पत्र के पात्र हैं।</p>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="विद्यार्थी का नाम दर्ज करें"
                    className="w-full text-center px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                  <button
                    onClick={() => setShowCertificate(true)}
                    disabled={!studentName.trim()}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition"
                  >
                    प्रमाण पत्र जारी करें 🎖️
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500">सम्मान प्रमाण पत्र प्राप्त करने के लिए कम से कम 2 प्रश्नों के सही उत्तर दें।</p>
              )}

              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> पुनः क्विज खेलें
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. MATH WIZARD ACTIVE SCREEN */}
      {gameMode === 'math' && (
        <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200 text-center space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span>कुल हल सवाल: {mathCount}</span>
            <span>कुल सही उत्तर: {mathScore}</span>
          </div>

          <div className="bg-white p-6 max-w-md mx-auto rounded-2xl border-2 border-slate-100 shadow-md">
            <p className="text-xs text-orange-600 font-bold tracking-wider mb-2">गणित का जादूगर - LEVEL: {activeClassTab}</p>
            
            {/* Numeric formulation block */}
            <div className="flex justify-center items-center gap-4 py-4 text-3xl font-black text-slate-800 font-mono">
              <span>{num1}</span>
              <span className="text-orange-500">{mathOp === '*' ? '×' : '+'}</span>
              <span>{num2}</span>
              <span className="text-slate-400">=</span>
              <input
                type="number"
                value={childAns}
                onChange={(e) => setChildAns(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleMathCheck()}
                placeholder="?"
                className="w-20 text-center text-2xl font-black bg-slate-50 border-b-4 border-orange-500 rounded-lg focus:outline-none p-1"
                disabled={mathFeedback !== null}
              />
            </div>

            {/* Answer Feedbacks text */}
            {mathFeedback && (
              <p className={`text-sm font-bold my-2 ${mathFeedback.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                {mathFeedback.msg}
              </p>
            )}

            {/* Actions triggers */}
            <div className="flex justify-center gap-3 mt-4">
              {mathFeedback === null ? (
                <button
                  onClick={handleMathCheck}
                  disabled={!childAns.trim()}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  उत्तर जाँचें 🔎
                </button>
              ) : (
                <button
                  onClick={generateMathProblem}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  अगली चुनौती ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. VOCABULARY MATCH SPLIT INTERACTIVE SCREEN */}
      {gameMode === 'vocab' && (
        <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
          {!vocabCompleted ? (
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-emerald-800">
                <span>अंक: {vocabScore}</span>
                <span>गति: अंग्रेजी से हिन्दी सही अर्थ मिलान करें</span>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                {/* Left English words */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 text-center tracking-wider">ENGLISH TERM</p>
                  {vocabPairs.map(p => (
                    <button
                      key={`eng-${p.id}`}
                      onClick={() => !p.matched && handlePairClick('eng', p.eng)}
                      disabled={p.matched}
                      className={`w-full p-2.5 rounded-lg border text-xs font-bold font-mono transition text-center ${
                        p.matched 
                          ? 'bg-emerald-50 text-emerald-500 border-emerald-200 line-through'
                          : selectedEng === p.eng
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-102'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.eng}
                    </button>
                  ))}
                </div>

                {/* Right Hindi equivalents (shuffled visually since they are static) */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 text-center tracking-wider font-sans">हिन्दी अनुवाद</p>
                  {/* Map over rearranged/paired labels to make it interesting */}
                  {[...vocabPairs].reverse().map(p => (
                    <button
                      key={`hin-${p.id}`}
                      onClick={() => !p.matched && handlePairClick('hin', p.hin)}
                      disabled={p.matched}
                      className={`w-full p-2.5 rounded-lg border text-xs font-bold transition text-center ${
                        p.matched 
                          ? 'bg-emerald-50 text-emerald-500 border-emerald-200 line-through'
                          : selectedHin === p.hin
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-102'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.hin}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-slate-900">अद्भुत! सभी शब्द मिलान पूर्ण हुए। 🎉</h4>
              <p className="text-sm font-semibold text-slate-600">Vocabulary Score: {vocabScore} Points</p>
              <button
                onClick={initializeVocabGame}
                className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg"
              >
                दोबारा मिलान खेलें
              </button>
            </div>
          )}
        </div>
      )}

      {/* RENDER APPRECIATION CERTIFICATE MODAL */}
      {showCertificate && studentName && (
        <div className="no-print mt-6 bg-slate-100 border border-slate-200 p-4 md:p-6 rounded-2xl animate-fade-in relative">
          <button
            onClick={() => setShowCertificate(false)}
            className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            बंद करें [X]
          </button>
          
          <p className="text-center text-xs font-bold text-green-700 uppercase mb-3">🎖️ प्रमाण पत्र तैयार <strong className="animate-pulse">●</strong> (इसे प्रिंट कर सकते हैं)</p>

          <div 
            className="print-only max-w-2xl mx-auto bg-amber-50/40 p-6 md:p-8 rounded-xl border-8 border-double border-amber-600 shadow-md relative overflow-hidden"
            id="appreciation-certificate"
          >
            {/* Watermark Crest representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <Award className="w-[300px] h-[300px] text-amber-500" />
            </div>

            <div className="text-center space-y-4">
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-widest font-sans">
                स्कूल शिक्षा विभाग • राजस्थान सरकार
              </p>
              <h2 className="text-xl md:text-2xl font-black text-amber-900 font-display">
                अकादमिक प्रशस्ति प्रमाण पत्र
              </h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                कार्यालय: मुख्य ब्लॉक शिक्षा अधिकारी, पहाड़ी (डीग)
              </p>

              <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-1"></div>

              <p className="text-sm text-slate-700">यह प्रमाणित किया जाता है कि प्रतिभावान छात्र / छात्रा</p>
              
              <h3 className="text-xl md:text-2xl font-black text-rose-700 font-sans border-b-2 border-dotted border-rose-500 inline-block px-8 py-0.5 my-2">
                {studentName}
              </h3>

              <p className="text-xs md:text-sm text-slate-800 leading-relaxed max-w-md mx-auto font-medium">
                ने ब्लॉक स्तर पर आयोजित <strong className="text-slate-950 font-bold">"जिज्ञासा एवं ज्ञान क्रीड़ा" (Class {activeClassTab})</strong> डिजिटल प्रतियोगिता में सफलतापूर्वक प्रतिभागिता दर्ज कर शत-प्रतिशत उत्कृष्ट प्रदर्शन किया है।
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 text-center border-t border-amber-200/50">
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-bold">सत्र: 2024-25</p>
                  <p className="text-[10px] text-slate-500 font-bold">दिनांक: {new Date().toLocaleDateString('hi-IN')}</p>
                </div>
                <div className="text-right">
                  <div className="h-[25px]"></div> {/* space for sign */}
                  <p className="text-[11px] font-bold text-amber-900 leading-none">मुख्य ब्लॉक शिक्षा अधिकारी</p>
                  <p className="text-[9px] text-slate-500 font-bold mt-1">हस्ताक्षरित डिजिटल प्राधिकृत</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-slate-800"
            >
              <Printer className="w-3.5 h-3.5" /> प्रिंट प्रमाण पत्र
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
