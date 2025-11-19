'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAnalysis } from '@/src/shared/api/mock/contract';
import { ContractAnalysis } from '@/src/shared/types/contract';
import { Button } from '@/src/shared/ui/button';

interface HighlightArea {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'summary' | 'issue' | 'policy' | 'date';
  id?: string;
}

export default function AnalysisPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const [locale, setLocale] = useState<string>('ko');
  const [id, setId] = useState<string>('');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [highlightAreas, setHighlightAreas] = useState<HighlightArea[]>([]);
  const router = useRouter();
  const t = useTranslations('analysis');

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      setId(p.id);
      getAnalysis(p.id).then((data) => {
        setAnalysis(data);
      });
    });
  }, [params]);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return { text: '높음', color: 'red' as const };
      case 'medium':
        return { text: '보통', color: 'yellow' as const };
      case 'low':
        return { text: '낮음', color: 'green' as const };
      default:
        return { text: '', color: 'blue' as const };
    }
  };

  const handleCardClick = (cardType: string, issueId?: string) => {
    setSelectedCard(cardType);
    
    // 하이라이트 영역 설정 (목업 데이터 - 실제로는 API에서 받아올 것)
    const areas: HighlightArea[] = [];
    
    switch (cardType) {
      case 'summary':
        areas.push({ x: 10, y: 10, width: 80, height: 30, type: 'summary' });
        break;
      case 'issues':
        if (issueId === 'issue-001') {
          areas.push({ x: 15, y: 45, width: 70, height: 15, type: 'issue', id: issueId });
        } else if (issueId === 'issue-002') {
          areas.push({ x: 15, y: 60, width: 70, height: 15, type: 'issue', id: issueId });
        } else {
          areas.push({ x: 15, y: 75, width: 70, height: 15, type: 'issue', id: issueId });
        }
        break;
      case 'policy':
        areas.push({ x: 10, y: 50, width: 80, height: 20, type: 'policy' });
        break;
      case 'dates':
        areas.push({ x: 20, y: 25, width: 60, height: 25, type: 'date' });
        break;
    }
    
    setHighlightAreas(areas);
  };

  const hasIssues = analysis.issues.length > 0;
  const hasPolicyRelevance = analysis.policyRelevance.relevant;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">분석 ID: {id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 좌측: 문서 원본 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">계약서 원본</h2>
            <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/sample.png"
                  alt="계약서 원본"
                  fill
                  className="object-contain"
                  priority
                />
                {/* 하이라이트 오버레이 */}
                {highlightAreas.map((area, index) => (
                  <div
                    key={index}
                    className={`absolute border-2 rounded ${
                      area.type === 'issue'
                        ? 'border-red-500 bg-red-500 bg-opacity-20'
                        : area.type === 'policy'
                        ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                        : area.type === 'date'
                        ? 'border-green-500 bg-green-500 bg-opacity-20'
                        : 'border-blue-500 bg-blue-500 bg-opacity-20'
                    }`}
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      width: `${area.width}%`,
                      height: `${area.height}%`,
                    }}
                  />
                ))}
              </div>
            </div>
            {selectedCard && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {selectedCard === 'summary' && '계약서 요약 정보가 표시된 영역입니다.'}
                  {selectedCard === 'issues' && '발견된 문제점이 표시된 영역입니다.'}
                  {selectedCard === 'policy' && '정책 연관 정보가 표시된 영역입니다.'}
                  {selectedCard === 'dates' && '중요 날짜 정보가 표시된 영역입니다.'}
                </p>
              </div>
            )}
          </div>

          {/* 우측: 분석 결과 카드 */}
          <div className="space-y-6">
            {/* 계약서 요약 카드 */}
            <div
              onClick={() => handleCardClick('summary')}
              className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                selectedCard === 'summary'
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">📄</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('summary.title')}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{analysis.summary}</p>
              <div className="text-sm text-blue-600 font-medium">카드를 클릭하여 문서에서 위치 확인</div>
            </div>

            {/* 문제점 검토 카드 */}
            {hasIssues && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{t('issues.title')}</h3>
                {analysis.issues.map((issue) => {
                  const badge = getSeverityBadge(issue.severity);
                  return (
                    <div
                      key={issue.id}
                      onClick={() => handleCardClick('issues', issue.id)}
                      className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                        selectedCard === 'issues' && highlightAreas[0]?.id === issue.id
                          ? 'border-red-500 shadow-lg'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">⚠️</div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded ${
                            badge.color === 'red'
                              ? 'bg-red-100 text-red-800'
                              : badge.color === 'yellow'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h4>
                      <p className="text-gray-600 mb-2 text-sm">{issue.description}</p>
                      {issue.recommendation && (
                        <p className="text-gray-500 text-sm italic">{issue.recommendation}</p>
                      )}
                      <div className="mt-3 text-sm text-red-600 font-medium">카드를 클릭하여 문서에서 위치 확인</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 정책 연관성 카드 */}
            {hasPolicyRelevance && (
              <div
                onClick={() => handleCardClick('policy')}
                className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                  selectedCard === 'policy'
                    ? 'border-purple-500 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">🏛️</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('policy.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {analysis.policyRelevance.policies.length}개의 관련 정책이 확인되었습니다.
                </p>
                <div className="text-sm text-purple-600 font-medium">카드를 클릭하여 문서에서 위치 확인</div>
              </div>
            )}

            {/* 중요 날짜 카드 */}
            <div
              onClick={() => handleCardClick('dates')}
              className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                selectedCard === 'dates'
                  ? 'border-green-500 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">📅</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('dates.title')}</h3>
              <p className="text-gray-600 mb-4">만기일, 재계약일 등 중요 날짜를 확인하세요.</p>
              <div className="text-sm text-green-600 font-medium">카드를 클릭하여 문서에서 위치 확인</div>
            </div>

            {/* 전체 상세보기 버튼 */}
            <div className="pt-4">
              <Button
                onClick={() => router.push(`/${locale}/analysis/${id}/detail`)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                전체 상세보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
