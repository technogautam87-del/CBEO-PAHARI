/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock, Bell, Shield, MapPin, Upload, Lock, Unlock } from 'lucide-react';

interface AdministrativeHeaderProps {
  shalaDarpanCode?: string;
  announcements?: string[];
  isUnlocked?: boolean;
  setIsUnlocked?: (val: boolean) => void;
  cmPhotoUrl?: string;
  setCmPhotoUrl?: (url: string) => void;
  minPhotoUrl?: string;
  setMinPhotoUrl?: (url: string) => void;
}

export default function AdministrativeHeader({ 
  shalaDarpanCode = '8203', 
  announcements,
  isUnlocked = false,
  setIsUnlocked,
  cmPhotoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bhajan_Lal_Sharma_in_2024.jpg/250px-Bhajan_Lal_Sharma_in_2024.jpg',
  setCmPhotoUrl,
  minPhotoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Madan_Dilawar_in_2024.jpg/250px-Madan_Dilawar_in_2024.jpg',
  setMinPhotoUrl
}: AdministrativeHeaderProps) {
  const [time, setTime] = useState<string>('');
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  const handlePhotoClick = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault();
      const p = prompt('🔒 सुरक्षा लॉक: मुख्यमंत्री या मन्त्रिमण्डल की आधिकारिक तस्वीर अथवा प्रशासनिक विवरण बदलने के लिए कृपया 4-अंकीय प्रवेश कोड प्रविष्ट करें:');
      if (p === '2026') {
        if (setIsUnlocked) {
          setIsUnlocked(true);
          localStorage.setItem('did_unlock_editor', 'true');
          alert('🔑 सफलता: डेटा संशोधन पैनल अनलॉक हो गया है! अब आप यहाँ तस्वीर अथवा पूरा सिस्टम डेटा संपादन कर सकते हैं। तस्वीर बदलने के लिए कृपया पुनः तस्वीर पर क्लिक करें।');
        }
      } else if (p !== null) {
        alert('❌ त्रुटि: अमान्य पिन कोड! कृपया सही पिन प्रविष्ट करें।');
      }
    }
  };

  const notifications = announcements && announcements.length > 0 ? announcements : [
    '✨ नया: बोर्ड परीक्षा परिणाम 2025 में ब्लॉक पहाड़ी ने दर्ज की 92.6% की ऐतिहासिक सफलता।',
    '📢 आवश्यक: मुख्यमंत्री निःशुल्क यूनिफॉर्म वितरण योजनान्तर्गत नवीन सत्र की प्रविष्टियां शाला दर्पण पर पूर्ण करें।',
    '🎓 सत्र 2024-25 के लिए उत्कृष्ट गार्गी पुरस्कार वितरण समारोह शीघ्र ही आयोजित होगा।',
    '🌱 "स्मार्ट स्कूल - हरा स्कूल" पहल के अंतर्गत 14 विद्यालयों में सोलर ऊर्जा प्रणालियाँ सफलतापूर्वक चालू की गईं।'
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      const formattedTime = now.toLocaleTimeString('hi-IN', options);
      const formattedDate = now.toLocaleDateString('hi-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setTime(`${formattedDate} | ${formattedTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <header className="w-full bg-white border-b-4 border-orange-500 shadow-sm sticky top-0 z-50 no-print" id="cbeo-header">
      {/* Upper bar with Live Clock & Government ribbon */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 font-medium">
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Unlock className="w-3 h-3 animate-pulse" /> UNLOCKED / संपादन चालू
            </span>
          ) : (
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wider uppercase animate-pulse">
              LIVE PORTAL
            </span>
          )}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>भारतीय मानक समय (IST):</span>
            <span className="text-white font-mono font-medium">{time || 'लोड हो रहा है...'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-300 text-[11px]">
          {isUnlocked && (
            <button
              onClick={() => {
                if (setIsUnlocked) {
                  setIsUnlocked(false);
                  localStorage.removeItem('did_unlock_editor');
                  alert('🔒 सुरक्षा लॉक: संशोधन पैनल को पुनः सफलता पूर्वक लॉक कर दिया गया है!');
                }
              }}
              className="bg-red-650 hover:bg-red-700 bg-red-650 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[10px] font-black flex items-center gap-1 cursor-pointer mr-2 animate-pulse transition shrink-0 border border-red-500"
              title="पैनल को सुरक्षित लॉक करें"
            >
              <Lock className="w-3 h-3" /> सुरक्षित लॉक करें
            </button>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-400" /> ब्लॉक पहाड़ी, जिला - डीग (राजस्थान)
          </span>
          <span className="hidden sm:inline border-l border-slate-700 h-3"></span>
          <span className="hidden sm:inline">ई-मेल: cbeopahari2@gmail.com</span>
        </div>
      </div>

      {/* Main Administrative branding panel - Centered Title & Left-Right Photos */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 grid grid-cols-1 md:grid-cols-5 items-center gap-6">
        
        {/* Left: Photo of CM Bhajan Lal Sharma */}
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="relative group/portrait">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-25 group-hover/portrait:opacity-55 transition duration-300 animate-pulse"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-100 shadow-md">
              <img 
                src={cmPhotoUrl} 
                alt="श्री भजन लाल शर्मा" 
                className="w-full h-full object-cover object-top scale-105"
                referrerPolicy="no-referrer"
              />
              <label 
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-205 select-none"
              >
                <Upload className="w-4 h-4 text-amber-400 font-bold" />
                <span className="text-[8px] font-black mt-1 text-center px-1">
                  {isUnlocked ? 'तस्वीर बदलें' : 'तस्वीर बदलें 🔒'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!isUnlocked}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && setCmPhotoUrl) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          setCmPhotoUrl(reader.result);
                          localStorage.setItem('cm_photo_url', reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <span 
              onClick={handlePhotoClick}
              className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full text-[9px] shadow border border-white font-bold cursor-pointer transition hover:scale-110"
              title={isUnlocked ? "तस्वीर बदलें" : "अनलॉक करने की आवश्यकता है 🔒"}
            >
              {isUnlocked ? '✎' : '🔒'}
            </span>
          </div>
          <div className="mt-1.5 leading-tight">
            <p className="text-xs font-black text-slate-900 font-sans">श्री भजन लाल शर्मा</p>
            <p className="text-[10px] font-bold text-orange-600">माननीय मुख्यमंत्री, राज.</p>
          </div>
        </div>

        {/* Center: National / State Crest representation & Title */}
        <div className="md:col-span-3 flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-amber-50 rounded-full border border-amber-200 shadow-inner flex items-center justify-center p-1.5 shrink-0">
            <div className="flex flex-col items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600 stroke-[1.5]" />
              <span className="text-[6px] font-bold text-amber-800 -mt-0.5 font-display">राज. सरकार</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[10px] md:text-xs bg-slate-100 text-slate-700 font-extrabold px-2.5 py-0.5 rounded border border-slate-200">
                स्कूल शिक्षा विभाग, राजस्थान
              </span>
              <span className="text-[10px] md:text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-100">
                शाला दर्पण कोड: {shalaDarpanCode}
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-950 font-display tracking-tight">
              कार्यालय : मुख्य ब्लॉक शिक्षा अधिकारी
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-orange-600 font-extrabold tracking-tight">
              समग्र शिक्षा (Samagra Shiksha), ब्लॉक पहाड़ी, जिला - डीग (राजस्थान) - 321024
            </p>
          </div>
        </div>

        {/* Right: Photo of Rajasthan Education Minister Madan Dilawar */}
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="relative group/portrait">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-25 group-hover/portrait:opacity-55 transition duration-300 animate-pulse"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-100 shadow-md">
              <img 
                src={minPhotoUrl} 
                alt="श्री मदन दिलावर" 
                className="w-full h-full object-cover object-top scale-105"
                referrerPolicy="no-referrer"
              />
              <label 
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-205 select-none"
              >
                <Upload className="w-4 h-4 text-amber-400 font-bold" />
                <span className="text-[8px] font-black mt-1 text-center px-1">
                  {isUnlocked ? 'तस्वीर बदलें' : 'तस्वीर बदलें 🔒'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!isUnlocked}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && setMinPhotoUrl) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          setMinPhotoUrl(reader.result);
                          localStorage.setItem('min_photo_url', reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <span 
              onClick={handlePhotoClick}
              className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full text-[9px] shadow border border-white font-bold cursor-pointer transition hover:scale-110"
              title={isUnlocked ? "तस्वीर बदलें" : "अनलॉक करने की आवश्यकता है 🔒"}
            >
              {isUnlocked ? '✎' : '🔒'}
            </span>
          </div>
          <div className="mt-1.5 leading-tight">
            <p className="text-xs font-black text-slate-900 font-sans">श्री मदन दिलावर</p>
            <p className="text-[10px] font-bold text-orange-600">माननीय शिक्षा मंत्री, राज.</p>
          </div>
        </div>

      </div>

      {/* Announcements Bar / News Ticker */}
      <div className="bg-orange-50 border-t border-b border-orange-100 py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1 shrink-0 animate-pulse shadow-sm">
            <Bell className="w-3.5 h-3.5" />
            <span>ताज़ा घोषणा:</span>
          </div>
          <div className="flex-1 overflow-hidden h-5 relative flex items-center">
            <div className="text-xs md:text-sm text-slate-800 font-black whitespace-nowrap overflow-ellipsis">
              {notifications[currentNotificationIndex]}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 justify-end text-right text-[10px] text-orange-700 font-bold">
            <span>कुल घोषणाएं: {notifications.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
