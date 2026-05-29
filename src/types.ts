/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SchoolInfo {
  id: string;
  name: string;
  type: 'PM_SHRI' | 'MGGS' | 'REGULAR';
  level: 'Primary' | 'Upper Primary' | 'Secondary' | 'Senior Secondary';
  studentsCount: number;
  teachersCount: number;
  hasSmartClass: boolean;
  hasComputerLab: boolean;
  location: string;
  imageUrl?: string;
  facilities: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  role: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

export interface FlagshipScheme {
  id: string;
  name: string;
  description: string;
  targetGroup: string;
  benefits: string;
  statusInPahari: string;
  achievements2025: string;
  iconName: string;
}

export interface BoardResult {
  year: number;
  class5PassPercent: number;
  class8PassPercent: number;
  class10PassPercent: number;
  class12PassPercent: number;
  boysPassPercent: number;
  girlsPassPercent: number;
  totalStudents: number;
}

export interface EnrollmentMetric {
  year: number;
  primaryBoys: number;
  primaryGirls: number;
  secondaryBoys: number;
  secondaryGirls: number;
  totalEnrollment: number;
}

export interface InnovationItem {
  id: string;
  title: string;
  description: string;
  launchedYear: string;
  impact: string;
  targetStudents: string;
}

export interface BestPracticeItem {
  id: string;
  title: string;
  description: string;
  keyStrategy: string;
  impactScale: string;
}

export interface StateOfficeLink {
  id: string;
  title: string;
  description: string;
  url: string;
  department: string;
}

export interface QuizQuestion {
  id: string;
  classLevel: '3-5' | '6-8' | '9-12';
  subject: 'Math' | 'RajasthanGK' | 'Language';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  category: string;
  date: string;
}

export interface AutoAnalysisMetric {
  id: string;
  title: string;
  description: string;
  yAxisLabel: string;
  dataPoints: Array<{
    label: string;
    value: number;
    compareValue?: number;
    subtext: string;
  }>;
}
