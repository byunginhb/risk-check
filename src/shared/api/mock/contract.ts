import { ContractAnalysis, UploadResponse } from '../../types/contract';

// 목업 데이터
const mockAnalysisData: ContractAnalysis = {
  id: 'analysis-001',
  summary: '이 계약서는 서울시 강남구에 위치한 오피스텔 전세 계약서입니다. 계약 기간은 2년이며, 보증금은 3억원입니다. 계약서에는 기본적인 조항들이 포함되어 있으며, 일부 주의가 필요한 사항들이 발견되었습니다.',
  issues: [
    {
      id: 'issue-001',
      severity: 'high',
      title: '보증금 반환 조건 미명시',
      description: '계약 종료 시 보증금 반환 조건이 구체적으로 명시되어 있지 않습니다.',
      recommendation: '보증금 반환 조건 및 절차를 명확히 명시하는 것이 좋습니다.',
    },
    {
      id: 'issue-002',
      severity: 'medium',
      title: '수리비용 부담 조항 불명확',
      description: '임대 기간 중 발생하는 수리비용의 부담 주체가 불명확합니다.',
      recommendation: '일상적인 수선과 구조적 수선의 구분 및 비용 부담을 명확히 하세요.',
    },
    {
      id: 'issue-003',
      severity: 'low',
      title: '계약 해지 통지 기간',
      description: '계약 해지 시 사전 통지 기간이 명시되어 있지 않습니다.',
      recommendation: '최소 30일 전 통지 조항을 추가하는 것을 권장합니다.',
    },
  ],
  policyRelevance: {
    relevant: true,
    policies: [
      {
        title: '전세사기 피해 예방 정책',
        description: '정부는 전세사기 피해를 예방하기 위해 전세보증금 반환보증제를 강화하고 있습니다.',
        impact: '본 계약서는 전세보증금 반환보증제 적용 대상이 될 수 있습니다. 보증금 반환 조건을 명확히 하는 것이 중요합니다.',
      },
      {
        title: '임대차 3법 개정안',
        description: '임대차 보호법 개정으로 전세 계약 시 임대인의 권리가 강화되었습니다.',
        impact: '계약 기간 중 임대인의 계약 해지 권한이 제한될 수 있으므로, 계약서에 명시된 해지 사유를 확인하세요.',
      },
    ],
  },
  importantDates: {
    contractStartDate: '2024-01-15',
    contractEndDate: '2026-01-14',
    expiryDate: '2026-01-14',
    renewalDate: '2025-12-15',
    movingDate: '2026-01-10',
    noticePeriod: 30,
  },
  contractType: '전세',
  propertyAddress: '서울특별시 강남구 테헤란로 123',
  contractAmount: 300000000,
  depositAmount: 300000000,
};

// API 시뮬레이션 함수들
export async function uploadContract(file: File): Promise<UploadResponse> {
  // 목업: 파일 업로드 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        analysisId: mockAnalysisData.id,
      });
    }, 2000); // 2초 지연 시뮬레이션
  });
}

export async function getAnalysis(analysisId: string): Promise<ContractAnalysis | null> {
  // 목업: 분석 결과 조회 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      if (analysisId === mockAnalysisData.id) {
        resolve(mockAnalysisData);
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

export async function getAllAnalyses(): Promise<ContractAnalysis[]> {
  // 목업: 모든 분석 결과 조회
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([mockAnalysisData]);
    }, 500);
  });
}

