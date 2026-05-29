/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Home, 
  Clipboard, 
  BookOpen, 
  Award, 
  Briefcase, 
  Star, 
  Heart, 
  Flag, 
  Users, 
  Image as ImageIcon, 
  Share2, 
  FileText, 
  LayoutGrid, 
  TrendingUp, 
  ExternalLink, 
  ShieldCheck, 
  CheckSquare, 
  Info, 
  Phone, 
  Mail, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Shirt, 
  Milk, 
  Bike, 
  Laptop, 
  GraduationCap,
  Lock,
  Unlock,
  Save,
  RefreshCw,
  Search
} from 'lucide-react';

// Import subcomponents
import AdministrativeHeader from './components/AdministrativeHeader';
import ResultsComparisonDashboard from './components/ResultsComparisonDashboard';
import AcademicQuizZone from './components/AcademicQuizZone';
import AutoAnalysisReportGroup from './components/AutoAnalysisReportGroup';

// Import data
import { 
  staffMembers, 
  specialSchools, 
  blockStatistics, 
  flagshipSchemes, 
  bestPractices, 
  innovations, 
  stateOfficeLinks, 
  galleryItems,
  historicalBoardResults
} from './data/schoolsData';

type TabType = 
  | 'dashboard' 
  | 'establishment' 
  | 'primary_edu' 
  | 'secondary_edu' 
  | 'vocational_edu' 
  | 'inclusive_edu'
  | 'mdm_page'
  | 'pm_shri' 
  | 'mggs' 
  | 'schemes' 
  | 'office_profile' 
  | 'gallery' 
  | 'social' 
  | 'best_practices' 
  | 'annual_report' 
  | 'innovations' 
  | 'state_links'
  | 'board_results'
  | 'games_quiz'
  | 'auto_analysis'
  | 'circular_orders'
  | 'data_editor';

// Helper component to highlight search terms dynamically
function HighlightText({ text = '', search = '' }: { text?: string; search?: string }) {
  if (!text) return null;
  if (!search.trim()) return <>{text}</>;
  
  // Escaping special characters securely
  const escapedSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearch})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200 text-slate-950 font-bold px-0.5 rounded transition-all duration-150">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Dynamic editable states synced with localStorage
  const [shalaDarpanCode, setShalaDarpanCode] = useState(() => {
    return localStorage.getItem('shala_darpan_code') || '8203';
  });

  const [blockStats, setBlockStats] = useState(() => {
    const saved = localStorage.getItem('block_statistics');
    return saved ? JSON.parse(saved) : blockStatistics;
  });

  const [specialSchs, setSpecialSchs] = useState(() => {
    const saved = localStorage.getItem('special_schools');
    return saved ? JSON.parse(saved) : specialSchools;
  });

  const [schemes, setSchemes] = useState(() => {
    const saved = localStorage.getItem('flagship_schemes');
    return saved ? JSON.parse(saved) : flagshipSchemes;
  });

  const [boardRes, setBoardRes] = useState(() => {
    const saved = localStorage.getItem('board_results');
    return saved ? JSON.parse(saved) : historicalBoardResults;
  });

  const [inclusiveStats, setInclusiveStats] = useState(() => {
    const saved = localStorage.getItem('inclusive_stats');
    return saved ? JSON.parse(saved) : {
      totalCwsn: 214,
      resourceRooms: 2,
      specialEducators: 4,
      equipmentsDistributed: 85,
      escortGirls: 45
    };
  });

  const [mdmStats, setMdmStats] = useState(() => {
    const saved = localStorage.getItem('mdm_stats');
    return saved ? JSON.parse(saved) : {
      coveredSchools: 110,
      dailyBeneficiaries: 16570,
      cookHelpers: 245,
      milkCoverage: '100% प्रविष्टि',
      yearlyBudget: '74.5 लाख'
    };
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem('staff_members');
    return saved ? JSON.parse(saved) : staffMembers;
  });

  const [practices, setPractices] = useState(() => {
    const saved = localStorage.getItem('best_practices');
    return saved ? JSON.parse(saved) : bestPractices;
  });

  const [innovationsList, setInnovationsList] = useState(() => {
    const saved = localStorage.getItem('innovations');
    return saved ? JSON.parse(saved) : innovations;
  });

  const [officeLinks, setOfficeLinks] = useState(() => {
    const saved = localStorage.getItem('office_links');
    return saved ? JSON.parse(saved) : stateOfficeLinks;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('gallery_items');
    return saved ? JSON.parse(saved) : galleryItems;
  });

  const [annualReportStats, setAnnualReportStats] = useState(() => {
    const saved = localStorage.getItem('annual_report_stats');
    return saved ? JSON.parse(saved) : {
      districtRank: '04',
      shalaDarpanEntry: '99.2%',
      girlsLiteracy: '94%',
      targets: [
        { id: 't1', name: 'निशुल्क पोशाक कपड़ा वितरण', target: '16,450 विद्यार्थी', achievement: '99.2%', status: 'सफलतापूर्वक पूर्ण। सत्यापन सुचारू' },
        { id: 't2', name: 'बाल गोपाल दुग्ध मात्रा वितरण', target: '110 विद्यालय', achievement: '100%', status: 'सभी प्राथमिक स्कूलों में दैनिक कवरेज' },
        { id: 't3', name: 'निःशुल्क साइकिल वितरण', target: '1,310 छात्राएं', achievement: '97.7%', status: 'भौतिक रूप से सुपुर्दगी की कॉपियाँ पूर्ण' },
        { id: 't4', name: 'शाला दर्पण डेटाबेस अद्यतनीकरण', target: '100% संकुल', achievement: '99.8%', status: 'समग्र शिक्षक एवं छात्र विवरण दर्ज' }
      ]
    };
  });

  const [officeIntro, setOfficeIntro] = useState(() => {
    return localStorage.getItem('office_intro') || '✔️ अकादमिक व्यवस्था सुदृढ़ संकल्प: शिक्षा विभाग राजस्थान के परिपत्र आदेशानुसार, ब्लॉक पहाड़ी जिला डीग में मुख्य ब्लॉक शिक्षा अधिकारी (CBEO) नोडल प्रभारी कार्यालय के शीर्ष नियंत्रण प्राधिकारी हैं। कार्यालय का प्राथमिक उद्देश्य विद्यालय स्तर पर संचालित योजनाओं की मॉनिटरिंग, अध्यापकों की वेतन संरचना संबंधी वित्तीय नियंत्रण, तथा परीक्षा संचालन सुरक्षा सुनिश्चित करना है।';
  });

  const [socialTweets, setSocialTweets] = useState(() => {
    return localStorage.getItem('social_tweets') || 'विगत बोर्ड सत्र 2024-25 में पहाड़ी ब्लॉक के उत्कृष्ट माध्यमिक परिणाम के लिए समस्त संस्था प्रधानों एवं नोडल विंग को साधुवाद। नए सत्र की नि:शुल्क पाठ्यपुस्तकों की प्रविष्टि शाला दर्पण पर कल सायं तक अनिवार्य रूप से पूर्ण करें। #RajasthanElementaryEducation';
  });

  const [socialFbFeed, setSocialFbFeed] = useState(() => {
    return localStorage.getItem('social_fb_feed') || 'आज दिनांक को ब्लॉक पहाड़ी के पीएम श्री राजकीय उच्च माध्यमिक विद्यालय में "पर्यावरण दिवस" वृक्षारोपण एवं हरित विद्यालय अभियान के तहत सोलर प्लांट सौर ऊर्जा संयत्र का सफल चेकिंग निरीक्षण किया गया। इस अवसर पर PEEOs और बाल कैबिनेट के नागरिक उपस्थित रहे। म्हारो राजस्थान, हरित राजस्थान। 🌱🇲🇳';
  });

  const [socialYoutubeTitle1, setSocialYoutubeTitle1] = useState(() => {
    return localStorage.getItem('social_yt_title1') || 'शाला दर्पण शिक्षक हाजिरी कैसे भरें (Step-by-step)';
  });

  const [socialYoutubeTitle2, setSocialYoutubeTitle2] = useState(() => {
    return localStorage.getItem('social_yt_title2') || 'मुख्यमंत्री बाल गोपाल दूध मात्रा प्रविष्टि दिशा निर्देश';
  });

  // Dynamic news announcements
  const [announcements, setAnnouncements] = useState<string[]>(() => {
    const saved = localStorage.getItem('portal_announcements');
    return saved ? JSON.parse(saved) : [
      '✨ नया: बोर्ड परीक्षा परिणाम 2025 में ब्लॉक पहाड़ी ने दर्ज की 92.6% की ऐतिहासिक सफलता।',
      '📢 आवश्यक: मुख्यमंत्री निःशुल्क यूनिफॉर्म वितरण योजनान्तर्गत नवीन सत्र की प्रविष्टियां शाला दर्पण पर पूर्ण करें।',
      '🎓 सत्र 2024-25 के लिए उत्कृष्ट गार्गी पुरस्कार वितरण समारोह शीघ्र ही आयोजित होगा।',
      '🌱 "स्मार्ट स्कूल - हरा स्कूल" पहल के अंतर्गत 14 विद्यालयों में सोलर ऊर्जा प्रणालियाँ सफलतापूर्वक चालू की गईं।'
    ];
  });

  // Dynamic Circulars & Orders from Google Drive
  const [circularOrders, setCircularOrders] = useState(() => {
    const saved = localStorage.getItem('circular_orders_list');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-1',
        title: 'सत्र 2024-25 में महात्मा गांधी अंग्रेजी माध्यम विद्यालयों में रिक्त सीट काउंसलिंग आवंटन आदेश (विशेष काउंसलिंग)',
        date: '2026-05-20',
        category: 'स्थापना एवं प्रवेश',
        driveLink: 'https://drive.google.com/drive/folders/representative1'
      },
      {
        id: 'ord-2',
        title: 'नवीन शिक्षा सत्र में गार्गी पुरस्कार द्वितीय किश्त वितरण सत्यापन प्रमाण पत्र दिशानिर्देश एवं आदेश',
        date: '2026-05-18',
        category: 'अकादमिक योजना',
        driveLink: 'https://drive.google.com/drive/folders/representative2'
      },
      {
        id: 'ord-3',
        title: 'ब्लॉक स्तरीय पीएम श्री विद्यालयों में सोलर प्लांट और स्मार्ट शाला उपकरणों की त्रैमासिक भौतिक सत्यापन रिपोर्ट प्रपत्र',
        date: '2026-05-15',
        category: 'विशेष प्रोजेक्ट',
        driveLink: 'https://drive.google.com/drive/folders/representative3'
      },
      {
        id: 'ord-4',
        title: 'प्रारम्भिक राजकीय विद्यालयों हेतु बाल गोपाल दूध योजना साप्ताहिक संधारण पंजीकरण प्रविष्टि प्रारूप',
        date: '2026-05-10',
        category: 'मिड-डे मील',
        driveLink: 'https://drive.google.com/drive/folders/representative4'
      }
    ];
  });

  // Primary shared drive URL
  const [globalDriveFolder, setGlobalDriveFolder] = useState(() => {
    return localStorage.getItem('global_drive_folder') || 'https://drive.google.com/drive/folders/1A_uWlh1r8W_example_cbeo_pahari';
  });

  // Education Quotes active index state
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  const educationQuotes = [
    {
      text: "शिक्षा का उद्देश्य एक सुसंस्कृत मानव का निर्माण करना है, जो दूसरों के प्रति संवेदनशील हो और जिसका चरित्र उज्ज्वल हो।",
      author: "डॉ. सर्वपल्ली राधाकृष्णन",
      designation: "पूर्व राष्ट्रपति एवं महान भारतीय शिक्षाविद्"
    },
    {
      text: "वास्तविक शिक्षक वे हैं जो हमें खुद के बारे में सोचने में मदद करते हैं। अपनी क्षमता को पहचानना ही सच्ची समझ है।",
      author: "डॉ. सर्वपल्ली राधाकृष्णन",
      designation: "पूर्व राष्ट्रपति एवं महान दार्शनिक"
    },
    {
      text: "ज्ञान हमें शक्ति देता है, लेकिन प्रेम और करुणा हमें एक चरित्र प्रदान करते हैं जो समाज को संवारता है।",
      author: "डॉ. सर्वपल्ली राधाकृष्णन",
      designation: "महान विचारक"
    },
    {
      text: "शिक्षा केवल आजीविका कमाने का साधन नहीं है, बल्कि यह आत्मा को जाग्रत करने का अनवरत प्रयास है।",
      author: "डॉ. ए. पी. जे. अब्दुल कलाम",
      designation: "महान वैज्ञानिक एवं भूतपूर्व राष्ट्रपति"
    },
    {
      text: "सच्ची शिक्षा के द्वारा ही हम अपने अंदर के सर्वोत्तम अंश को बाहर ला सकते हैं और समाज का कल्याण कर सकते हैं।",
      author: "महात्मा गांधी",
      designation: "राष्ट्रपिता एवं समाज सुधारक"
    },
    {
      text: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए। शिक्षा ही वह माध्यम है जिससे दृढ़ चरित्र का निर्माण होता है।",
      author: "स्वामी विवेकानंद",
      designation: "महान युवा संन्यासी"
    },
    {
      text: "बालक का मस्तिष्क खाली कोरी स्लेट नहीं है, बल्कि एक प्रज्वलित करने योग्य अग्निपुंज है जिसे केवल उचित चिंगारी की आवश्यकता है।",
      author: "रवींद्रनाथ टैगोर",
      designation: "नोबेल पुरस्कार विजेता कवि एवं महान शिक्षक"
    }
  ];

  // Auto Quote Scroll trigger
  useEffect(() => {
    const qInterval = setInterval(() => {
      setActiveQuoteIdx((p) => (p + 1) % educationQuotes.length);
    }, 7000); // 7s rotation
    return () => clearInterval(qInterval);
  }, [educationQuotes.length]);

  // Office staff profile additions
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    designation: '',
    qualification: '',
    role: '',
    email: '',
    phone: '',
    photoUrl: ''
  });

  // State for PIN code unlock mechanism
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('did_unlock_editor') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editorSubTab, setEditorSubTab] = useState<'general_social' | 'schools_schemes' | 'academic_stats' | 'staff_gallery'>('general_social');

  const [searchQuery, setSearchQuery] = useState('');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<'ALL' | 'PM_SHRI' | 'MGGS'>('ALL');
  
  // MGGS Lottery Checker state
  const [lotteryRegNo, setLotteryRegNo] = useState('');
  const [lotteryResult, setLotteryResult] = useState<{ status: 'SUCCESS' | 'WAITING' | 'NOT_FOUND'; name?: string; school?: string; rank?: number } | null>(null);

  // Gallery view lightbox state
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('ALL');

  // External Portal Redirect state
  const [redirectWarningUrl, setRedirectWarningUrl] = useState<{ title: string; url: string } | null>(null);

  // Social feed toggle
  const [socialFeedType, setSocialFeedType] = useState<'fb' | 'tw' | 'yt'>('tw');

  // School filtration logic for PM Shri / MGGS tabs or search query
  const filteredSchools = specialSchs.filter(sch => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sch.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = schoolTypeFilter === 'ALL' || sch.type === schoolTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleLotteryCheck = () => {
    if (!lotteryRegNo.trim()) return;
    
    // Simple deterministic lottery verification
    const val = lotteryRegNo.trim().toUpperCase();
    if (val.includes('MGGS-102') || val.includes('102')) {
      setLotteryResult({
        status: 'SUCCESS',
        name: 'अयांश खान',
        school: 'महात्मा गाँधी रावि (अंग्रेजी माध्यम) पहाड़ी संख्या-1',
        rank: 3
      });
    } else if (val.includes('MGGS-124') || val.includes('124')) {
      setLotteryResult({
        status: 'SUCCESS',
        name: 'खुशी कुमारी',
        school: 'महात्मा गाँधी राउमावि पिदावली',
        rank: 1
      });
    } else if (val.includes('MGGS-148') || val.includes('148')) {
      setLotteryResult({
        status: 'WAITING',
        name: 'आरिफ मोहम्मद',
        school: 'महात्मा गाँधी रावि (अंग्रेजी माध्यम) गोपालगढ़',
        rank: 12
      });
    } else {
      setLotteryResult({
        status: 'NOT_FOUND'
      });
    }
  };

  const getIconForScheme = (iconName: string) => {
    switch(iconName) {
      case 'Shirt': return <Shirt className="w-5 h-5 text-indigo-500" />;
      case 'Milk': return <Milk className="w-5 h-5 text-orange-500" />;
      case 'Award': return <Award className="w-5 h-5 text-yellow-500" />;
      case 'Bike': return <Bike className="w-5 h-5 text-pink-500" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-emerald-500" />;
      default: return <GraduationCap className="w-5 h-5 text-slate-500" />;
    }
  };

  // Grouped Menu options for elegant sidebar
  const menuGroups = [
    {
      groupTitle: 'प्रधान अवलोकन (Overview)',
      items: [
        { id: 'dashboard', label: 'समग्र डैशबोर्ड', icon: <Home className="w-4 h-4" /> },
        { id: 'establishment', label: 'कार्यालय संस्थापन', icon: <Clipboard className="w-4 h-4" /> },
        { id: 'office_profile', label: 'ऑफिस प्रोफाइल', icon: <Users className="w-4 h-4" /> },
        { id: 'circular_orders', label: 'आदेश एवं परिपत्र 📂', icon: <FileText className="w-4 h-4 text-orange-600" /> }
      ]
    },
    {
      groupTitle: 'शैक्षिक अनुभाग (Academic Wings)',
      items: [
        { id: 'primary_edu', label: 'प्रारम्भिक शिक्षा', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'secondary_edu', label: 'माध्यमिक शिक्षा', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'vocational_edu', label: 'व्यावसायिक शिक्षा', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'inclusive_edu', label: 'समावेशी शिक्षा', icon: <Heart className="w-4 h-4 text-rose-500" /> },
        { id: 'mdm_page', label: 'मिड-डे मील (MDM)', icon: <Milk className="w-4 h-4 text-amber-500" /> }
      ]
    },
    {
      groupTitle: 'विशेष विद्यालय (Specialized)',
      items: [
        { id: 'pm_shri', label: 'PM श्री विद्यालय', icon: <Star className="w-4 h-4 text-orange-500" /> },
        { id: 'mggs', label: 'महात्मा गाँधी विद्या.', icon: <Heart className="w-4 h-4 text-rose-500" /> }
      ]
    },
    {
      groupTitle: 'विद्यार्थी कार्नर (Students Zone)',
      items: [
        { id: 'board_results', label: 'बोर्ड परिणाम विश्लेषण', icon: <Award className="w-4 h-4" /> },
        { id: 'games_quiz', label: 'गेम्स और क्विज खेलें', icon: <Laptop className="w-4 h-4" /> }
      ]
    },
    {
      groupTitle: 'शासन एवं नीतियां (Governance)',
      items: [
        { id: 'schemes', label: 'शिक्षा विभाग फ्लैगशिप', icon: <Flag className="w-4 h-4" /> },
        { id: 'annual_report', label: 'वार्षिक मूल्यांकन', icon: <FileText className="w-4 h-4" /> },
        { id: 'innovations', label: 'नवाचार व बेस्ट प्रैक्टिस', icon: <Sparkles className="w-4 h-4 text-amber-500" /> }
      ]
    },
    {
      groupTitle: 'मीडिया व संबंध (Media Hub)',
      items: [
        { id: 'gallery', label: 'फोटो और वीडियो गैलरी', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'social', label: 'सोशल मीडिया फीड', icon: <Share2 className="w-4 h-4" /> },
        { id: 'state_links', label: 'राज्य स्तरीय वेब लिंक', icon: <ExternalLink className="w-4 h-4" /> }
      ]
    },
    {
      groupTitle: 'विशेष स्वचालित विश्लेषक',
      items: [
        { id: 'auto_analysis', label: 'ऑटो एनालिसिस रिपोर्ट', icon: <TrendingUp className="w-4 h-4 text-indigo-600" /> }
      ]
    },
    {
      groupTitle: 'प्रशासनिक सेटिंग्स (Admin Settings)',
      items: [
        { id: 'data_editor', label: 'डेटा संशोधन पैनल 🔒', icon: <ShieldCheck className="w-4 h-4 text-red-600" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-orange-600 selection:text-white">
      {/* 1. Administrative Header with Notification Bar */}
      <AdministrativeHeader shalaDarpanCode={shalaDarpanCode} announcements={announcements} />

      {/* 2. Main content container */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 md:py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Menu (Collapsible/Vertical index stack) - Columns: 1 */}
        <nav className="lg:col-span-1 space-y-4 no-print" id="left-sidebar-navigation">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-36">
            <div className="text-center pb-3 border-b border-slate-100 mb-4">
              <span className="text-[10px] bg-orange-650 bg-orange-600 text-white px-2 py-0.5 rounded-full font-bold">
                अकादमिक नेविगेशन
              </span>
              <p className="text-xs text-slate-500 mt-1 font-semibold">कुल प्रभाग मॉड्यूल: 18</p>
            </div>

            {/* Structured group rendering */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {menuGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 tracking-wider uppercase pl-2">
                    {group.groupTitle}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        id={`nav-item-${item.id}`}
                        onClick={() => {
                          setActiveTab(item.id as TabType);
                          // Auto scroll main panel up on mobile
                          document.getElementById('main-focus-panel')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2.5 ${
                          activeTab === item.id
                            ? 'bg-orange-600 text-white shadow-sm font-extrabold ring-1 ring-orange-500/20'
                            : 'text-slate-705 text-slate-700 hover:bg-orange-50 hover:text-orange-900'
                        }`}
                      >
                        <span className={activeTab === item.id ? 'text-white' : 'text-slate-400 shrink-0'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Active Tab Panel Workspace - Columns: 3 */}
        <section className="lg:col-span-3 space-y-6" id="main-focus-panel">
          
          {/* Global School Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between no-print animate-fade-in" id="global-search-container">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-orange-600 animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">त्वरित ब्लॉक विद्यालय खोज एवं हाइलाइटर</h4>
                <p className="text-[10px] text-slate-500 font-medium">पीएम श्री एवं महात्मा गाँधी अंग्रेजी माध्यम विद्यालयों के नाम, स्थान व सुविधाओं को लाइव खोजें</p>
              </div>
            </div>
            
            <div className="relative w-full sm:max-w-md flex items-center shadow-sm">
              <input
                type="text"
                id="school-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="विद्यालय का नाम, स्थान, स्तर, या सुविधाएं खोजें... (जैसे: पहाड़ी, कैथवाडा, ICT, लैब)"
                className="w-full pl-3 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-orange-500 transition-all bg-slate-50/50 text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  id="search-clear-btn"
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-sm font-bold font-mono transition"
                  title="खोज साफ़ करें"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* A. GENERAL SUMMARY DASHBOARD PANEL (अवलोकन) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Saffron Hero welcome greeting card */}
              <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 rounded-2xl p-6 md:p-8 text-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="relative space-y-2 max-w-2xl">
                  <span className="bg-white/20 text-white border border-white/25 px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase">
                    स्वागतम् | राजस्थान शिक्षा संवर्धन
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black font-display tracking-tight">
                    मुख्य ब्लॉक शिक्षा अधिकारी कार्यालय, पहाड़ी (डीग)
                  </h2>
                  <p className="text-xs md:text-sm text-amber-50 font-medium leading-relaxed">
                    यह ब्लॉक पहाड़ी ग्रामीण अंचल के बच्चों को आधुनिक, नैतिक एवं परिणाम-उन्मुख शिक्षा प्रदान करने के लिए राजस्थान सरकार के मिशन संवर्धन के अंतर्गत कार्यरत राजकीय प्रशासनिक मंच है।
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    <button
                      onClick={() => setActiveTab('games_quiz')}
                      className="px-4 py-2 bg-white text-orange-700 font-extrabold text-xs rounded-xl shadow hover:bg-slate-50 transition"
                    >
                      🎮 ऑनलाइन क्विज़ खेलें
                    </button>
                    <button
                      onClick={() => setActiveTab('auto_analysis')}
                      className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-1"
                    >
                      📈 सांख्यिकी ऑटो रिपोर्ट
                    </button>
                  </div>
                </div>
              </div>

              {/* Rotating quotes from educationists like Sarvepalli Radhakrishnan */}
              <div className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 rounded-2xl p-5 border border-amber-100 shadow-xs flex flex-col md:flex-row items-center gap-4 transition duration-500 animate-fade-in relative overflow-hidden text-left">
                <div className="absolute top-2 right-4 text-orange-200/40 text-7xl font-serif select-none pointer-events-none pr-2">
                  “
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-1.5 text-left">
                  <p className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200/50 px-2 py-0.5 rounded-sm font-black inline-block tracking-wider uppercase font-sans">
                    महान शिक्षाविद् के विचार (Quotes on Education)
                  </p>
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-relaxed italic">
                    "{educationQuotes[activeQuoteIdx].text}"
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-[11px] font-extrabold text-orange-700">
                      — {educationQuotes[activeQuoteIdx].author}
                    </span>
                    <span className="text-[9.5px] text-slate-500 font-bold">
                      ({educationQuotes[activeQuoteIdx].designation})
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button 
                    onClick={() => setActiveQuoteIdx((prev) => (prev - 1 + educationQuotes.length) % educationQuotes.length)}
                    className="w-7 h-7 bg-white hover:bg-slate-50 border rounded-full flex items-center justify-center shadow-xs cursor-pointer select-none text-xs font-bold font-mono"
                    title="पिछला कथन"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={() => setActiveQuoteIdx((prev) => (prev + 1) % educationQuotes.length)}
                    className="w-7 h-7 bg-white hover:bg-slate-50 border rounded-full flex items-center justify-center shadow-xs cursor-pointer select-none text-xs font-bold font-mono"
                    title="अगला कथन"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Bento Grid Top Summary indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">कुल विद्यालय अधिसीमा</span>
                  <p className="text-2xl font-black text-indigo-700 font-mono mt-1">
                    {blockStats.elementary.totalSchools + blockStats.secondary.totalSchools}
                  </p>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">राजकीय समग्र स्कूल पंजीकृत</span>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">समग्र छात्र नामांकन</span>
                  <p className="text-2xl font-black text-orange-600 font-mono mt-1">
                    {(blockStats.elementary.totalEnrollment + blockStats.secondary.totalEnrollment).toLocaleString('hi-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                    +32.6% सुधार दर (विगत 5 वर्ष)
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">स्वीकृत शिक्षक एवं स्टाफ</span>
                  <p className="text-2xl font-black text-emerald-600 font-mono mt-1">
                    {(blockStats.elementary.teachersCount + blockStats.secondary.teachersCount).toLocaleString('hi-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">शिक्षक छात्र अनुपात {blockStats.elementary.academicTrackRatio || '24:1'}</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">PEEO संकुल क्लस्टर्स</span>
                  <p className="text-2xl font-black text-pink-600 font-mono mt-1">{blockStats.jurisdiction.totalPanchayats}</p>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">ग्राम पंचायत वार अनुवीक्षण</span>
                </div>
              </div>

              {/* Custom SVG Mini Dashboard Graphic Summary representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Board Result Progression highlights mini card */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                      <span>कक्षा 10वीं बोर्ड पास रेट प्रक्षेप पथ (2021-25)</span>
                    </h4>
                    <button 
                      onClick={() => setActiveTab('board_results')}
                      className="text-[10px] text-orange-600 font-bold hover:underline"
                    >
                      विस्तृत देखें
                    </button>
                  </div>
                  
                  <div className="h-28 flex items-end justify-between px-2 pt-2">
                    {boardRes.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[9px] font-mono font-bold text-slate-500">{item.class10PassPercent}%</span>
                        <div 
                          className="w-8 bg-gradient-to-t from-orange-600 to-amber-500 rounded-t-sm transition-all duration-500" 
                          style={{ height: `${item.class10PassPercent * 0.7}px` }}
                        />
                        <span className="text-[9px] font-mono font-bold text-slate-400">{item.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Gateway links to Flagship Schemes */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1">
                      <Flag className="w-3.5 h-3.5 text-indigo-500" />
                      <span>राजस्थान सरकार: नवीन शिक्षा नीति लक्ष्य</span>
                    </h4>
                    <button 
                      onClick={() => setActiveTab('schemes')}
                      className="text-[10px] text-indigo-600 font-bold hover:underline"
                    >
                      सभी योजनाएं
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 border rounded border-slate-100 bg-slate-50/50 flex gap-2.5 items-center">
                      <Shirt className="w-4 h-4 text-indigo-500 shrink-0" />
                      <div className="text-[11px] leading-tight flex-1 font-medium">
                        <p className="font-bold text-slate-900">मुख्यमंत्री निःशुल्क यूनिफॉर्म</p>
                        <p className="text-slate-500">16 हजार से अधिक बच्चों को निःशुल्क ड्रेस वितरण संपन्न।</p>
                      </div>
                    </div>
                    <div className="p-2 border rounded border-slate-100 bg-slate-50/50 flex gap-2.5 items-center">
                      <Milk className="w-4 h-4 text-orange-500 shrink-0" />
                      <div className="text-[11px] leading-tight flex-1 font-medium">
                        <p className="font-bold text-slate-900">मुख्यमंत्री बाल गोपाल दूध योजना</p>
                        <p className="text-slate-500">सप्ताह के सभी शिक्षण दिवसों पर गर्म सुवासित पोषक दूध।</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PM Shri & MGGS Spotlight feature cards */}
              <div className="bg-indigo-50/40 rounded-xl border border-indigo-100 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-indigo-100 pb-2.5">
                  <h3 className="text-sm font-black text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>ब्लॉक पहाड़ी के विशिष्ट और मॉडल विद्यालय नेटवर्क</span>
                  </h3>
                  <span className="text-[10px] font-bold text-indigo-700">कुल मॉडल स्कूल्स: 5</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3.5 border border-indigo-100 shadow-sm leading-relaxed space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="bg-orange-100 text-orange-900 px-2 py-0.5 rounded text-[10px] font-bold">PM SHRI SCHOOLS</span>
                      <span className="text-[10px] font-mono text-slate-400">काउंट: 2</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">राउमावि पहाड़ी एवं राउमावि कैथवाडा</p>
                    <p className="text-[11px] text-slate-500">स्मार्ट कक्षा-कक्ष, कंप्यूटर प्रयोगशाला, रोबोटिक्स लैब, ग्रीन सोलर रूफटॉप और उत्कृष्ट आधुनिक शिक्षण विधियाँ क्रियाशील।</p>
                    <button 
                      onClick={() => setActiveTab('pm_shri')}
                      className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-0.5 pt-1"
                    >
                      सुविधाएं देखें ➔
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-3.5 border border-indigo-100 shadow-sm leading-relaxed space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="bg-rose-100 text-rose-900 px-2 py-0.5 rounded text-[10px] font-bold">महात्मा गाँधी स्कूल (English Medium)</span>
                      <span className="text-[10px] font-mono text-slate-400">काउंट: 3</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">राजकीय अंग्रेजी माध्यम प्राथमिक/सेकेंडरी स्कूल</p>
                    <p className="text-[11px] text-slate-500">ग्रामीण अंचल के बच्चों को गुणवत्तापूर्ण उत्कृष्ट अंग्रेजी संभाषण प्रशिक्षण, कम्प्यूटर कौशल एवं सह-शैक्षणिक विकास गतिविधियाँ।</p>
                    <button 
                      onClick={() => setActiveTab('mggs')}
                      className="text-[10px] text-rose-600 font-bold hover:underline flex items-center gap-0.5 pt-1"
                    >
                      प्रवेश व सीटें देखें ➔
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. OFFICE ESTABLISHMENT PANEL (कार्यालय संस्थापन) */}
          {activeTab === 'establishment' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-5 animate-fade-in" id="establishment-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">🏫 कार्यालय संस्थापन : ब्लॉक की भौगोलिक एवं प्रशासनिक संरचना</h3>
                <p className="text-xs text-slate-500 mt-1">मुख्य ब्लॉक शिक्षा कार्यालय पहाड़ी (डीग) के अंतर्गत आने वाली विद्यालय सांख्यिकी एवं भौगोलिक विवरण</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* School division distribution */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">1. विद्यालय ढांचा सांख्यिकी वर्गीकरण</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="font-semibold">राजकीय प्राथमिक विद्यालय (Primary Schools)</span>
                      <span className="font-mono font-bold text-indigo-700">48</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="font-semibold">राजकीय उच्च प्राथमिक विद्यालय (Upper Primary)</span>
                      <span className="font-mono font-bold text-indigo-700">62</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="font-semibold">राजकीय माध्यमिक विद्यालय (Secondary Schools)</span>
                      <span className="font-mono font-bold text-indigo-700">24</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="font-semibold">राजकीय उच्च माध्यमिक विद्यालय (Senior Secondary)</span>
                      <span className="font-mono font-bold text-indigo-700">38</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 bg-indigo-50 text-indigo-905 border border-indigo-100 font-bold rounded">
                      <span>कुल राजकीय विद्यालय संख्या (Total Schools)</span>
                      <span className="font-mono">172</span>
                    </div>
                  </div>
                </div>

                {/* Geographical Coverage */}
                <div className="space-y-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-orange-900">2. भौगोलिक एवं अधिकार क्षेत्र (Jurisdiction Area)</h4>
                  <div className="space-y-2 text-xs leading-relaxed text-slate-800 font-medium font-sans">
                    <p className="flex justify-between border-b border-orange-100 pb-1.5">
                      <span>कुल ग्राम पंचायत अनुभाग:</span>
                      <strong className="text-slate-950 font-mono">{blockStats.jurisdiction.totalPanchayats} पंचायतें</strong>
                    </p>
                    <p className="flex justify-between border-b border-orange-100 pb-1.5">
                      <span>कुल राजस्व गांव कवरेज:</span>
                      <strong className="text-slate-950 font-mono">{blockStats.jurisdiction.totalVillages} गाँव</strong>
                    </p>
                    <p className="flex justify-between border-b border-orange-100 pb-1.5">
                      <span>कुल ब्लॉक क्षेत्रफल:</span>
                      <strong className="text-slate-950 font-mono">{blockStats.jurisdiction.totalAreaSqKm} वर्ग कि.मी.</strong>
                    </p>
                    <p className="flex justify-between border-b border-orange-100 pb-1.5">
                      <span>अनुमानित ब्लॉक कुल जनसंख्या:</span>
                      <strong className="text-slate-950 font-mono">{blockStats.jurisdiction.populationCens}</strong>
                    </p>
                  </div>
                  
                  <div className="text-[10px] text-orange-800 font-bold bg-white p-2.5 rounded border border-orange-200 mt-4">
                    📢 संकुल समन्वयक सूचना: ब्लॉक पहाड़ी की भौगोलिक परिधि को 32 PEEO (पंचायत प्रारंभिक शिक्षा अधिकारी) स्तरों में विभाजित कर विकेंद्रीकृत गुणवत्ता नियंत्रण ढांचा लागू किया गया है।
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. ELEMENTARY EDUCATION PANEL (प्रारम्भिक शिक्षा) */}
          {activeTab === 'primary_edu' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="primary-edu-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">👶 प्रारम्भिक शिक्षा प्रभाग : प्राथमिक एवं उच्च प्राथमिक स्तर</h3>
                <p className="text-xs text-slate-500 mt-1">कक्षा 1 से 8 तक के राजकीय विद्यालयों की सांख्यकी, पोषाहार एवं छात्र प्रगति रिपोर्ट</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border p-3 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">कुल प्राथमिक स्कूल (UPS समेत)</p>
                  <p className="text-xl font-bold font-mono text-indigo-700 mt-1">{blockStats.elementary.totalSchools}</p>
                </div>
                <div className="bg-slate-50 border p-3 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">कुल प्रारम्भिक नामांकन</p>
                  <p className="text-xl font-bold font-mono text-orange-600 mt-1">{blockStats.elementary.totalEnrollment}</p>
                </div>
                <div className="bg-slate-50 border p-3 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">प्रारम्भिक सक्रिय शिक्षक</p>
                  <p className="text-xl font-bold font-mono text-emerald-600 mt-1">{blockStats.elementary.teachersCount}</p>
                </div>
              </div>

              {/* MDM details */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-white w-14 h-14 rounded-full border border-orange-200 flex items-center justify-center shrink-0">
                  <Milk className="w-6 h-6 text-orange-600" />
                </div>
                <div className="leading-relaxed text-xs md:text-sm font-medium">
                  <h4 className="text-sm font-black text-orange-950">मुख्यमंत्री बाल गोपाल योजना एवं मिड-डे मील (MDM):</h4>
                  <p className="text-slate-700 mt-0.5">ब्लॉक के समस्त प्राथमिक स्तर के विद्यालयों में मिड-डे मील पोषाहार सुचारू वितरण {blockStats.elementary.midDayMealCoverage} के साथ-साथ गुणवत्ता नियंत्रण प्रणाली संचालित है। सप्ताह के सभी शिक्षण दिवसों पर गर्म व सुवासित गाय का पौष्टिक दूध बाल-गोपाल योजना के तहत परोसा जाता है।</p>
                </div>
              </div>

              {/* Textbook coverage charts */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-755">नि:शुल्क पाठ्यपुस्तक वितरण रिकॉर्ड 2024-25</h4>
                <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden relative">
                  <div className="bg-emerald-500 h-full w-[100%]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-slate-900">
                    शत-प्रतिशत वितरण (वितरित प्रतियों की संख्या: {blockStats.elementary.freeTextbooksDistributed2025})
                  </span>
                </div>
                <p className="text-[10px] text-slate-550 font-bold leading-normal">
                  *नोट: सत्रारम्भ के साथ ही ब्लॉक स्तर के भंडार गृह से पंचायत पीईईओ नोडल्स के मार्ग से समस्त प्राथमिक विद्यालयों के बच्चों को नि:शुल्क पाठ्यपुस्तकों के सैट प्राप्त कराये जा चुके हैं।
                </p>
              </div>
            </div>
          )}

          {/* D. SECONDARY EDUCATION PANEL (माध्यमिक शिक्षा) */}
          {activeTab === 'secondary_edu' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-5 animate-fade-in" id="secondary-edu-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">🎓 माध्यमिक शिक्षा प्रभाग : माध्यमिक एवं उच्च माध्यमिक</h3>
                <p className="text-xs text-slate-500 mt-1">कक्षा 9 से 12 तक के मुख्य विद्यालयों की सांख्यकी, प्रयोगशालाओं एवं आईटी अवसंरचना रिपोर्ट</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100 leading-relaxed text-xs md:text-sm font-medium">
                  <p className="font-bold text-indigo-950 text-xs uppercase mb-2">माध्यमिक विद्यालय प्रोफाइल</p>
                  <p className="flex justify-between border-b pb-1.5 border-indigo-100">
                    <span>कुल माध्यमिक विद्यालय:</span>
                    <strong className="font-mono">{blockStats.secondary.secondarySchools}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-1.5 border-indigo-100 mt-1.5">
                    <span>कुल उच्च माध्यमिक विद्यालय:</span>
                    <strong className="font-mono">{blockStats.secondary.seniorSecondarySchools}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-1.5 border-indigo-100 mt-1.5">
                    <span>समग्र माध्यमिक नामांकित छात्र:</span>
                    <strong className="font-mono">{blockStats.secondary.totalEnrollment} छात्र</strong>
                  </p>
                  <p className="flex justify-between mt-1.5">
                    <span>माध्यमिक कार्यरत शिक्षक:</span>
                    <strong className="font-mono">{blockStats.secondary.teachersCount} अध्यापक</strong>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed text-xs md:text-sm font-medium">
                  <p className="font-bold text-slate-800 text-xs uppercase mb-2">लैब संवर्धन एवं डिजिटल अवसंरचना</p>
                  <p className="flex justify-between border-b pb-1.5 border-slate-250">
                    <span>क्रियाशील आईटी कम्प्यूटर लैब्स (ICT):</span>
                    <strong className="text-indigo-700">{blockStats.secondary.itLabsSetup}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-1.5 border-slate-250 mt-1.5">
                    <span>विज्ञान भौतिक/रसायन लैब्स:</span>
                    <strong className="text-emerald-700">{blockStats.secondary.scienceLabsSetup}</strong>
                  </p>
                  
                  <div className="text-[10px] text-slate-500 font-bold bg-white p-2 border mt-3 rounded">
                    💡 सुसज्जित प्रयोगशालाएं: छात्र-छात्राओं को व्यावहारिक वैज्ञानिक अभ्यास चक्र प्रदान करने के लिए राजकीय विद्यालयों में विज्ञान संकायों के प्रयोगशाला ढांचों को सुदृढ़ किया जा रहा है।
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E. VOCATIONAL EDUCATION PANEL (व्यावसायिक शिक्षा) */}
          {activeTab === 'vocational_edu' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="vocational-edu-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">🛠️ व्यावसायिक शिक्षा प्रभाग : वोकेशनल विंग</h3>
                <p className="text-xs text-slate-500 mt-1">राजकीय विद्यालयों में कौशल आधारित व्यावसायिक पाठ्यक्रम एवं औद्योगिक संरेखण रिपोर्ट</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                👉 <strong>स्किल डेवलपमेंट पहल:</strong> ब्लॉक पहाड़ी के कुल 12 उच्च माध्यमिक विद्यालयों में व्यावसायिक शिक्षा सफलतापूर्वक संचालित की जा रही है। इसका मुख्य उद्देश्य छात्रों को औपचारिक शिक्षा के साथ-साथ रोजगारोन्मुख बनाना है।
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">व्यावसायिक सेक्टर्स एवं दर्ज विद्यार्थी संख्या (2024-25)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="p-2 border">व्यावसायिक ट्रेड (Trade Sector)</th>
                        <th className="p-2 border text-center">संबद्ध विद्यालय</th>
                        <th className="p-2 border text-center">पंजीकृत विद्यार्थी count</th>
                        <th className="p-2 border">प्रायोगिक लैब स्थिति</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blockStats.vocational.sectorsList.map((sector, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50 font-medium">
                          <td className="p-2 border font-bold text-slate-905">{sector.name}</td>
                          <td className="p-2 border text-center font-mono">{sector.schools}</td>
                          <td className="p-2 border text-center font-mono text-emerald-700 font-bold">{sector.enrolled}</td>
                          <td className="p-2 border text-slate-500">{sector.labs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* F. PM SHRI SCHOOLS PANEL */}
          {activeTab === 'pm_shri' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="pm-shri-panel">
              <div className="border-b border-slate-100 pb-3">
                <span className="bg-orange-600 text-white uppercase text-[8px] px-2 py-0.5 rounded font-black tracking-widest leading-none">
                  NATIONAL MODERN SCHOOLS
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">🌟 PM श्री विद्यालय (प्रधानमंत्री स्कूल फॉर राइजिंग इंडिया)</h3>
                <p className="text-xs text-slate-500 mt-1">ब्लॉक पहाड़ी के अंतर्गत आने वाले उन्नत एवं मॉडल राजकीय पीएम श्री विद्यालय की सूची व विशिष्टताएँ</p>
              </div>

              {/* PM Shri standards description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 text-xs md:text-sm leading-relaxed font-semibold text-slate-800">
                  ⚡ <strong>उद्देश्य एवं उत्कृष्ट बुनियादी ढांचा:</strong> पीएम श्री विद्यालय राष्ट्रीय शिक्षा नीति (NEP 2020) के पूर्ण अनुपालन के लिए ब्लॉक स्तर पर रोल मॉडल के रूप में कार्य करते हैं। इनमें स्मार्ट कक्षाओं के साथ-साथ गणित पार्क, अपशिष्ट रीसाइक्लिंग व सौर ऊर्जा संयत्र स्थापित किए गए हैं।
                </div>
                
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs md:text-sm font-semibold leading-relaxed text-slate-800">
                  🏫 <strong>ब्लॉक पहाड़ी में पीएम श्री स्कूल संख्या:</strong> ब्लॉक पहाड़ी में सुदृढ़ विश्लेषण के बाद वर्तमान में 2 मुख्य विद्यालयों "राउमावि पहाड़ी" एवं "राउमावि कैथवाडा" को पीएम श्री मानकों पर विकसित कर लिया गया है।
                </div>
              </div>

              {/* Filterable School Lists */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded-lg border">
                  <span className="text-xs font-bold text-slate-700">पंजीकृत स्कूल सूची (PM SHRI)</span>
                  <span className="text-[10.5px] font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    खोज परिणाम: {specialSchs.filter(s => s.type === 'PM_SHRI' && (!searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()) || s.level.toLowerCase().includes(searchQuery.toLowerCase()) || s.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())))).length} में से {specialSchs.filter(s => s.type === 'PM_SHRI').length} स्कूल
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    const filtered = specialSchs.filter(s => s.type === 'PM_SHRI' && (
                      !searchQuery.trim() ||
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
                    ));

                    if (filtered.length === 0) {
                      return (
                        <div className="col-span-full py-10 text-center bg-slate-50 border border-dashed rounded-xl p-6" id="pm-shri-no-results">
                          <p className="text-slate-500 font-bold text-sm">⚠️ आपकी खोज "{searchQuery}" के अनुरूप कोई पीएम श्री विद्यालय नहीं मिला।</p>
                          <p className="text-slate-400 text-xs mt-1">कृपा दूसरा कीवर्ड या वर्तनी दर्ज़ करें।</p>
                        </div>
                      );
                    }

                    return filtered.map((sch) => (
                      <div key={sch.id} className="bg-white border rounded-xl p-4 shadow-sm hover:border-orange-300 transition duration-200 flex gap-4 text-left font-display">
                        <div className="w-12 h-12 bg-orange-100 text-orange-650 text-orange-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                          ★
                        </div>
                        <div className="space-y-1 flex-1">
                          <span className="text-[9px] bg-orange-100 text-orange-850 text-orange-800 font-mono font-black px-2 py-0.5 rounded uppercase">
                            <HighlightText text={sch.level} search={searchQuery} />
                          </span>
                          <h4 className="text-sm font-black text-slate-900">
                            <HighlightText text={sch.name} search={searchQuery} />
                          </h4>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium font-sans">
                            📍 <HighlightText text={sch.location} search={searchQuery} /> | 👥 विद्यार्थी संख्या: <strong className="font-mono text-slate-700">{sch.studentsCount}</strong>
                          </p>
                          
                          <div className="flex flex-wrap gap-1 pt-1.5 justify-start">
                            {sch.facilities.map((fac, idx) => (
                              <span key={idx} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border hover:bg-orange-50/50 hover:border-orange-100 transition">
                                <HighlightText text={fac} search={searchQuery} />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* G. MAHATMA GANDHI SCHOOLS PANEL */}
          {activeTab === 'mggs' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="mggs-panel">
              <div className="border-b border-slate-100 pb-3">
                <span className="bg-rose-600 text-white uppercase text-[8px] px-2 py-0.5 rounded font-black tracking-widest leading-none">
                  ENGLISH MEDIUM EXCELLENCE
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">💖 महात्मा गाँधी राजकीय विद्यालय (अंग्रेजी माध्यम) - MGGS</h3>
                <p className="text-xs text-slate-500 mt-1">ग्रामीण परिवेश के बच्चों को निःशुल्क एवं गुणवत्तापूर्ण अंग्रेजी माध्यम शिक्षा देने वाले राजकीय महात्मा गांधी स्कूल्स</p>
              </div>

              {/* MGGS specifications */}
              <div className="p-4 bg-rose-50/50 border border-rose-105 rounded-xl text-xs md:text-sm font-semibold leading-relaxed text-slate-800">
                ⭐ <strong>मुख्य विशेषता:</strong> एमजीजीएस स्कूलों में अध्यापन कार्य राज्य स्तरीय विशेष अंग्रेजी माध्यम पात्रता परीक्षा उत्तीर्ण कर आए विषय अध्यापकों द्वारा कराया जाता है। प्रवेश प्रक्रिया पूर्णतः निष्पक्ष ऑनलाइन लॉटरी प्रणाली (Shala Darpan) द्वारा पारदर्शी की जाती है।
              </div>

              {/* School Lists under MGGS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-black uppercase tracking-wider text-rose-900 pl-1">पहाड़ी ब्लॉक के कार्यरत महात्मा गाँधी विद्यालय (MGGS)</p>
                  <span className="text-[10.5px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    खोज परिणाम: {specialSchs.filter(s => s.type === 'MGGS' && (!searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()) || s.level.toLowerCase().includes(searchQuery.toLowerCase()) || s.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())))).length} में से {specialSchs.filter(s => s.type === 'MGGS').length} school
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(() => {
                    const filtered = specialSchs.filter(s => s.type === 'MGGS' && (
                      !searchQuery.trim() ||
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
                    ));

                    if (filtered.length === 0) {
                      return (
                        <div className="col-span-full py-10 text-center bg-slate-55 bg-slate-50 border border-dashed rounded-xl p-6" id="mggs-no-results">
                          <p className="text-slate-500 font-bold text-sm">⚠️ आपकी खोज "{searchQuery}" के अनुरूप कोई महात्मा गांधी अंग्रेजी माध्यम विद्यालय नहीं मिला।</p>
                          <p className="text-slate-400 text-xs mt-1">कृपा दूसरा कीवर्ड या स्थान दर्ज़ करें।</p>
                        </div>
                      );
                    }

                    return filtered.map((sch) => (
                      <div key={sch.id} className="bg-white border text-left rounded-xl p-3.5 shadow-sm hover:border-rose-300 transition-all hover:shadow-md duration-200 space-y-3 flex flex-col justify-between" id={`school-card-${sch.id}`}>
                        <div className="space-y-2">
                          <span className="text-[9px] bg-rose-100 text-rose-900 font-bold px-2 py-0.5 rounded uppercase font-mono">
                            <HighlightText text={sch.level} search={searchQuery} />
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            <HighlightText text={sch.name} search={searchQuery} />
                          </h4>
                          <p className="text-[10px] text-slate-500 font-semibold font-sans">
                            📍 <HighlightText text={sch.location} search={searchQuery} /> | 👥 छात्र संख्या: <strong className="font-mono text-slate-700">{sch.studentsCount}</strong>
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 font-medium justify-start">
                          {sch.facilities.slice(0, 3).map((fac, idx) => (
                            <span key={idx} className="text-[8px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-150 hover:bg-rose-50/30 transition">
                              <HighlightText text={fac} search={searchQuery} />
                            </span>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* INTERACTIVE LOTTERY SEAT STATUS CHECKER */}
              <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200 mt-6 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>प्रवेश लॉटरी परिणाम जाँचें (Interactive Lottery Seat Checker)</span>
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  विद्यालय में प्रवेश की प्रतीक्षा सूची अथवा सिलेक्ट क्रेडेंशियल्स का त्वरित विवरण प्राप्त करें (परीक्षण के लिए कूट आईडी: <strong>MGGS-102</strong> या <strong>MGGS-124</strong> दर्ज करें):
                </p>

                <div className="flex gap-2 text-xs">
                  <input
                    type="text"
                    value={lotteryRegNo}
                    onChange={(e) => setLotteryRegNo(e.target.value)}
                    placeholder="पंजीकरण संख्या प्रविष्ट करें (उदा. MGGS-124)"
                    className="flex-1 px-3 py-2 border rounded-lg bg-white"
                  />
                  <button
                    onClick={handleLotteryCheck}
                    className="px-4 py-2 bg-slate-900 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition"
                  >
                    स्थिति जाँचें🔎
                  </button>
                </div>

                {/* Allotment status response */}
                {lotteryResult && (
                  <div className="bg-white border rounded-xl p-3.5 mt-3 animate-fade-in text-xs font-medium border-rose-100">
                    {lotteryResult.status === 'SUCCESS' && (
                      <div className="space-y-1.5 text-slate-800">
                        <p className="text-emerald-600 font-bold flex items-center gap-1 text-sm">
                          🎉 बधाई हो! प्रवेश ऑलॉटमेंट स्वीकृत हुआ है।
                        </p>
                        <p><strong>चयनित विद्यार्थी:</strong> {lotteryResult.name}</p>
                        <p><strong>आवंटित एमजीजीएस स्कूल:</strong> {lotteryResult.school}</p>
                        <p><strong>अस्थायी लॉटरी वरीयता क्रमांक:</strong> <span className="font-mono bg-emerald-100 font-bold px-1.5 py-0.5 text-emerald-800 rounded">{lotteryResult.rank}</span></p>
                      </div>
                    )}
                    
                    {lotteryResult.status === 'WAITING' && (
                      <div className="space-y-1.5 text-slate-800">
                        <p className="text-amber-600 font-bold flex items-center gap-1 text-sm">
                          ⏳ आवेदन प्रतीक्षा सूची (Waiting List) क्रेडेंशियल्स।
                        </p>
                        <p><strong>आवेदक विद्यार्थी:</strong> {lotteryResult.name}</p>
                        <p><strong>निर्धारित एमजीजीएस स्कूल:</strong> {lotteryResult.school}</p>
                        <p><strong>वर्तमान प्रतीक्षा सूची क्रमांक:</strong> <span className="font-mono bg-amber-100 font-bold px-1.5 py-0.5 text-amber-800 rounded">{lotteryResult.rank}</span></p>
                      </div>
                    )}

                    {lotteryResult.status === 'NOT_FOUND' && (
                      <p className="text-rose-650 font-bold flex items-center gap-1 text-sm">
                        ❌ प्रविष्टि कूट संख्या की कोई प्रतीक्षा सूची उपलब्ध नहीं है। कृपया सही आईडी प्रविष्टि करें।
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* H. STATE LEVEL SCHEMES PANEL */}
          {activeTab === 'schemes' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="schemes-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">🚩 शिक्षा विभाग राजस्थान : फ्लैगशिप योजनाओं का विवरण</h3>
                <p className="text-xs text-slate-500 mt-1">पहाड़ी ब्लॉक स्तरीय विद्यालयों में संचालित मुख्य विभागीय कल्याणकारी योजनाएं</p>
              </div>

              <div className="space-y-4">
                {schemes.map((sch) => (
                  <div key={sch.id} className="bg-slate-50 border rounded-xl p-4 md:p-5 hover:bg-slate-100/30 transition shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    
                    {/* Icon wrapper */}
                    <div className="md:col-span-1 flex justify-center py-2 shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow-inner">
                        {getIconForScheme(sch.iconName)}
                      </div>
                    </div>

                    {/* Meta info columns */}
                    <div className="md:col-span-11 space-y-2">
                      <h4 className="text-sm font-black text-slate-900 font-sans tracking-tight">{sch.name}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{sch.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500 font-sans">
                        <p>🎯 <strong className="text-slate-800">लक्षित वर्ग:</strong> {sch.targetGroup}</p>
                        <p>🎁 <strong className="text-slate-800">मुख्य लाभ विवरण:</strong> {sch.benefits}</p>
                      </div>

                      <div className="bg-white/80 p-2.5 rounded border border-slate-200/60 text-[11px] text-slate-800 font-medium leading-normal">
                        🔥 <strong className="text-orange-900 font-bold">ब्लॉक पहाड़ी स्थिति प्रगति:</strong> {sch.statusInPahari}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* I. OFFICE PROFILE PANEL & CONTACTS */}
          {activeTab === 'office_profile' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="office-profile-panel">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">🏛️ ऑफिस प्रोफाइल : कार्यालय परिचय और संगठन संरचना</h3>
                <p className="text-xs text-slate-500 mt-1">मुख्य ब्लॉक शिक्षा अधिकारी कार्यालय पहाड़ी (समग्र शिक्षा) का परिचय तथा दायित्व क्रेडेंशियल्स</p>
              </div>

              {/* CBEO introduction profile narrative */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 text-xs md:text-sm font-semibold leading-relaxed text-slate-800 animate-fade-in">
                {officeIntro}
              </div>

              {/* Staff directories cards grid layout */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-707 text-slate-705 text-slate-700 font-display animate-fade-in">
                    कार्यालय अधिकारियों एवं संदर्भ व्यक्तियों (RP) की सूची
                  </h4>
                  <button
                    onClick={() => setShowAddStaffForm(!showAddStaffForm)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[11px] rounded-lg shadow-xs transition cursor-pointer select-none no-print"
                  >
                    <span>{showAddStaffForm ? 'संशोधन फ़ॉर्म बंद करें ✕' : '+ नया अधिकारी जोड़ें'}</span>
                  </button>
                </div>

                {/* Inline Form to Add Staff Member with Base64 Photo Upload */}
                {showAddStaffForm && (
                  <div className="bg-slate-50 border-2 border-orange-200 rounded-xl p-5 space-y-4 animate-fade-in text-xs font-medium text-left">
                    <h5 className="font-extrabold text-slate-900 border-b pb-1 border-slate-200 flex items-center gap-1.5">
                      <span className="text-sm">🆕</span>
                      <span>मुख्य ब्लॉक शिक्षा अधिकारी कार्यालय हेतु नया अधिकारी प्रविष्टी</span>
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold block">अधिकारी नाम:</label>
                        <input
                          type="text"
                          placeholder="उदा: श्री सुरेश कुमार"
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                          className="w-full p-2 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-650 text-slate-600 font-bold block">पदनाम (Designation):</label>
                        <input
                          type="text"
                          placeholder="उदा: संदर्भ व्यक्ति (RP)"
                          value={newStaff.designation}
                          onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                          className="w-full p-2 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold block">योग्यता (Qualification):</label>
                        <input
                          type="text"
                          placeholder="उदा: M.A., B.Ed."
                          value={newStaff.qualification}
                          onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })}
                          className="w-full p-2 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold block">ईमेल:</label>
                        <input
                          type="email"
                          placeholder="cbeo...@gmail.com"
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                          className="w-full p-2 border rounded-lg bg-white text-xs font-mono font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold block">मोबाइल नंबर / फ़ोन:</label>
                        <input
                          type="text"
                          placeholder="+91 XXXXX XXXXX"
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                          className="w-full p-2 border rounded-lg bg-white text-xs font-mono font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-600 font-bold block">कार्यालय कार्य विभाजन (Role & Duties in Office):</label>
                      <input
                        type="text"
                        placeholder="उदा: महात्मा गांधी राजकीय स्कूल एवं समग्र शिक्षा प्रभारी"
                        value={newStaff.role}
                        onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white text-xs font-medium"
                      />
                    </div>

                    {/* Base64 file upload uploader for photo */}
                    <div className="pt-2">
                      <div className="space-y-1.5">
                        <label className="text-slate-605 text-slate-600 font-bold block">अधिकारी की फोटो अपलोड करें (Photo Upload):</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  if (typeof reader.result === 'string') {
                                    setNewStaff({ ...newStaff, photoUrl: reader.result });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="text-xs text-slate-600 bg-white border p-1.5 rounded-lg file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[11px] file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                          />
                          {newStaff.photoUrl && (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-300 shadow-sm shrink-0">
                              <img src={newStaff.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold italic">*फोटो अपलोड होने पर बेस64 डेटा स्वतः सहेज लिया जाएगा।</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!newStaff.name || !newStaff.designation) {
                          alert('कृपया अधिकारी का नाम और पदनाम अनिवार्यतः प्रविष्ट करें।');
                          return;
                        }
                        const newId = `staff-${Date.now()}`;
                        const updatedStaff = [...staff, { id: newId, ...newStaff }];
                        setStaff(updatedStaff);
                        localStorage.setItem('block_staff_list', JSON.stringify(updatedStaff));
                        
                        // Clear state
                        setNewStaff({
                          name: '',
                          designation: '',
                          qualification: '',
                          role: '',
                          email: '',
                          phone: '',
                          photoUrl: ''
                        });
                        setShowAddStaffForm(false);
                        alert('नया अधिकारी सफलतापूर्वक संजोकर कार्यालय टीम में जोड़ दिया गया है!');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-sm hover:from-orange-700 hover:to-amber-700 transition cursor-pointer"
                    >
                      सहेजें और कार्यालय टीम में जोड़ें
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staff.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-slate-50 border rounded-xl p-4 flex gap-4 items-start shadow-inner hover:border-slate-300 hover:scale-[1.02] hover:shadow-md transition-all duration-300 transform text-left"
                    >
                      {/* Optional Photo visual fallback avatar or uploaded photo */}
                      <div className="w-12 h-12 rounded-full border border-slate-300 overflow-hidden bg-slate-200 flex justify-center items-center font-black text-amber-800 shrink-0 select-none shadow-xs">
                        {member.photoUrl ? (
                          <img 
                            src={member.photoUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          member.name.charAt(4) || 'अ'
                        )}
                      </div>

                      <div className="text-xs font-medium space-y-1 flex-1 leading-normal text-slate-800 font-sans">
                        <p className="font-black text-xs text-slate-950 font-sans">{member.name}</p>
                        <p className="text-orange-600 font-bold">{member.designation}</p>
                        <p className="text-slate-400 font-semibold">{member.qualification}</p>
                        <p className="text-[11px] text-slate-600 mt-1"><strong className="text-slate-800 font-bold">कार्य आवंटन:</strong> {member.role}</p>
                        
                        <div className="flex gap-4 pt-2 text-[10px] font-bold text-indigo-700">
                          <a href={`mailto:${member.email}`} className="hover:underline flex items-center gap-0.5"><Mail className="w-3 h-3 text-slate-400" /> ईमेल</a>
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-slate-400" /> {member.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* J. PHOTO & VIDEO GALLERY PANEL */}
          {activeTab === 'gallery' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="gallery-panel">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">📸 फोटो और वीडियो गैलरी : शैक्षिक गतिविधियाँ</h3>
                  <p className="text-xs text-slate-500 mt-1">ब्लॉक स्तर पर आयोजित विज्ञान प्रदर्शनियों, सांस्कृतिक प्रतिभा स्पर्धाओं एवं राष्ट्रीय उत्सवों की झलकियां</p>
                </div>

                {/* Filter gallery category */}
                <div className="flex bg-slate-100 p-1 rounded-lg border text-[10px] font-bold">
                  {['ALL', 'PM SHRI विद्यालय', 'महात्मा गाँधी विद्यालय', 'फ्लैगशिप योजनाएं', 'नवाचार'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-2 py-1 rounded transition cursor-pointer ${
                        galleryCategoryFilter === cat 
                          ? 'bg-orange-600 text-white' 
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.replace('विद्यालय', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid layout images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery
                  .filter(item => galleryCategoryFilter === 'ALL' || item.category === galleryCategoryFilter)
                  .map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-slate-50 border rounded-xl overflow-hidden hover:scale-102 transition shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden w-full aspect-video bg-slate-200">
                        {/* High quality dynamic visual proxy with unsplash */}
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-[9px] font-bold text-white px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="p-3 text-xs space-y-1 bg-white font-sans">
                        <p className="font-bold text-slate-900 leading-snug">{item.title}</p>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100 font-mono">
                          <span>📅 {item.date}</span>
                          <button 
                            onClick={() => setActiveLightboxImage(item.url)}
                            className="text-orange-600 font-bold hover:underline"
                          >
                            ज़ूम देखें 🔎
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Lightbox full image Modal viewer */}
              {activeLightboxImage && (
                <div 
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => setActiveLightboxImage(null)}
                >
                  <div className="relative max-w-3xl w-full max-h-[85vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
                    <button 
                      onClick={() => setActiveLightboxImage(null)}
                      className="absolute top-4 right-4 text-white text-sm font-black bg-black/60 px-3 py-1 pb-1.5 rounded-full hover:bg-red-600 transition"
                    >
                      ✖
                    </button>
                    <img 
                      src={activeLightboxImage} 
                      alt="Full screen preview" 
                      className="w-full h-auto max-h-[75vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* K. SOCIAL MEDIA LINKS AND FEED SIMULATORS */}
          {activeTab === 'social' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in" id="social-media-panel">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">🌐 सोशल मीडिया लिंक एवं लाइव डिजिटल बुलेटिन</h3>
                  <p className="text-xs text-slate-500 mt-1">कार्यालय की जन संपर्क नीतियों के प्रसार हेतु फेसबुक, ट्विटर (X) एवं यूट्यूब की कड़ियां</p>
                </div>

                <div className="flex bg-slate-105 p-1 rounded-lg border text-xs font-bold leading-none bg-slate-100">
                  <button 
                    onClick={() => setSocialFeedType('tw')}
                    className={`px-3 py-1 rounded transition cursor-pointer ${socialFeedType === 'tw' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}
                  >
                    X (ट्विटर)
                  </button>
                  <button 
                    onClick={() => setSocialFeedType('fb')}
                    className={`px-3 py-1 rounded transition cursor-pointer ${socialFeedType === 'fb' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                  >
                    फेसबुक
                  </button>
                  <button 
                    onClick={() => setSocialFeedType('yt')}
                    className={`px-3 py-1 rounded transition cursor-pointer ${socialFeedType === 'yt' ? 'bg-red-600 text-white' : 'text-slate-600'}`}
                  >
                    यूट्यूब ट्यूटोरियल
                  </button>
                </div>
              </div>

              {/* Feed simulation block */}
              <div className="bg-slate-50 p-4 border rounded-xl">
                
                {socialFeedType === 'tw' && (
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-slate-500 tracking-wider font-display">LIVE FEED: CBEO Pahari Tweets (@CBEO_Pahari_Deeg)</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 leading-normal space-y-2 font-sans text-left">
                      <div className="flex gap-2 items-center text-xs">
                        <span className="font-extrabold text-slate-900">CBEO PAHARI @CBEO_Pahari_Deeg</span>
                        <span className="text-slate-400 font-mono text-[10px]">12 hrs ago</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-805 font-medium leading-relaxed whitespace-pre-line">
                        {socialTweets}
                      </p>
                    </div>
                  </div>
                )}

                {socialFeedType === 'fb' && (
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-black uppercase text-slate-500 tracking-wider font-display">Facebook Bulletin Feed</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 leading-normal space-y-2 font-sans">
                      <p className="text-xs font-bold text-blue-800">कार्यालय मुख्य ब्लॉक शिक्षा अधिकारी पहाड़ी - समग्र शिक्षा</p>
                      <p className="text-xs md:text-sm text-slate-805 font-medium leading-relaxed">
                        {socialFbFeed}
                      </p>
                    </div>
                  </div>
                )}

                {socialFeedType === 'yt' && (
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-slate-500 tracking-wider font-display">यूट्यूब शाला दर्पण वीडियो गाइड और निर्देशन ट्यूटोरियल्स</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white border text-left p-3 rounded-lg shadow-sm space-y-2">
                        <div className="aspect-video bg-slate-900 rounded-md relative flex items-center justify-center text-red-500 select-none">
                          <span className="text-xl font-black font-display">▶ PLAY</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 font-sans">{socialYoutubeTitle1}</p>
                        <p className="text-[10px] text-slate-400 font-mono">विभागीय यूट्यूब चैनल • 5.4k व्यूज</p>
                      </div>
                      <div className="bg-white border text-left p-3 rounded-lg shadow-sm space-y-2">
                        <div className="aspect-video bg-slate-900 rounded-md relative flex items-center justify-center text-red-500 select-none">
                          <span className="text-xl font-black font-display">▶ PLAY</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 font-sans">{socialYoutubeTitle2}</p>
                        <p className="text-[10px] text-slate-400 font-mono">विभागीय नोडल गाइड • 3.1k व्यूज</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* L. STATE_LINKS PANEL */}
          {activeTab === 'state_links' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="state-links-panel">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">🔗 राज्य स्तरीय कार्यालय कड़ियाँ : अधिकृत वेबसाइट डायरेक्टरी</h3>
                  <p className="text-xs text-slate-500 mt-1">राजस्थान स्कूल शिक्षा परिषद् एवं मुख्य निदेशालयों के राजकीय वेब पोर्टल्स के सुगम लिंक समन्वयक</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officeLinks.map((portal) => (
                  <div 
                    key={portal.id} 
                    className="bg-slate-50 border rounded-xl p-4 hover:border-indigo-400 transition leading-normal flex flex-col justify-between space-y-3 text-left"
                  >
                    <div className="space-y-1.5 text-xs text-slate-800 font-medium font-sans">
                      <span className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono">
                        {portal.department}
                      </span>
                      <h4 className="text-xs font-bold text-slate-955 leading-tight font-sans">{portal.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{portal.description}</p>
                    </div>

                    <button
                      onClick={() => setRedirectWarningUrl({ title: portal.title, url: portal.url })}
                      className="inline-flex items-center gap-1 text-[10px] font-black text-indigo-700 hover:underline pt-2 font-mono uppercase cursor-pointer"
                    >
                      पोर्टल पर जावें <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {redirectWarningUrl && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                  <div className="bg-white p-5 md:p-6 rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 text-left">
                    <div className="flex items-center gap-2 text-amber-600 font-bold">
                      <Info className="w-5 h-5 text-amber-500 shrink-0" />
                      <h5 className="font-bold text-sm">बाहरी वेब लिंक रीडायरेक्शन अलर्ट!</h5>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-normal font-medium font-sans">
                      आप मुख्य ब्लॉक पहाड़ी के सुरक्षित विंग से प्रस्थान कर <strong>"{redirectWarningUrl.title}"</strong> अधिकृत राज्य स्तरीय शिक्षा विभाग पोर्टल पर जा रहे हैं। क्या आप जारी रखना चाहते हैं?
                    </p>

                    <div className="flex gap-2 text-xs font-bold">
                      <button
                        onClick={() => setRedirectWarningUrl(null)}
                        className="flex-1 py-1.5 px-3 border rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
                      >
                        रद्द करें
                      </button>
                      <a
                        href={redirectWarningUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setRedirectWarningUrl(null)}
                        className="flex-1 py-1.5 px-3 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-750 block font-bold cursor-pointer"
                      >
                        जी हाँ, जारी रखें
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* M. INCLUSIVE EDUCATION PANEL */}
          {activeTab === 'inclusive_edu' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="inclusive-edu-panel">
              <div className="border-b border-slate-100 pb-3 text-left">
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded uppercase font-display">
                  समावेशी बाल सुदृढ़ीकरण
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">❤️ समावेशी शिक्षा प्रभाग : विशेष आवश्यकता वाले बच्चों (CWSN) की प्रगति</h3>
                <p className="text-xs text-slate-500 mt-1">शारीरिक एवं मानसिक रूप से दिव्यांग बालकों के सर्वांगीण विकास हेतु संचालित सहायता, शिक्षण एवं भौतिक आवंटन सांख्यिकी</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-tr from-slate-50 to-rose-50/30 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">कुल CWSN नामांकन</p>
                  <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{inclusiveStats.totalCwsn}</p>
                </div>
                <div className="bg-gradient-to-tr from-slate-50 to-rose-50/30 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">सक्रिय संदर्भ कक्ष</p>
                  <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{inclusiveStats.resourceRooms}</p>
                </div>
                <div className="bg-gradient-to-tr from-slate-50 to-rose-50/30 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">विशेष शिक्षक संख्या</p>
                  <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{inclusiveStats.specialEducators}</p>
                </div>
                <div className="bg-gradient-to-tr from-slate-50 to-rose-50/30 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">सहायक उपकरण वितरण</p>
                  <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{inclusiveStats.equipmentsDistributed}</p>
                </div>
                <div className="bg-gradient-to-tr from-slate-50 to-rose-50/30 border border-slate-200 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">परिवहन व एस्कॉर्ट लाभांवित</p>
                  <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{inclusiveStats.escortGirls}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                <div className="border rounded-xl p-5 bg-slate-50/50 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-1.5 font-display text-rose-955">
                    <Heart className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>प्रशिक्षण एवं सुदृढ़ीकरण नीतियां</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex gap-2">
                       <span className="text-rose-500 font-bold">•</span>
                       <span>लक्षित बालकों को चिह्नीकरण एवं मेडिकल बोर्ड के माध्यम से प्रमाण पत्र जारी करना।</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-rose-500 font-bold">•</span>
                       <span>विशेष आवश्यकताओं वाले बच्चों को स्कूल रेडीनेस कार्यक्रम के अंतर्गत समाहित करना।</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-rose-500 font-bold">•</span>
                       <span>विशेष रूप से प्रशिक्षित अध्यापकों द्वारा व्यक्तिगत शैक्षिक योजना (IEP) का सुचारू संचालन।</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-xl p-5 bg-slate-50/50 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-1.5 font-display">
                    <Award className="w-4 h-4 text-pink-600" />
                    <span>विशेष वित्तीय लाभ एवं संबल योजनाएं</span>
                  </h4>
                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3 bg-white rounded-lg border border-pink-100">
                      <p className="font-extrabold text-pink-900">परिवहन एस्कॉर्ट भत्ता (CWSN Transport Allowance)</p>
                      <p className="text-[11px] mt-1 text-slate-500 font-medium font-sans">गंभीर दिव्यांग बालिकाओं को सहायता राशि के रूप में सीधे उनके बैंक खातों में वास्तविक भुगतान सुनिश्चित किया जाता है।</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* N. MID-DAY MEAL PANEL */}
          {activeTab === 'mdm_page' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="mdm-panel">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center text-left">
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-850 font-bold px-2 py-0.5 rounded uppercase font-display">
                    राजकीय पोषाहार कार्यक्रम (PM-Poshan)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">🥛 मध्याह्न पोषाहार एवं मुख्यमंत्री बाल गोपाल योजना</h3>
                  <p className="text-xs text-slate-500 mt-1">ब्लॉक के विद्यालयों में विद्यार्थियों के पोषण संवर्धन, गर्म भोजन वितरण एवं दूध वितरण योजना की प्रगति स्थिति</p>
                </div>
                <Milk className="w-8 h-8 text-amber-500 hidden sm:block shrink-0" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-tr from-amber-50/50 to-yellow-50/30 border border-amber-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-amber-600">{mdmStats.coveredSchools}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">आच्छादित विद्यालय</p>
                </div>
                <div className="bg-gradient-to-tr from-indigo-50/50 to-blue-50/30 border border-indigo-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-indigo-600">{mdmStats.dailyBeneficiaries}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">दैनिक लाभार्थी छात्र</p>
                </div>
                <div className="bg-gradient-to-tr from-emerald-50/50 to-teal-50/30 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-mono font-black text-emerald-600">{mdmStats.cookHelpers}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">स्थानिक कुक-कम-हेल्पर</p>
                </div>
                <div className="bg-gradient-to-tr from-rose-50/50 to-pink-50/30 border border-rose-200 rounded-xl p-4 text-center">
                  <p className="text-lg font-mono font-black text-rose-600 pt-1.5">{mdmStats.milkCoverage}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">बालगोपाल आच्छादन स्थिति</p>
                </div>
                <div className="bg-gradient-to-tr from-purple-50/50 to-fuchsia-50/30 border border-purple-200 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                  <p className="text-xs font-mono font-black text-purple-600 pt-2">{mdmStats.yearlyBudget}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-1">वार्षिक स्वीकृत बजट</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
                <div className="border rounded-xl p-5 bg-slate-50/50 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 border-b pb-2 flex items-center gap-1.5 font-display text-indigo-955">
                    <Milk className="w-4 h-4 text-indigo-600" />
                    <span>मुख्यमंत्री बाल गोपाल दूध योजना नियम व निर्देश</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-indigo-650 font-bold">•</span>
                      <span>कक्षा 1 से 5 तक के छात्रों को 150ml ताजा गर्म दूध वितरण।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* O. ANNUAL EVALUATION REPORT */}
          {activeTab === 'annual_report' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="annual-report-panel">
              <div className="border-b border-slate-100 pb-3 text-left">
                <h3 className="text-lg font-bold text-slate-900">📊 वार्षिक मूल्यांकन रिपोर्ट : सालाना रिपोर्ट और गुणात्मक विश्लेषण</h3>
                <p className="text-xs text-slate-500 mt-1">शैक्षणिक वर्ष 2024-25 के दौरान पहाड़ी ब्लॉक की विभागवार उपलब्धियाँ एवं रैंकिंग</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 border border-indigo-200 rounded-xl text-center">
                  <p className="text-[10px] text-indigo-700 tracking-widest uppercase">जिले में ब्लॉक रैंकिंग</p>
                  <p className="text-2.5xl font-black font-sans text-indigo-955 font-mono">{annualReportStats.districtRank} <span className="text-xs">वाँ स्थान</span></p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border border-emerald-200 rounded-xl text-center">
                  <p className="text-[10px] text-emerald-700 tracking-widest uppercase">शाला दर्पण प्रविष्टि दर</p>
                  <p className="text-2.5xl font-black font-sans text-emerald-955 font-mono">{annualReportStats.shalaDarpanEntry}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 border border-orange-200 rounded-xl text-center">
                  <p className="text-[10px] text-orange-700 tracking-widest uppercase">बालिका साक्षरता लक्ष्य प्राप्ति</p>
                  <p className="text-2.5xl font-black font-sans text-orange-955 font-mono">{annualReportStats.girlsLiteracy}</p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 select-none font-display">लक्ष्य बनाम प्राप्ति सांख्यिकी मूल्यांकन २०२४-२५</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border">
                    <thead>
                      <tr className="bg-slate-100 font-black text-slate-700">
                        <th className="p-2 border">मुख्य विभागीय आयाम</th>
                        <th className="p-2 border text-center">वार्षिक लक्ष्य</th>
                        <th className="p-2 border text-center">वास्तविक प्राप्ति %</th>
                        <th className="p-2 border">स्थिति निष्कर्ष</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium text-slate-850">
                      {annualReportStats.targets.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-2 border font-bold text-slate-900">{item.name}</td>
                          <td className="p-2 border text-center font-mono">{item.target}</td>
                          <td className="p-2 border text-center font-mono text-emerald-700 font-black">{item.achievement}</td>
                          <td className="p-2 border text-slate-500">{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* P. INNOVATIONS ADOPTED */}
          {activeTab === 'innovations' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="innovations-panel">
              <div className="border-b border-slate-100 pb-3 text-left">
                <h3 className="text-lg font-bold text-slate-900">🧩 नवाचार : शिक्षा में किए गए नए प्रयोग</h3>
                <p className="text-xs text-slate-500 mt-1">शैक्षिक और व्यावहारिक स्तर पर सुधार के लिए पहाड़ी ब्लॉक नोडल द्वारा सृजित डिजिटल व सामाजिक नवाचार परियोजनाएं</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {innovationsList.map((inno) => (
                  <div key={inno.id} className="bg-amber-50/40 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-2">
                      <span className="bg-amber-600 text-white font-mono text-[8.5px] font-black tracking-wider px-2 py-0.5 rounded uppercase">
                        लॉन्च वर्ष: {inno.launchedYear}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">{inno.title}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">{inno.description}</p>
                    </div>

                    <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1 text-[11px] font-semibold text-slate-855 font-sans leading-relaxed">
                      <p className="text-amber-800 font-bold">💥 नवाचारी परिणाम और प्रभाव:</p>
                      <p className="text-slate-600">{inno.impact}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase pt-1.5 mt-1 border-t">🎯 लक्षित वर्ग: {inno.targetStudents}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS & CIRCULARS TAB (गूगल ड्राइव से कनेक्टेड आदेश) */}
          {activeTab === 'circular_orders' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left">
              <div className="border-b border-slate-105 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[10px] bg-orange-100 text-orange-900 font-bold px-2 py-0.5 rounded font-mono uppercase">
                    कार्यालय परिपत्र एवं राज्य बोर्ड दिशा-निर्देश
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">📂 आदेश एवं परिपत्र (Circular Orders & Drive Files)</h3>
                  <p className="text-xs text-slate-500 mt-1">मुख्य ब्लॉक शिक्षा अधिकारी कार्यालय द्वारा जारी नवीनतम परिपत्र एवं दिशानिर्देश (गूगल ड्राइव से सिंक और बोल्ड फ़ॉर्मेट में)</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
              </div>

              {/* Connected Google Drive dynamic reference banner */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <p className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                    <span>सक्रिय गूगल ड्राइव लिंक (Connected Google Drive Folder Link)</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono font-semibold max-w-lg truncate">
                    {globalDriveFolder || 'https://drive.google.com/drive/folders/cbeopahari2-default-folder-id'}
                  </p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <a 
                    href={globalDriveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    🚀 ड्राइव पर देखें (Open Drive)
                  </a>
                  <button
                    onClick={() => {
                      const newLink = prompt('कृपया नया गूगल ड्राइव फ़ोल्डर लिंक दर्ज करें:', globalDriveFolder);
                      if (newLink) {
                        setGlobalDriveFolder(newLink);
                        localStorage.setItem('block_global_drive_folder', newLink);
                        alert('गूगल ड्राइव फोल्डर लिंक सफलतापूर्वक अपडेट कर दिया गया है!');
                      }
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    लिंक बदलें ✏️
                  </button>
                </div>
              </div>

              {/* Informative notice about bold/Drive uploaded files */}
              <div className="p-3.5 bg-orange-50 border border-orange-100 rounded-xl text-left">
                <p className="text-xs text-orange-950 font-bold leading-normal">
                  📌 <strong>नवीनतम महत्वपूर्ण निर्देश:</strong> नीचे प्रदर्शित सभी महत्वपूर्ण परिपत्र सीधे गूगल ड्राइव क्लाउड स्टोरेज से संकलित किये गए हैं। सुगमता हेतु सभी महत्वपूर्ण फाइलों के शीर्षक <strong>बोल्ड अक्षरों (Bold letters)</strong> में विशेष रूप से प्रदर्शित किये गए हैं। डाउनलोड या पूर्वावलोकन हेतु फाइल पर क्लिक करें।
                </p>
              </div>

              {/* Live Search and category filter */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-2">
                  <h4 className="text-xs font-black uppercase text-slate-705 text-slate-700 font-display animate-fade-in text-left">राजकीय आदेश और महत्वपूर्ण परिपत्रों की सूची</h4>
                  
                  {/* Inline Form trigger inside data subtab, or add-order here for easy access */}
                  <button
                    onClick={() => {
                      const title = prompt('कृपया नए परिपत्र / आदेश का शीर्षक प्रविष्ट करें:');
                      if (!title) return;
                      const link = prompt('कृपया गूगल ड्राइव फाइल लिंक या डाउनलोड यूआरएल दर्ज करें:');
                      if (!link) return;
                      const cat = prompt('श्रेणी दर्ज करें (जैसे: "विभाग परिपत्र", "सामान्य", "प्रशासकीय"):') || 'सामान्य';
                      
                      const newOrd = {
                        id: `order-${Date.now()}`,
                        title,
                        category: cat,
                        date: new Date().toLocaleDateString('hi-IN'),
                        driveUrl: link
                      };
                      const updated = [newOrd, ...circularOrders];
                      setCircularOrders(updated);
                      localStorage.setItem('block_circular_orders', JSON.stringify(updated));
                      alert('नया आदेश सफलतापूर्वक गूगल ड्राइव क्लाउड समन्वयक के साथ जोड़ दिया गया है!');
                    }}
                    className="px-3 py-1.5 bg-orange-655 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[11px] rounded-lg shadow-sm transition cursor-pointer"
                  >
                    + नया आदेश / परिपत्र जोड़ें
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {circularOrders.map((ord) => (
                    <div 
                      key={ord.id} 
                      className="border border-slate-205 border-slate-200 rounded-xl p-4 bg-white hover:border-orange-200 hover:bg-slate-50/50 transition duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-left"
                    >
                      <div className="space-y-1.5 flex-1 text-left">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[9px] font-black uppercase font-mono px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-700">
                            {ord.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            📅 जारी दिनांक: {ord.date}
                          </span>
                        </div>
                        {/* THE FILE NAMES MUST BE IN BOLD (बोल्ड में) */}
                        <p className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                          {ord.title}
                        </p>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <a 
                          href={ord.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer shrink-0 truncate flex items-center gap-1"
                        >
                          📥 डाउनलोड / देखें
                        </a>
                        <button
                          onClick={() => {
                            if (confirm('क्या आप सचमुच इस राजकीय आदेश संदर्भ को हटाना चाहते हैं?')) {
                              const updated = circularOrders.filter(co => co.id !== ord.id);
                              setCircularOrders(updated);
                              localStorage.setItem('block_circular_orders', JSON.stringify(updated));
                            }
                          }}
                          className="p-2 text-xs text-red-650 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-xl border border-transparent transition cursor-pointer shrink-0"
                          title="हटाएं"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  {circularOrders.length === 0 && (
                    <div className="py-12 border border-dashed rounded-xl text-center bg-slate-50 text-xs font-semibold text-slate-500">
                      📂 वर्तमान में कोई आदेश संचित नहीं है। कृपया नया आदेश जोड़ने वाले बटन पर क्लिक करें।
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Q. DATA EDITOR PANEL */}
          {activeTab === 'data_editor' && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6 animate-fade-in text-left" id="data-editor-control-panel">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center text-left">
                <div>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded uppercase font-display">
                    कार्यालय प्रबंधन क्रेडेंशियल
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">⌨️ समग्र डाटा संशोधन एवं शाला दर्पण प्रवेशक (Data Modification Console)</h3>
                  <p className="text-xs text-slate-500 mt-1">कार्यालय की सभी प्रविष्टि सांख्यिकी, योजनाएं, गैलरी, स्टाफ एवं सोशल मीडिया कड़ियों को रीयल-टाइम में संपादित करें</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-red-600 shrink-0 hidden sm:block" />
              </div>

              {!isUnlocked ? (
                <div className="max-w-md mx-auto py-12 px-6 border border-slate-200 rounded-2xl bg-slate-50 text-center space-y-5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-sm text-slate-900 font-display">प्रशासनिक प्राधिकार सत्यापन आवश्यक</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      आगे बढ़ने के लिए अधिकृत 4-अंकीय प्रवेश कोड प्रविष्ट करें।
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="••••"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError('');
                      }}
                      className="w-28 text-center text-xl font-bold tracking-widest font-mono p-2 border-2 border-slate-300 rounded-xl focus:border-red-500 focus:ring focus:ring-red-100 outline-none"
                    />
                    
                    {pinError && (
                      <p className="text-xs text-red-600 font-bold">{pinError}</p>
                    )}

                    <button
                      onClick={() => {
                        if (pinInput.trim() === '2026') {
                          setIsUnlocked(true);
                          localStorage.setItem('did_unlock_editor', 'true');
                        } else {
                          setPinError('अमान्य पिन कोड! कृपया पुनः प्रयास करें।');
                        }
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-black text-white font-black text-xs rounded-xl shadow transition cursor-pointer"
                    >
                      संशोधन पैनल अनलॉक करें
                    </button>
                    
                    <p className="text-[10px] text-slate-400 font-bold">
                      *परिवर्तन हेतु संकेत-पिन: <span className="font-mono text-slate-500 font-black">2026</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Alert panel indicating open mode */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex justify-between items-center no-print">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Unlock className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-slate-800">
                        <p className="text-emerald-900 font-bold">डेटा संपादन सक्रिय है (Panel Unlocked)</p>
                        <p className="text-slate-500 font-medium">आपका संशोधन वास्तविक आंकड़ों को तुरंत बदल देगा।</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsUnlocked(false);
                        localStorage.removeItem('did_unlock_editor');
                      }}
                      className="text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 font-extrabold transition cursor-pointer"
                    >
                      सुरक्षित पुनः लॉक करें
                    </button>
                  </div>

                  {/* SUB TAB MENU CONTROLLER */}
                  <div className="flex border-b border-slate-200 overflow-x-auto pb-px scrollbar-thin select-none no-print">
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('general_social')}
                      className={`px-4 py-2.5 text-xs font-black whitespace-nowrap border-b-2 transition ${
                        editorSubTab === 'general_social'
                          ? 'border-orange-605 border-orange-600 text-orange-600'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      📢 सामान्य और सोशल मीडिया
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('schools_schemes')}
                      className={`px-4 py-2.5 text-xs font-black whitespace-nowrap border-b-2 transition ${
                        editorSubTab === 'schools_schemes'
                          ? 'border-orange-605 border-orange-600 text-orange-600'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      🏫 विद्यालय, बेस्ट प्रैक्टिस व योजनाएं
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('academic_stats')}
                      className={`px-4 py-2.5 text-xs font-black whitespace-nowrap border-b-2 transition ${
                        editorSubTab === 'academic_stats'
                          ? 'border-orange-605 border-orange-600 text-orange-600'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      📊 अकादमिक और पोषण सांख्यिकी
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('staff_gallery')}
                      className={`px-4 py-2.5 text-xs font-black whitespace-nowrap border-b-2 transition ${
                        editorSubTab === 'staff_gallery'
                          ? 'border-orange-605 border-orange-600 text-orange-600'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      🏛️ स्टाफ, गैलरी व वार्षिक रिपोर्ट
                    </button>
                  </div>

                  {/* FORM SECTIONS STARTS */}
                  <div className="space-y-6 max-h-[120vh] overflow-y-auto pr-1">
                    
                    {/* SECTION 1: GENERAL & SOCIAL MEDIA */}
                    {editorSubTab === 'general_social' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider">1.1 मूल विभाग सेटिंग्स व ताज़ा घोषणाएँ (Primary Settings & Live Announcements)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-650 block">राजकीय शाला दर्पण कोड (Shala Darpan Code):</label>
                              <input
                                type="text"
                                value={shalaDarpanCode}
                                onChange={(e) => setShalaDarpanCode(e.target.value.trim())}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white focus:outline-indigo-550"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-650 block">कार्यालय परिचय वाक्य (CBEO Office Introduction Text):</label>
                              <textarea
                                value={officeIntro}
                                onChange={(e) => setOfficeIntro(e.target.value)}
                                rows={3}
                                className="w-full text-xs font-semibold p-2 border rounded-lg bg-white font-sans focus:outline-indigo-550"
                              />
                            </div>
                          </div>

                          {/* Dynamic ticker announcement editing module */}
                          <div className="bg-white p-3.5 rounded-xl border border-indigo-100 space-y-3">
                            <label className="text-xs font-black text-slate-805 text-slate-800 uppercase tracking-tight block">📊 ताज़ा लाइव घोषणायें (Top Banner Announcements Broadcast):</label>
                            
                            <div className="space-y-2">
                              {announcements.map((ann, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                  <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-1.5 rounded font-black font-mono">#{idx + 1}</span>
                                  <input 
                                    type="text"
                                    value={ann}
                                    onChange={(e) => {
                                      const updated = [...announcements];
                                      updated[idx] = e.target.value;
                                      setAnnouncements(updated);
                                      localStorage.setItem('block_announcements_ticker', JSON.stringify(updated));
                                    }}
                                    className="flex-1 p-2 border rounded-lg bg-slate-50/40 text-xs font-bold text-slate-800 focus:bg-white transition"
                                  />
                                  <button
                                    onClick={() => {
                                      const updated = announcements.filter((_, i) => i !== idx);
                                      setAnnouncements(updated);
                                      localStorage.setItem('block_announcements_ticker', JSON.stringify(updated));
                                    }}
                                    className="p-2 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition"
                                    title="हटाएँ"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => {
                                const updated = [...announcements, 'कार्यालय द्वारा आयोजित नवीन शैक्षिक प्रोत्साहन परिणाम विवरण शीघ्र ही शाला दर्पण पोर्टल पर जारी होगा।'];
                                setAnnouncements(updated);
                                localStorage.setItem('block_announcements_ticker', JSON.stringify(updated));
                              }}
                              className="px-3.5 py-1.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] rounded-lg shadow-sm transition cursor-pointer"
                            >
                              + नई लाइव घोषणा पंक्ति जोडें
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider">1.2 सोशल मीडिया बुलेटिन (Social Media Feeds)</h4>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-650 block">X/ट्विटर की ताज़ा पोस्ट (Twitter Live Tweet):</label>
                              <textarea
                                value={socialTweets}
                                onChange={(e) => setSocialTweets(e.target.value)}
                                rows={2}
                                className="w-full text-xs font-semibold p-2 border rounded-lg bg-white font-sans"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-650 block">फेसबुक बुलेटिन ताज़ा पोस्ट (Facebook Feed):</label>
                              <textarea
                                value={socialFbFeed}
                                onChange={(e) => setSocialFbFeed(e.target.value)}
                                rows={2}
                                className="w-full text-xs font-semibold p-2 border rounded-lg bg-white font-sans"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-650 block">यूट्यूब ट्यूटोरियल 1 का शीर्षक:</label>
                                <input
                                  type="text"
                                  value={socialYoutubeTitle1}
                                  onChange={(e) => setSocialYoutubeTitle1(e.target.value)}
                                  className="w-full text-xs font-bold p-2 border rounded-lg bg-white font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-650 block">यूट्यूब ट्यूटोरियल 2 का शीर्षक:</label>
                                <input
                                  type="text"
                                  value={socialYoutubeTitle2}
                                  onChange={(e) => setSocialYoutubeTitle2(e.target.value)}
                                  className="w-full text-xs font-bold p-2 border rounded-lg bg-white font-sans"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: SPECIAL SCHOOLS, BEST PRACTICES & SCHEMES */}
                    {editorSubTab === 'schools_schemes' && (
                      <div className="space-y-4 animate-fade-in">
                        {/* 2.1 PM SHRI & MGGS Schools */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider">2.1 विशेष नोडल स्कूल विवरण (PM SHRI, Mahatma Gandhi Schools)</h4>
                          <div className="space-y-4 divide-y divide-slate-205">
                            {specialSchs.map((sch: any, idx: number) => (
                              <div key={sch.id} className="pt-3 first:pt-0 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-black text-indigo-750 font-mono bg-indigo-50 px-2 py-0.5 rounded">ID: {sch.id} [{sch.type}]</span>
                                  <span className="text-xs font-bold text-slate-400">विशेष संस्था #{idx+1}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">स्कूल का नाम:</label>
                                    <input
                                      type="text"
                                      value={sch.name}
                                      onChange={(e) => {
                                        const updated = [...specialSchs];
                                        updated[idx] = { ...sch, name: e.target.value };
                                        setSpecialSchs(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">विद्यार्थी काउंट:</label>
                                    <input
                                      type="number"
                                      value={sch.studentsCount}
                                      onChange={(e) => {
                                        const updated = [...specialSchs];
                                        updated[idx] = { ...sch, studentsCount: parseInt(e.target.value) || 0 };
                                        setSpecialSchs(updated);
                                      }}
                                      className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">शिक्षक काउंट:</label>
                                    <input
                                      type="number"
                                      value={sch.teachersCount}
                                      onChange={(e) => {
                                        const updated = [...specialSchs];
                                        updated[idx] = { ...sch, teachersCount: parseInt(e.target.value) || 0 };
                                        setSpecialSchs(updated);
                                      }}
                                      className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">स्थान / अवस्थिति:</label>
                                    <input
                                      type="text"
                                      value={sch.location}
                                      onChange={(e) => {
                                        const updated = [...specialSchs];
                                        updated[idx] = { ...sch, location: e.target.value };
                                        setSpecialSchs(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">मुख्य सुविधाएँ (Semicolon `;` Separated):</label>
                                    <input
                                      type="text"
                                      value={Array.isArray(sch.facilities) ? sch.facilities.join('; ') : sch.facilities}
                                      onChange={(e) => {
                                        const updated = [...specialSchs];
                                        updated[idx] = { ...sch, facilities: e.target.value.split(';').map((s: string) => s.trim()) };
                                        setSpecialSchs(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2.2 Flagship Schemes */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider">2.2 फ्लैगशिप योजनाएं (Education Flagship Schemes)</h4>
                          <div className="space-y-4 divide-y divide-slate-205">
                            {schemes.map((scm: any, idx: number) => (
                              <div key={scm.id} className="pt-3 first:pt-0 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-black text-amber-900 font-mono bg-amber-50 px-2 py-0.5 rounded">ID: {scm.id}</span>
                                  <p className="text-xs font-bold text-slate-705">{scm.name}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">योजना शीर्ष नाम:</label>
                                    <input
                                      type="text"
                                      value={scm.name}
                                      onChange={(e) => {
                                        const updated = [...schemes];
                                        updated[idx] = { ...scm, name: e.target.value };
                                        setSchemes(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">लक्षित वर्ग समूह:</label>
                                    <input
                                      type="text"
                                      value={scm.targetGroup}
                                      onChange={(e) => {
                                        const updated = [...schemes];
                                        updated[idx] = { ...scm, targetGroup: e.target.value };
                                        setSchemes(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-505">योजना के मुख्य लाभ / प्रावधान:</label>
                                  <input
                                    type="text"
                                    value={scm.benefits}
                                    onChange={(e) => {
                                      const updated = [...schemes];
                                      updated[idx] = { ...scm, benefits: e.target.value };
                                      setSchemes(updated);
                                    }}
                                    className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-505">पहाड़ी ब्लॉक में वर्तमान सांख्यिकीय स्तिथि:</label>
                                  <textarea
                                    value={scm.statusInPahari}
                                    onChange={(e) => {
                                      const updated = [...schemes];
                                      updated[idx] = { ...scm, statusInPahari: e.target.value };
                                      setSchemes(updated);
                                    }}
                                    rows={2}
                                    className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2.3 Best Practices & Innovations */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider">2.3 श्रेष्ठ पद्धतियां (Best Practices Editor)</h4>
                          <div className="space-y-4 divide-y divide-slate-205">
                            {practices.map((bp: any, idx: number) => (
                              <div key={bp.id || idx} className="pt-3 first:pt-0 space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-505">बेस्ट प्रैक्टिस शीर्षक:</label>
                                  <input
                                    type="text"
                                    value={bp.title}
                                    onChange={(e) => {
                                      const updated = [...practices];
                                      updated[idx] = { ...bp, title: e.target.value };
                                      setPractices(updated);
                                    }}
                                    className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-505">व्याख्या / विवरण:</label>
                                  <textarea
                                    value={bp.description}
                                    onChange={(e) => {
                                      const updated = [...practices];
                                      updated[idx] = { ...bp, description: e.target.value };
                                      setPractices(updated);
                                    }}
                                    rows={2}
                                    className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">कार्यान्वयन नीति:</label>
                                    <input
                                      type="text"
                                      value={bp.keyStrategy}
                                      onChange={(e) => {
                                        const updated = [...practices];
                                        updated[idx] = { ...bp, keyStrategy: e.target.value };
                                        setPractices(updated);
                                      }}
                                      className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">सुधार पैमाना:</label>
                                    <input
                                      type="text"
                                      value={bp.impactScale}
                                      onChange={(e) => {
                                        const updated = [...practices];
                                        updated[idx] = { ...bp, impactScale: e.target.value };
                                        setPractices(updated);
                                      }}
                                      className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2.4 Educational Innovations */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider">2.4 नवाचार और नए प्रयोग (Innovations Editor)</h4>
                          <div className="space-y-4 divide-y divide-slate-205">
                            {innovationsList.map((inno: any, idx: number) => (
                              <div key={inno.id || idx} className="pt-3 first:pt-0 space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div className="space-y-1 col-span-2">
                                    <label className="text-[10.5px] font-bold text-slate-505">नवाचार का प्रोजेक्ट नाम:</label>
                                    <input
                                      type="text"
                                      value={inno.title}
                                      onChange={(e) => {
                                        const updated = [...innovationsList];
                                        updated[idx] = { ...inno, title: e.target.value };
                                        setInnovationsList(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">लॉन्च वर्ष:</label>
                                    <input
                                      type="text"
                                      value={inno.launchedYear}
                                      onChange={(e) => {
                                        const updated = [...innovationsList];
                                        updated[idx] = { ...inno, launchedYear: e.target.value };
                                        setInnovationsList(updated);
                                      }}
                                      className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-505">संक्षिप्त विवरण:</label>
                                  <textarea
                                    value={inno.description}
                                    onChange={(e) => {
                                      const updated = [...innovationsList];
                                      updated[idx] = { ...inno, description: e.target.value };
                                      setInnovationsList(updated);
                                    }}
                                    rows={2}
                                    className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">नवीन परिणाम व प्रभाव:</label>
                                    <input
                                      type="text"
                                      value={inno.impact}
                                      onChange={(e) => {
                                        const updated = [...innovationsList];
                                        updated[idx] = { ...inno, impact: e.target.value };
                                        setInnovationsList(updated);
                                      }}
                                      className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-505">लक्षित वर्ग:</label>
                                    <input
                                      type="text"
                                      value={inno.targetStudents}
                                      onChange={(e) => {
                                        const updated = [...innovationsList];
                                        updated[idx] = { ...inno, targetStudents: e.target.value };
                                        setInnovationsList(updated);
                                      }}
                                      className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: ACADEMIC & NUTRITION STATISTICS */}
                    {editorSubTab === 'academic_stats' && (
                      <div className="space-y-4 animate-fade-in">
                        {/* 3.1 Primary Education statistics */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-orange-955 tracking-wider font-display">3.1 प्रारंभिक शिक्षा विंग सांख्यिकी (Elementary Statistics)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">कुल प्राथमिक स्कूल्स काउंट:</label>
                              <input
                                type="number"
                                value={blockStats.elementary.totalSchools}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    elementary: { ...blockStats.elementary, totalSchools: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">समग्र प्रारंभिक नामांकन छात्र:</label>
                              <input
                                type="number"
                                value={blockStats.elementary.totalEnrollment}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    elementary: { ...blockStats.elementary, totalEnrollment: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">सक्रिय प्रारंभिक शिक्षक:</label>
                              <input
                                type="number"
                                value={blockStats.elementary.teachersCount}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    elementary: { ...blockStats.elementary, teachersCount: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3.2 Secondary Education statistics */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider font-display">3.2 माध्यमिक शिक्षा विंग सांख्यिकी (Secondary Statistics)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">कुल माध्यमिक स्कूल:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.secondarySchools}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, secondarySchools: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">कुल उच्च माध्यमिक विद्यालय:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.seniorSecondarySchools}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, seniorSecondarySchools: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">समग्र माध्यमिक नामांकन:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.totalEnrollment}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, totalEnrollment: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">सक्रिय माध्यमिक शिक्षक:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.teachersCount}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, teachersCount: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">क्रियाशील IT लैब्स:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.itLabsSetup}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, itLabsSetup: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">क्रियाशील विज्ञान लैब्स:</label>
                              <input
                                type="number"
                                value={blockStats.secondary.scienceLabsSetup}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setBlockStats({
                                    ...blockStats,
                                    secondary: { ...blockStats.secondary, scienceLabsSetup: v }
                                  });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3.3 Comparative Board Results */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-amber-955 tracking-wider font-display">3.3 कक्षा 10 वीं बोर्ड परीक्षा तुलनात्मक परिणाम (2021-2025)</h4>
                          <p className="text-[10px] text-slate-500 italic">*ये मान आटोमैटिक तरीके से ग्राफिकल प्रोग्रेस बार में अपडेट हो जायेंगे।</p>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {boardRes.map((item: any, idx: number) => (
                              <div key={idx} className="space-y-1 bg-white p-2.5 rounded border border-slate-200">
                                <p className="text-[11px] font-black text-slate-900">वर्ष {item.year}</p>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-extrabold text-slate-500 block">10वीं पास %</label>
                                  <input
                                    type="number"
                                    step="0.1"
                                    value={item.class10PassPercent}
                                    onChange={(e) => {
                                      const v = parseFloat(e.target.value) || 0;
                                      const updated = [...boardRes];
                                      updated[idx] = { ...updated[idx], class10PassPercent: v };
                                      setBoardRes(updated);
                                    }}
                                    className="w-full text-xs font-mono font-bold p-1 border rounded"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3.4 Inclusive stats parameters */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-pink-955 tracking-wider font-display">3.4 समावेशी शिक्षा (CWSN Metrics)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">कुल पंजीकृत CWSN छात्र:</label>
                              <input
                                type="number"
                                value={inclusiveStats.totalCwsn}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setInclusiveStats({ ...inclusiveStats, totalCwsn: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">सक्रिय संदर्भ कमरे:</label>
                              <input
                                type="number"
                                value={inclusiveStats.resourceRooms}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setInclusiveStats({ ...inclusiveStats, resourceRooms: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">विशेष शिक्षक काउंट:</label>
                              <input
                                type="number"
                                value={inclusiveStats.specialEducators}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setInclusiveStats({ ...inclusiveStats, specialEducators: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">सहायक उपकरण वितरण (Distributed Equipments):</label>
                              <input
                                type="number"
                                value={inclusiveStats.equipmentsDistributed}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setInclusiveStats({ ...inclusiveStats, equipmentsDistributed: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">परिवहन व एस्कॉर्ट भत्ता प्राप्त बालिकाएं:</label>
                              <input
                                type="number"
                                value={inclusiveStats.escortGirls}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setInclusiveStats({ ...inclusiveStats, escortGirls: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3.5 MDM Metrics */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                          <h4 className="text-xs font-black uppercase text-amber-955 tracking-wider font-display">3.5 मध्याह्न पोषाहार (MDM & Milk Metrics)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">संबद्ध प्राथमिक विद्यालय:</label>
                              <input
                                type="number"
                                value={mdmStats.coveredSchools}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setMdmStats({ ...mdmStats, coveredSchools: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">दैनिक लाभार्थी छात्र count:</label>
                              <input
                                type="number"
                                value={mdmStats.dailyBeneficiaries}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setMdmStats({ ...mdmStats, dailyBeneficiaries: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">कार्यरत स्थानिक कुक-कम-हेल्पर्स:</label>
                              <input
                                type="number"
                                value={mdmStats.cookHelpers}
                                onChange={(e) => {
                                  const v = parseInt(e.target.value) || 0;
                                  setMdmStats({ ...mdmStats, cookHelpers: v });
                                }}
                                className="w-full text-xs font-mono font-bold p-2 border rounded-lg bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">बालगोपाल आच्छादन स्थिति:</label>
                              <input
                                type="text"
                                value={mdmStats.milkCoverage}
                                onChange={(e) => {
                                  setMdmStats({ ...mdmStats, milkCoverage: e.target.value });
                                }}
                                className="w-full text-xs font-bold p-2 border rounded-lg bg-white font-sans"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">निधि/बजट प्रविष्टि:</label>
                              <input
                                type="text"
                                value={mdmStats.yearlyBudget}
                                onChange={(e) => {
                                  setMdmStats({ ...mdmStats, yearlyBudget: e.target.value });
                                }}
                                className="w-full text-xs font-bold p-2 border rounded-lg bg-white font-sans"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 4: CBEO STAFF MEMBERS, GALLERY & ANNUAL REPORT HIGHLIGHTS */}
                    {editorSubTab === 'staff_gallery' && (
                      <div className="space-y-4 animate-fade-in">
                        {/* 4.1 CBEO Staff profiles */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider font-display">4.1 कार्यालय प्रशासनिक स्टाफ संगठन (CBEO Staff Profiles)</h4>
                          <div className="space-y-4 divide-y divide-slate-200">
                            {staff.map((std: any, idx: number) => (
                              <div key={std.id || idx} className="pt-3 first:pt-0 space-y-2 font-display">
                                <span className="bg-indigo-100 text-indigo-900 font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase">अधिकारी #{idx+1} [ID: {std.id}]</span>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">अधिकारी का नाम (Name):</label>
                                    <input
                                      type="text"
                                      value={std.name}
                                      onChange={(e) => {
                                        const updated = [...staff];
                                        updated[idx] = { ...std, name: e.target.value };
                                        setStaff(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">पद / पदनाम (Designation):</label>
                                    <input
                                      type="text"
                                      value={std.designation}
                                      onChange={(e) => {
                                        const updated = [...staff];
                                        updated[idx] = { ...std, designation: e.target.value };
                                        setStaff(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">योग्यता (Qualification):</label>
                                    <input
                                      type="text"
                                      value={std.qualification}
                                      onChange={(e) => {
                                        const updated = [...staff];
                                        updated[idx] = { ...std, qualification: e.target.value };
                                        setStaff(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">ईमेल (Email):</label>
                                    <input
                                      type="email"
                                      value={std.email}
                                      onChange={(e) => {
                                        const updated = [...staff];
                                        updated[idx] = { ...std, email: e.target.value };
                                        setStaff(updated);
                                      }}
                                      className="w-full text-xs font-mono font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">फ़ोन नंबर / मोबाइल:</label>
                                    <input
                                      type="text"
                                      value={std.phone}
                                      onChange={(e) => {
                                        const updated = [...staff];
                                        updated[idx] = { ...std, phone: e.target.value };
                                        setStaff(updated);
                                      }}
                                      className="w-full text-xs font-mono font-semibold p-1.5 border rounded bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-600">कार्य एवं दायित्व आवंटन (Role Duties in Office):</label>
                                  <input
                                    type="text"
                                    value={std.role}
                                    onChange={(e) => {
                                      const updated = [...staff];
                                      updated[idx] = { ...std, role: e.target.value };
                                      setStaff(updated);
                                    }}
                                    className="w-full text-xs font-medium p-1.5 border rounded bg-white font-sans"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 4.2 Photo Gallery manager */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider">4.2 फोटो और वीडियो गैलरी (Gallery Items Manager)</h4>
                          <div className="space-y-4 divide-y divide-slate-205 border-t">
                            {gallery.map((glt: any, idx: number) => (
                              <div key={glt.id || idx} className="pt-3 first:pt-0 space-y-2">
                                <span className="bg-orange-100 text-orange-850 bg-orange-100 text-orange-800 font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase font-sans">फोटो #{idx+1}</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">फोटो शीर्षक (Title):</label>
                                    <input
                                      type="text"
                                      value={glt.title}
                                      onChange={(e) => {
                                        const updated = [...gallery];
                                        updated[idx] = { ...glt, title: e.target.value };
                                        setGallery(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10.5px] font-bold text-slate-600">कैटेगरी (Category):</label>
                                    <input
                                      type="text"
                                      value={glt.category}
                                      onChange={(e) => {
                                        const updated = [...gallery];
                                        updated[idx] = { ...glt, category: e.target.value };
                                        setGallery(updated);
                                      }}
                                      className="w-full text-xs font-bold p-1.5 border rounded bg-white font-sans"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10.5px] font-bold text-slate-600">छवि भंडार URL लिंक (Photo Image URL):</label>
                                  <input
                                    type="text"
                                    value={glt.url}
                                    onChange={(e) => {
                                      const updated = [...gallery];
                                      updated[idx] = { ...glt, url: e.target.value };
                                      setGallery(updated);
                                    }}
                                    className="w-full text-xs font-mono p-1.5 border rounded bg-white"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 4.3 Annual report parameters */}
                        <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                          <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider">4.3 वार्षिक मूल्यांकन और रिपोर्ट लक्ष्य (Annual Evaluation targets)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">जिले में ब्लॉक रैंकिंग:</label>
                              <input
                                type="text"
                                value={annualReportStats.districtRank}
                                onChange={(e) => setAnnualReportStats({ ...annualReportStats, districtRank: e.target.value })}
                                className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">शाला दर्पण प्रविष्टि दर %:</label>
                              <input
                                type="text"
                                value={annualReportStats.shalaDarpanEntry}
                                onChange={(e) => setAnnualReportStats({ ...annualReportStats, shalaDarpanEntry: e.target.value })}
                                className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-600 block">बालिका साक्षरता लक्ष्य %:</label>
                              <input
                                type="text"
                                value={annualReportStats.girlsLiteracy}
                                onChange={(e) => setAnnualReportStats({ ...annualReportStats, girlsLiteracy: e.target.value })}
                                className="w-full text-xs font-mono font-bold p-1.5 border rounded bg-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-3 pt-2">
                            <p className="text-[10px] font-bold text-slate-500 block uppercase">वार्षिक लक्ष्य प्रदर्शन विवरण तालिका</p>
                            <div className="space-y-3">
                              {annualReportStats.targets.map((trg: any, idx: number) => (
                                <div key={trg.id} className="p-2.5 border rounded bg-white space-y-2 text-xs">
                                  <div className="flex justify-between font-bold text-[10.5px] text-slate-705 text-slate-700">
                                    <span>लक्ष्य आयाम #{idx+1}</span>
                                    <span>{trg.name}</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[9.5px] font-semibold text-slate-400 font-sans">वार्षिक लक्ष्य:</label>
                                      <input
                                        type="text"
                                        value={trg.target}
                                        onChange={(e) => {
                                          const updatedTargets = [...annualReportStats.targets];
                                          updatedTargets[idx] = { ...trg, target: e.target.value };
                                          setAnnualReportStats({ ...annualReportStats, targets: updatedTargets });
                                        }}
                                        className="w-full text-xs font-sans text-slate-800 p-1 border rounded"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9.5px] font-semibold text-slate-400 font-sans">वास्तविक प्राप्ति प्रतिशत:</label>
                                      <input
                                        type="text"
                                        value={trg.achievement}
                                        onChange={(e) => {
                                          const updatedTargets = [...annualReportStats.targets];
                                          updatedTargets[idx] = { ...trg, achievement: e.target.value };
                                          setAnnualReportStats({ ...annualReportStats, targets: updatedTargets });
                                        }}
                                        className="w-full text-xs font-mono text-slate-800 p-1 border rounded"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9.5px] font-semibold text-slate-400 font-sans">स्थिति निष्कर्ष:</label>
                                      <input
                                        type="text"
                                        value={trg.status}
                                        onChange={(e) => {
                                          const updatedTargets = [...annualReportStats.targets];
                                          updatedTargets[idx] = { ...trg, status: e.target.value };
                                          setAnnualReportStats({ ...annualReportStats, targets: updatedTargets });
                                        }}
                                        className="w-full text-xs font-sans text-slate-800 p-1 border rounded"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        // Persist edits to local storage
                        localStorage.setItem('shala_darpan_code', shalaDarpanCode);
                        localStorage.setItem('block_statistics', JSON.stringify(blockStats));
                        localStorage.setItem('special_schools', JSON.stringify(specialSchs));
                        localStorage.setItem('flagship_schemes', JSON.stringify(schemes));
                        localStorage.setItem('board_results', JSON.stringify(boardRes));
                        localStorage.setItem('inclusive_stats', JSON.stringify(inclusiveStats));
                        localStorage.setItem('mdm_stats', JSON.stringify(mdmStats));

                        // Persist office, order lists and dynamic drive fields
                        localStorage.setItem('block_staff_list', JSON.stringify(staff));
                        localStorage.setItem('block_circular_orders', JSON.stringify(circularOrders));
                        localStorage.setItem('block_global_drive_folder', globalDriveFolder);
                        localStorage.setItem('block_announcements_ticker', JSON.stringify(announcements));

                        // Simple feedback
                        alert('कार्यालय प्रविष्टि डेटा सफलतापूर्वक सहेज लिया गया है एवं पूरे डैशबोर्ड में अद्यतन कर दिया गया है!');
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>परिवर्तित आंकड़े सहेजें (Save Changes)</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('क्या आप सचमुच प्रारंभिक राजकीय मानकों पर डेटा को पुनः स्थापित करना चाहते हैं?')) {
                          localStorage.clear();
                          // Reload page to re-read imported variables
                          window.location.reload();
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-350 transition cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>मानक आंकड़े पुनः स्थापित करें (Reset System)</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}



          {/* SPECIAL FEATURE #1. BOARD RESULTS INTERACTIVE COMPONENT */}
          {activeTab === 'board_results' && (
            <ResultsComparisonDashboard boardResults={boardRes} />
          )}

          {/* SPECIAL FEATURE #2. CHILDREN GAME ARENA AND QUIZ MODULE */}
          {activeTab === 'games_quiz' && (
            <AcademicQuizZone />
          )}

          {/* SPECIAL FEATURE #3. AUTO ANALYSIS MULTI-PARAMETER STUDIO */}
          {activeTab === 'auto_analysis' && (
            <AutoAnalysisReportGroup blockStats={blockStats} boardResults={boardRes} />
          )}

        </section>
      </main>

      {/* 3. Global Administrative administrative footer */}
      <footer className="bg-slate-900 text-white py-8 border-t-4 border-orange-500 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-semibold text-slate-400">
          
          {/* Main info credentials */}
          <div className="space-y-3 font-medium">
            <h4 className="text-sm font-black text-white font-display">कार्यालय मुख्य ब्लॉक शिक्षा अधिकारी पहाड़ी</h4>
            <p className="leading-relaxed">समग्र शिक्षा (Samagra Shiksha), खंड नोडल अनुविभाजन।</p>
            <p className="leading-relaxed">जिला - डीग (राजस्थान) - 321024</p>
            <p className="text-[10px] text-slate-550 border-t border-slate-800 pt-2 font-semibold">
              © सत्र 2024 - 2026 स्कूल शिक्षा विभाग, राजस्थान सरकार।
            </p>
          </div>

          {/* Legal references */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-display">प्रशासनिक सहायता व हेल्पलाइन</h4>
            <div className="space-y-1.5 leading-normal">
              <p className="flex justify-between items-center text-[11px]">
                <span>नोडल नियंत्रण विभाग:</span>
                <span className="text-white">+91 05644-XXXXXX</span>
              </p>
              <p className="flex justify-between items-center text-[11px]">
                <span>तकनीकी शाला दर्पण प्रभारी:</span>
                <span className="text-white">sd.pahari@rajasthan.gov.in</span>
              </p>
              <p className="flex justify-between items-center text-[11px] border-t border-slate-800 pt-1.5 text-[10px] text-slate-500">
                <span>अंतिम डेटा अद्यतनीकरण क्रिया:</span>
                <span className="font-mono">2026-05-28</span>
              </p>
            </div>
          </div>

          {/* Legal disclaimers */}
          <div className="space-y-3 leading-relaxed font-sans">
            <h4 className="text-sm font-black text-white font-display">राजकीय प्रतिज्ञा / प्रतिवेदन सुसंगतता</h4>
            <p className="text-[11px] font-medium leading-relaxed font-sans">
              यह प्रशासनिक स्वायत्त और तुलना विश्लेषण पोर्टल है, जो संचित सांख्यिकीय निष्कर्ष तथा त्वरित शैक्षिक क्रीड़ा मार्गदर्शन प्रदान करने हेतु अधिकृत रूप से संरेखित किया गया है।
            </p>
            <div className="pt-2 text-[10px] font-black text-orange-400 flex items-center gap-1 uppercase select-none">
              <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
              <span>पहाड़ी ब्लॉक अकादमिक सुद्धढ़ता</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
