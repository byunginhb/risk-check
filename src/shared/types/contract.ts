export interface Issue {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendation?: string;
}

export interface PolicyRelevance {
  relevant: boolean;
  policies: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
}

export interface ImportantDates {
  expiryDate?: string;
  renewalDate?: string;
  movingDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  noticePeriod?: number; // 일 단위
}

export interface ContractAnalysis {
  id: string;
  summary: string;
  issues: Issue[];
  policyRelevance: PolicyRelevance;
  importantDates: ImportantDates;
  contractType?: string;
  propertyAddress?: string;
  contractAmount?: number;
  depositAmount?: number;
  monthlyRent?: number;
  additionalInfo?: Record<string, any>;
}

export interface UploadResponse {
  success: boolean;
  analysisId?: string;
  error?: string;
}

