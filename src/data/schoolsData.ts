/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  SchoolInfo, 
  StaffMember, 
  FlagshipScheme, 
  BoardResult, 
  EnrollmentMetric,
  InnovationItem, 
  BestPracticeItem, 
  StateOfficeLink, 
  QuizQuestion, 
  GalleryItem 
} from '../types';

// Office Staff profiles for CBEO Pahari
export const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'श्री दिनेश कुमार शर्मा',
    designation: 'मुख्य ब्लॉक शिक्षा अधिकारी (CBEO)',
    qualification: 'M.A., M.Ed., NET',
    role: 'समग्र प्रशासनिक नियंत्रण, ब्लॉक प्रभारी, वित्तीय एवं सुपरवाइजरी नियंत्रण।',
    email: 'cbeo.pahari.edu@rajasthan.gov.in',
    phone: '+91 94142 XXXXX',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '2',
    name: 'श्री महेश चंद्र जाटव',
    designation: 'अतिरिक्त मुख्य ब्लॉक शिक्षा अधिकारी (ACBEO-I)',
    qualification: 'M.Sc., B.Ed.',
    role: 'प्रारम्भिक शिक्षा प्रभाग का पर्यवेक्षण, विभागीय जाँच एवं अकादमिक सुधार कार्य।',
    email: 'acbeo1.pahari@rajasthan.gov.in',
    phone: '+91 94143 XXXXX',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '3',
    name: 'श्रीमती सीमा यादव',
    designation: 'अतिरिक्त मुख्य ब्लॉक शिक्षा अधिकारी (ACBEO-II)',
    qualification: 'M.A., M.Ed.',
    role: 'माध्यमिक शिक्षा प्रभाग, व्यावसायिक शिक्षा, छात्रवृत्ति एवं गार्गी पुरस्कार प्रभारी।',
    email: 'acbeo2.pahari@rajasthan.gov.in',
    phone: '+91 94144 XXXXX',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '4',
    name: 'श्री राजेश कुमार गुप्ता',
    designation: 'ब्लॉक संदर्भ व्यक्ति (RP-समग्र शिक्षा)',
    qualification: 'M.A.(Hindi), B.Ed.',
    role: 'एमआईएस (MIS) पोर्टल, शाला दर्पण समन्वय एवं डेटा विश्लेषण प्रबंधन।',
    email: 'rp.samagra.pahari@rajasthan.gov.in',
    phone: '+91 94145 XXXXX',
  },
  {
    id: '5',
    name: 'श्री मोहम्मद अशरफ खान',
    designation: 'ब्लॉक संदर्भ व्यक्ति (RP-भौतिक ढांचा)',
    qualification: 'B.E. (Civil)',
    role: 'विद्यालय भवन निर्माण, जीर्णोद्धार, पेयजल एवं पीएम श्री प्रोजेक्ट्स सिविल मॉनिटरिंग।',
    email: 'rp.civil.pahari@rajasthan.gov.in',
    phone: '+91 94146 XXXXX',
  }
];

// Special Schools - PM SHRI and MGGS in Block Pahari
export const specialSchools: SchoolInfo[] = [
  {
    id: 'sch1',
    name: 'राउमावि पहाड़ी (PM SHRI)',
    type: 'PM_SHRI',
    level: 'Senior Secondary',
    studentsCount: 780,
    teachersCount: 24,
    hasSmartClass: true,
    hasComputerLab: true,
    location: 'मुख्य कस्बा, पहाड़ी',
    facilities: ['स्मार्ट कक्षा कक्ष', 'सुसज्जित भौतिकशास्त्र लैब', 'ICT लैब (20 कंप्यूटर्स)', 'खेल परिसर', 'ग्रीन स्कूल सोलर पावर प्लांट (5kW)'],
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'sch2',
    name: 'राउमावि कैथवाडा (PM SHRI)',
    type: 'PM_SHRI',
    level: 'Senior Secondary',
    studentsCount: 650,
    teachersCount: 19,
    hasSmartClass: true,
    hasComputerLab: true,
    location: 'कैथवाडा ब्लॉक सीमा',
    facilities: ['स्मार्ट टीवी क्लासरूम', 'गणित एवं विज्ञान पार्क', 'वर्षा जल संचयन प्रणाली', 'अत्याधुनिक खेल मैदान'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'sch3',
    name: 'महात्मा गाँधी रावि (अंग्रेजी माध्यम) पहाड़ी संख्या-1',
    type: 'MGGS',
    level: 'Secondary',
    studentsCount: 420,
    teachersCount: 15,
    hasSmartClass: true,
    hasComputerLab: true,
    location: 'वार्ड नंबर 5, पहाड़ी',
    facilities: ['100% अंग्रेजी माध्यम निर्देश', 'डिजिटल कम्प्यूटर लैब', 'सुसज्जित पुस्तकालय', 'विविध सह-शैक्षणिक प्रतियोगिताएं', 'बाल संसद कैबिनेट क्रियाशील'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'sch4',
    name: 'महात्मा गाँधी रावि (अंग्रेजी माध्यम) गोपालगढ़',
    type: 'MGGS',
    level: 'Upper Primary',
    studentsCount: 310,
    teachersCount: 11,
    hasSmartClass: false,
    hasComputerLab: true,
    location: 'नजदीक बस स्टैंड, गोपालगढ़',
    facilities: ['अंग्रेजी संभाषण क्लब (English Access)', 'गतिविधि आधारित शिक्षण (ABL) कक्ष', 'पेयजल वाटर कूलर सुविधा', 'सुरक्षित चारदीवारी'],
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'sch5',
    name: 'महात्मा गाँधी राउमावि पिदावली',
    type: 'MGGS',
    level: 'Senior Secondary',
    studentsCount: 540,
    teachersCount: 18,
    hasSmartClass: true,
    hasComputerLab: true,
    location: 'ग्राम पंचायत पिदावली',
    facilities: ['स्मार्ट इंटरेक्टिव बोर्ड', 'सिलाई एवं सिलाई कला व्यावहारिक कक्ष', 'नवाचारी विज्ञान किट प्रयोग', 'विशाल आउटडोर वॉलीबॉल कोर्ट'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500'
  }
];

// Block Education Statistics
export const blockStatistics = {
  jurisdiction: {
    totalPanchayats: 32,
    totalVillages: 118,
    totalAreaSqKm: 412,
    populationCens: '1.45 लाख (अनुमानित)'
  },
  elementary: {
    primarySchools: 48,
    upperPrimarySchools: 62,
    totalSchools: 110,
    boysEnrollment: 8450,
    girlsEnrollment: 8120,
    totalEnrollment: 16570,
    academicTrackRatio: '24:1',
    teachersCount: 680,
    midDayMealCoverage: '100% विद्यार्थी लाभान्वित',
    freeTextbooksDistributed2025: '35,420 सेट'
  },
  secondary: {
    secondarySchools: 24,
    seniorSecondarySchools: 38,
    totalSchools: 62,
    compositeSchools: 35,
    boysEnrollment: 7120,
    girlsEnrollment: 6340,
    totalEnrollment: 13460,
    teachersCount: 560,
    itLabsSetup: '52 विद्यालयों में क्रियाशील',
    scienceLabsSetup: '28 विद्यालयों में सुसज्जित भौतिक/रसायन/जीवविज्ञान प्रयोगशालाएं'
  },
  vocational: {
    schoolsWithVocational: 12,
    totalSectors: 5,
    totalStudents: 1420,
    sectorsList: [
      { name: 'Information Technology (IT/ITeS)', schools: 8, enrolled: 520, labs: 'सुसज्जित IT लैब क्रियाशील' },
      { name: 'Beauty & Wellness (ब्यूटी एवं वेलनेस)', schools: 4, enrolled: 260, labs: 'ब्यूटी लैब उपकरण युक्त' },
      { name: 'Agriculture (कृषि)', schools: 6, enrolled: 310, labs: 'प्रायोगिक फ़ील्ड' },
      { name: 'Healthcare (स्वास्थ्य सेवा)', schools: 3, enrolled: 180, labs: 'मेडीकल एड रूम सेटअप' },
      { name: 'Retail (रिटेल व्यापार)', schools: 2, enrolled: 150, labs: 'सिम्युलेटेड स्टोर रूम' }
    ],
    placementTieUps: 'स्थानीय उद्योग और NIOS व्यावसायिक प्रशिक्षण प्रमाणन समन्वय'
  }
};

// Rajasthan Government Flagship Education Schemes
export const flagshipSchemes: FlagshipScheme[] = [
  {
    id: 'sch_flag1',
    name: 'मुख्यमंत्री निःशुल्क यूनिफॉर्म वितरण योजना',
    description: 'सरकारी विद्यालयों के कक्षा 1 से 8 तक के सभी छात्र-छात्राओं को दो सेट निःशुल्क पोशाक कपड़ा तथा ₹200 प्रति विद्यार्थी सिलाई राशि बैंक खाते में दी जाती है।',
    targetGroup: 'कक्षा 1 से 8 तक के राजकीय छात्र-छात्राएं',
    benefits: '2 पोशाक सेट कपड़ा + ₹200 सीधे बैंक खाते में प्रत्यक्ष हस्तांतरण',
    statusInPahari: 'पहाड़ी ब्लॉक में विगत शैक्षणिक सत्र में 16,320 पात्र विद्यार्थियों को वितरण पूर्ण। सत्यापन दर 99.2%',
    achievements2025: 'सत्र 2024-25 में लक्ष्य का 100% हासिल किया गया, कुल ₹32.64 लाख सीधे खाते में हस्तांतरित।',
    iconName: 'Shirt'
  },
  {
    id: 'sch_flag2',
    name: 'मुख्यमंत्री बाल गोपाल योजना (Milk Powder Distribution)',
    description: 'कक्षा 1 से 8 के राजकीय स्कूलों व मदरसों के बच्चों को सप्ताह में सभी शिक्षण दिवसों पर गर्म व पौष्टिक गाय का दूध (मिल्क पाउडर से तैयार) उपलब्ध कराया जाता है।',
    targetGroup: 'कक्षा 1 से 8 तक के समस्त छात्र-छात्राएं',
    benefits: 'कक्षा 1-5 के लिए 150ml एवं कक्षा 6-8 के लिए 200ml गर्म सुगंधित पौष्टिक दूध दैनिक।',
    statusInPahari: 'ब्लॉक के सभी 110 प्राथमिक एवं उच्च प्राथमिक स्तर के विद्यालयों में दैनिक सुचारू वितरण व मासिक खाद्य सुरक्षा ऑडिट संपन्न।',
    achievements2025: 'पोषाहार गुणवत्ता रिपोर्ट में ब्लॉक पहाड़ी को जिले में उत्कृष्ट स्थान। 16 हजार से अधिक बच्चों को दैनिक पोषण सुरक्षा।',
    iconName: 'Milk'
  },
  {
    id: 'sch_flag3',
    name: 'गार्गी एवं इंदिरा प्रियदर्शिनी पुरस्कार योजना',
    description: 'माध्यमिक शिक्षा बोर्ड की 10वीं व 12वीं परीक्षा में 75% या अधिक अंक प्राप्त करने वाली बालिकाओं को क्रमशः ₹3000 व ₹5000 तथा बसंत पंचमी पर प्रमाण पत्र प्रदान किया जाता है। विभिन्न वर्गों में टॉप आने वाली छात्राओं को इंदिरा प्रियदर्शिनी के तहत ₹50,000 से ₹1,00,000 और स्कूटी दी जाती है।',
    targetGroup: 'कक्षा 10वीं एवं 12वीं की प्रतिभावान छात्राएं',
    benefits: 'नकद पुरस्कार राशि ₹3,000 से ₹1,00,000 तक + स्कूटी + प्रशस्ति प्रमाण पत्र',
    statusInPahari: 'वर्ष 2025 के दौरान पहाड़ी ब्लॉक की कुल 342 होनहार छात्राओं को ₹13.84 लाख की राशि वितरित।',
    achievements2025: 'ग्रामीण बालिकाओं के नामांकन में विगत 3 वर्षों में 11% की रिकॉर्ड वृद्धि दर्ज हुई है।',
    iconName: 'Award'
  },
  {
    id: 'sch_flag4',
    name: 'मुख्यमंत्री निःशुल्क साइकिल वितरण योजना',
    description: 'राजकीय विद्यालयों के कक्षा 9 में प्रवेश लेने वाली ग्रामीण क्षेत्र की समस्त बालिकाओं को सुगम आवागमन हेतु निःशुल्क साइकिल दी जाती है ताकि दूरी के कारण ड्रॉपआउट न हो।',
    targetGroup: 'राजकीय विद्यालयों में कक्षा 9 में अध्ययनरत समस्त ग्रामीण बालिकाएं',
    benefits: 'मजबूत और टिकाऊ साइकिल का निःशुल्क भौतिक वितरण।',
    statusInPahari: 'सत्र 2024-25 में कुल 1,280 बालिकाओं को विद्यालयों के स्तर पर भौतिक सत्यापन के पश्चात साइकिल सुपुर्द।',
    achievements2025: 'दूरदराज ढाणियों से माध्यमिक स्तर पर बालिकाओं की दैनिक उपस्थिति औसतन 92% तक पहुंची।',
    iconName: 'Bike'
  },
  {
    id: 'sch_flag5',
    name: 'शाला दर्पण इन्टीग्रेटेड ऑनलाइन पोर्टल',
    description: 'राजस्थान सरकार का ऑनलाइन वन-स्टॉप डिजिटल शिक्षा मंच। समस्त स्टाफ की हाजिरी, छात्र प्रगति पत्रक, ट्रांसफर, अवकाश, स्कॉलरशिप, परीक्षा परिणाम का रियल-टाइम रिकॉर्ड।',
    targetGroup: 'शिक्षक, विद्यार्थी, शिक्षा विभाग कार्यालय एवं अभिभावक',
    benefits: '100% पारदर्शी डिजिटल रिकॉर्ड, पेपरलेस वर्क और रियल-टाइम सांख्यिकी एनालिसिस।',
    statusInPahari: 'पहाड़ी ब्लॉक के सभी स्कूलों के शाल दर्पण क्रेडेंशियल्स 100% अद्यतन हैं। ब्लॉक स्तर से दैनिक ऑनलाइन हाजिरी अनुवीक्षण।',
    achievements2025: 'डेटा प्रविष्टि गति और विश्वसनीयता में पहाड़ी ब्लॉक को राज्य रैंकिंग में शीर्ष 15 में स्थान प्राप्त हुआ।',
    iconName: 'Laptop'
  }
];

// Historical Board Results for the Last 5 Years (Block-wise Comparative Data)
export const historicalBoardResults: BoardResult[] = [
  {
    year: 2021,
    class5PassPercent: 95.8,
    class8PassPercent: 91.2,
    class10PassPercent: 78.5,
    class12PassPercent: 82.4,
    boysPassPercent: 84.2,
    girlsPassPercent: 86.8,
    totalStudents: 3120
  },
  {
    year: 2022,
    class5PassPercent: 97.2,
    class8PassPercent: 92.4,
    class10PassPercent: 81.3,
    class12PassPercent: 84.9,
    boysPassPercent: 86.1,
    girlsPassPercent: 89.4,
    totalStudents: 3450
  },
  {
    year: 2023,
    class5PassPercent: 98.4,
    class8PassPercent: 94.1,
    class10PassPercent: 83.6,
    class12PassPercent: 87.1,
    boysPassPercent: 88.3,
    girlsPassPercent: 91.5,
    totalStudents: 3890
  },
  {
    year: 2024,
    class5PassPercent: 99.1,
    class8PassPercent: 96.3,
    class10PassPercent: 86.8,
    class12PassPercent: 90.2,
    boysPassPercent: 91.4,
    girlsPassPercent: 94.7,
    totalStudents: 4120
  },
  {
    year: 2025,
    class5PassPercent: 99.6,
    class8PassPercent: 97.4,
    class10PassPercent: 89.2,
    class12PassPercent: 92.6,
    boysPassPercent: 93.5,
    girlsPassPercent: 96.8,
    totalStudents: 4350
  }
];

// 5-Year Enrollment Metrics (Auto-Analysis Source File)
export const historicalEnrollment: EnrollmentMetric[] = [
  { year: 2021, primaryBoys: 6850, primaryGirls: 6240, secondaryBoys: 5120, secondaryGirls: 4430, totalEnrollment: 22640 },
  { year: 2022, primaryBoys: 7120, primaryGirls: 6620, secondaryBoys: 5410, secondaryGirls: 4890, totalEnrollment: 24040 },
  { year: 2023, primaryBoys: 7450, primaryGirls: 7080, secondaryBoys: 5890, secondaryGirls: 5310, totalEnrollment: 25730 },
  { year: 2024, primaryBoys: 7980, primaryGirls: 7650, secondaryBoys: 6420, secondaryGirls: 5910, totalEnrollment: 27960 },
  { year: 2025, primaryBoys: 8450, primaryGirls: 8120, secondaryBoys: 7120, secondaryGirls: 6340, totalEnrollment: 30030 }
];

// Best Practices in CBEO Pahari
export const bestPractices: BestPracticeItem[] = [
  {
    id: 'bp1',
    title: 'भामाशाह एवं जन-सहयोग संवर्धन (Community Philanthropy Support)',
    description: 'ग्रामीण समुदायों, भामाशाहों (दानदाताओं) एवं पूर्व छात्रों से समन्वय स्थापित कर विद्यालय विकास कोष (SDMC) हेतु रिकॉर्ड योगदान संचयन।',
    keyStrategy: 'वार्षिक दानदाता सम्मान समारोह का आयोजन, पारदर्शी ज्ञान संकल्प डिजिटल पोर्टल का संवर्धन एवं रसीद प्रणाली का सरलीकरण।',
    impactScale: 'पिछले दो वर्षों में कुल ₹24.5 लाख की जन-भागीदारी प्राप्त। इससे 18 जीर्ण विद्यालयों की चारदीवारी मरम्मत एवं शुद्ध पेयजल वॉटर कूलर्स की स्थापना की गई।'
  },
  {
    id: 'bp2',
    title: 'बालिका खेल सशक्तीकरण अभियान (Empower Girls through Sports)',
    description: 'ग्रामीण अंचल में बालिकाओं को कबड्डी, खो-खो, वॉलीबॉल एवं एथलेटिक्स जैसे खेलों हेतु व्यापक प्रशिक्षण व सामग्री प्रदान करना।',
    keyStrategy: 'पंचायत स्तर पर महिला शारीरिक शिक्षकों का रोटेशन आधारित कोचिंग कैम्प और ब्लॉक स्तरीय "शक्ति क्रीड़ा उत्सव"।',
    impactScale: 'ब्लॉक पहाड़ी की दो कन्या टीमों ने राज्य स्तरीय कबड्डी (U-14) में रजत पदक प्राप्त किया; ग्रामीण रूढ़वादिता में कमी।'
  },
  {
    id: 'bp3',
    title: 'सत्र पूर्व उपचारात्मक शिक्षण (Bridge Course & Remedial Classes)',
    description: 'सत्रारम्भ के प्रथम दो माह में कोविड-काल जनित और नियमित लर्निंग गैप संरेखण के लिए कमजोर विद्यार्थियों की विशेष उपचारात्मक कक्षाएँ।',
    keyStrategy: 'शाला दर्पण पर प्रविष्टि आधारित प्री-टेस्ट, कस्टमाइज्ड वर्कशीट का वितरण और हर शनिवार उपचारात्मक प्रगति आकलन।',
    impactScale: 'मूल्यांकन परीक्षण में प्राथमिक स्तर के बच्चों के बुनियादी पठन-लेखन कौशल में 34% की वृद्धिशील प्रगति।'
  }
];

// Innovations adopted in Pahari
export const innovations: InnovationItem[] = [
  {
    id: 'inno1',
    title: 'पहाड़ी सुपर-30 अकादमिक क्लब',
    description: 'अकादमिक रूप से अत्यंत मेधावी लेकिन आर्थिक रूप से अक्षम छात्र-छात्राओं को विशेष आवासीय कोचिंग सहायता तथा निशुल्क पाठ्य सामग्री का वितरण।',
    launchedYear: '2023',
    impact: 'सुपर-30 के 28 विद्यार्थियों ने राज्य स्तरीय वरीयता सूचियों एवं प्रतियोगी परीक्षा प्रवेशों (जैसे नवोदय/एकलव्य) में सफलता प्राप्त की।',
    targetStudents: 'कक्षा 10वीं और 12वीं के मेरिट वाले बच्चे'
  },
  {
    id: 'inno2',
    title: 'स्मार्ट स्कूल - हरा स्कूल पहल',
    description: 'विद्यालय भवनों को प्रकृति-हितैषी बनाने हेतु सोलर रूफटॉप प्रोजेक्ट्स तथा "ग्रीन चारदीवारी वृक्षारोपण" योजना का क्रियान्वयन।',
    launchedYear: '2024',
    impact: 'ब्लॉक के 14 सीनियर स्कूलों ने सोलर ऊर्जा पर पूर्ण आत्मनिर्भरता हासिल कर बिजली बिलों में 100% की बचत की। पर्यावरण संरक्षण का लाइव व्यावहारिक ज्ञान।',
    targetStudents: 'पर्यावरण चेतना अभियान हेतु समस्त विद्यालय छात्र'
  },
  {
    id: 'inno3',
    title: 'बाला पेंटिंग (Building as Learning Aid) कला उत्सव',
    description: 'विद्यालय के कमरों की दीवारों, खंभों और शौचालयों की बाहरी दीवारों को शिक्षण सहायक सामग्री के रूप में पेंट करना (अल्फाबेट रेल, सौरमंडल, नक्शे, इतिहास रेखा)।',
    launchedYear: '2022',
    impact: 'प्राथमिक विद्यालयों में औसत उपस्थिति दर में 14% की सुखद वृद्धि, खेल-खेल में सीखने की क्षमता संवर्धन।',
    targetStudents: 'प्राथमिक एवं उच्च प्राथमिक स्तर के नवीन नामांकित बच्चे'
  }
];

// State level official websites and web links
export const stateOfficeLinks: StateOfficeLink[] = [
  {
    id: 'link1',
    title: 'एकीकृत शाला दर्पण पोर्टल (Shala Darpan Portal)',
    description: 'राजस्थान स्कूल शिक्षा परिषद का मुख्य इंटीग्रेटेड शिक्षा प्रबंधन पोर्टल जहाँ समस्त राजकीय विद्यालाओं का लाइव डेटा उपलब्ध है।',
    url: 'https://rajshaladarpan.nic.in/',
    department: 'स्कूल शिक्षा विभाग, राजस्थान सरकार'
  },
  {
    id: 'link2',
    title: 'राजस्थान स्कूल शिक्षा परिषद् (RCSE)',
    description: 'समग्र शिक्षा अभियान (SMSA) के सुचारू संचालन एवं मॉनिटरिंग के लिए मुख्य राज्य स्तरीय परिषद्।',
    url: 'https://rcse.rajasthan.gov.in/',
    department: 'RCSE जयपुर'
  },
  {
    id: 'link3',
    title: 'माध्यमिक शिक्षा बोर्ड राजस्थान, अजमेर (BSER)',
    description: 'कक्षा 10वीं और 12वीं की मुख्य राज्य स्तरीय बोर्ड परीक्षाओं के संचालन, संबद्धता एवं परिणाम का सर्वोच्च प्राधिकारी।',
    url: 'https://rajeduboard.rajasthan.gov.in/',
    department: 'अजमेर बोर्ड'
  },
  {
    id: 'link4',
    title: 'प्रारम्भिक एवं माध्यमिक शिक्षा निदेशालय, बीकानेर',
    description: 'राजस्थान राज्य के समस्त प्रारम्भिक एवं माध्यमिक स्तर के शासकीय व अशासकीय विद्यालयों का प्रशासनिक मुख्यालय वेबसाइट।',
    url: 'https://education.rajasthan.gov.in/dir-education',
    department: 'बीकानेर निदेशालय'
  },
  {
    id: 'link5',
    title: 'राजस्थान स्टेट ओपन स्कूल, जयपुर (RSOS)',
    description: 'औपचारिक शिक्षा से वंचित रहे प्रौढ़ों, कामकाजी पुरुषों व महिलाओं के लिए सुगम ओपन लर्निंग शिक्षा प्रणाली।',
    url: 'https://rsosapp.rajasthan.gov.in/',
    department: 'RSOS जयपुर'
  }
];

// Interactive Quiz Questions for children
export const quizQuestions: QuizQuestion[] = [
  // Class 3-5
  {
    id: 'q1',
    classLevel: '3-5',
    subject: 'Math',
    question: 'यदि एक पैकेट में 12 पेंसिलें आती हैं, तो ऐसे ही 5 पैकेटों में कुल कितनी पेंसिलें होंगी?',
    options: ['48 पेंसिलें', '60 पेंसिलें', '120 पेंसिलें', '24 पेंसिलें'],
    correctAnswerIndex: 1,
    explanation: 'सरल गुणा नियम: 12 पेंसिल प्रति पैकेट × 5 पैकेट = 60 पेंसिलें।'
  },
  {
    id: 'q2',
    classLevel: '3-5',
    subject: 'Language',
    question: 'निम्नलिखित में से कौन सा शब्द "किताब" शब्द का बहुवचन (Plural) रूप है?',
    options: ['किताबें', 'किताबी', 'किताबों', 'कोताब'],
    correctAnswerIndex: 0,
    explanation: 'किताब एकवचन है और इसका स्त्रीलिंग बहुवचन रूप "किताबें" होता है।'
  },
  {
    id: 'q3',
    classLevel: '3-5',
    subject: 'RajasthanGK',
    question: 'राजस्थान का राजकीय पशु (State Animal - पालतू श्रेणी में) निम्नलिखित में से कौन सा है?',
    options: ['बाघ', 'चिंकारा', 'ऊँट', 'हाथी'],
    correctAnswerIndex: 2,
    explanation: 'राजस्थान का पालतू श्रेणी में राजकीय पशु "ऊँट" (Camel) है, तथा वन्य जीव श्रेणी में "चिंकारा" है।'
  },

  // Class 6-8
  {
    id: 'q4',
    classLevel: '6-8',
    subject: 'Math',
    question: 'एक त्रिभुज (Triangle) के तीनों आंतरिक कोणों का योगफल (Sum of internal angles) कितने डिग्री होता है?',
    options: ['90 डिग्री', '180 डिग्री', '360 डिग्री', '60 डिग्री'],
    correctAnswerIndex: 1,
    explanation: 'ज्यामितीय नियम के अनुसार, किसी भी त्रिभुज के तीनों अंदरूनी कोणों का योग हमेशा 180° होता है।'
  },
  {
    id: 'q5',
    classLevel: '6-8',
    subject: 'RajasthanGK',
    question: 'प्रसिद्ध "केवलादेव राष्ट्रीय उद्यान" (भरतपुर बर्ड सेंचुरी) राजस्थान के किस संभाग या क्षेत्र के नजदीक है, जो पहाड़ी ब्लॉक के समीप है?',
    options: ['भरतपुर संभाग', 'जयपुर संभाग', 'कोटा संभाग', 'बीकानेर संभाग'],
    correctAnswerIndex: 0,
    explanation: 'केवलादेव राष्ट्रीय पक्षी उद्यान भरतपुर जिले में स्थित है, जो पहाड़ी के पास पड़ता है (यह वर्तमान में भरतपुर संभाग के अंतर्गत है)।'
  },
  {
    id: 'q6',
    classLevel: '6-8',
    subject: 'Language',
    question: '"He writes a letter." का सही हिन्दी अनुवाद क्या होगा?',
    options: ['वह पत्र लिख चुका है।', 'वह पत्र लिख रहा है।', 'वह पत्र लिखता है।', 'उसने पत्र लिखा।'],
    correctAnswerIndex: 2,
    explanation: 'He writes (Present Simple - वह लिखता है) a letter (एक पत्र)। अतः अनुवाद "वह पत्र लिखता है।" होगा।'
  },

  // Class 9-12
  {
    id: 'q7',
    classLevel: '9-12',
    subject: 'Math',
    question: 'यदि sin(θ) = 4/5 है, तो cos(θ) का मान क्या होगा? (मान लें θ न्यून कोण है)',
    options: ['5/4', '3/5', '1/5', '3/4'],
    correctAnswerIndex: 1,
    explanation: 'त्रिकोणमितीय सूत्रानुसार cos²(θ) = 1 - sin²(θ). यहां cos(θ) = √(1 - 16/25) = √(9/25) = 3/5 होगा।'
  },
  {
    id: 'q8',
    classLevel: '9-12',
    subject: 'RajasthanGK',
    question: 'पहाड़ी और डीग क्षेत्र के पास बहने वाली "रूपारेल नदी" के संरक्षण एवं बाढ़ नियंत्रण के लिए महाराजा सूरजमल ने किस झील का निर्माण कराया था?',
    options: ['सुजान गंगा नहर / मोती झील', 'आनासागर झील', 'फतेहसागर झील', 'जयसमंद झील'],
    correctAnswerIndex: 0,
    explanation: 'महाराजा सूरजमल जी ने रूपारेल और बाणगंगा के पानी का सदुपयोग करने एवं भरतपुर दुर्ग सुरक्षा हेतु मोती झील व सुजान गंगा का निर्माण कराया था।'
  },
  {
    id: 'q9',
    classLevel: '9-12',
    subject: 'Language',
    question: '"अनल" और "अनिल" शब्द युग्म का सही क्रमानुसार अर्थ क्या है?',
    options: ['हवा और पानी', 'अग्नि और वायु', 'वायु और अग्नि', 'पानी और बादल'],
    correctAnswerIndex: 1,
    explanation: '"अनल" का अर्थ "अग्नि" व "अनिल" का अर्थ "वायु" या "हवा" होता है, अतः सटीक विकल्प "अग्नि और वायु" है।'
  }
];

// Photo & Video Gallery assets
export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'PM SHRI रावि पहाड़ी में स्मार्ट क्लासरूम का वर्चुअल उद्घाटन',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
    category: 'PM SHRI विद्यालय',
    date: '2025-01-15'
  },
  {
    id: 'g2',
    title: 'महात्मा गांधी स्कूल पहाड़ी संख्या-1 में बाल संसद चुनाव',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    category: 'महात्मा गाँधी विद्यालय',
    date: '2024-08-20'
  },
  {
    id: 'g3',
    title: 'मुख्यमंत्री बाल गोपाल योजनान्तर्गत दुग्ध वितरण एवं चेकिंग उत्सव',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600',
    category: 'फ्लैगशिप योजनाएं',
    date: '2025-03-10'
  },
  {
    id: 'g4',
    title: 'माध्यमिक विद्यालय स्तर पर व्यावसायिक आईटी ट्रेनिंग प्रैक्टिकल परीक्षा',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600',
    category: 'व्यावसायिक शिक्षा',
    date: '2024-11-05'
  },
  {
    id: 'g5',
    title: 'ब्लॉक स्तरीय वार्षिक सांस्कृतिक प्रतिभा खोज प्रतियोगिता पुरस्कार वितरण',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    category: 'वार्षिक रिपोर्ट',
    date: '2025-02-18'
  },
  {
    id: 'g6',
    title: 'नवाचार: "बाला पेंटिंग" द्वारा सुसज्जित प्राथमिक विद्यालय का बाहरी दृश्य',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=600',
    category: 'नवाचार',
    date: '2024-07-12'
  }
];
