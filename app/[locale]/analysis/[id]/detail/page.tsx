import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAnalysis } from '@/src/shared/api/mock/contract';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations('detail');
  const analysisT = await getTranslations('analysis');
  const analysis = await getAnalysis(id);

  if (!analysis) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href={`/${locale}/analysis/${id}`}>
          <Button variant="outline" size="sm" className="mb-4">
            ← 뒤로가기
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
      </div>

      <div className="space-y-8">
        {/* 계약서 요약 */}
        <section id="summary" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">📄</span>
            {analysisT('summary.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          
          {analysis.propertyAddress && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>주소:</strong> {analysis.propertyAddress}
              </p>
            </div>
          )}
        </section>

        {/* 문제점 검토 */}
        {analysis.issues.length > 0 && (
          <section id="issues" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">⚠️</span>
              {analysisT('issues.title')}
            </h2>
            <div className="space-y-4">
              {analysis.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded">
                      {issue.severity === 'high' ? '높음' : issue.severity === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{issue.description}</p>
                  {issue.recommendation && (
                    <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                      <p className="text-sm font-medium">권장사항:</p>
                      <p className="text-sm">{issue.recommendation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 정책 연관성 */}
        {analysis.policyRelevance.relevant && (
          <section id="policy" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🏛️</span>
              {analysisT('policy.title')}
            </h2>
            <div className="space-y-4">
              {analysis.policyRelevance.policies.map((policy, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-lg text-blue-900 mb-2">{policy.title}</h3>
                  <p className="text-sm text-blue-800 mb-2">{policy.description}</p>
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <p className="text-sm font-medium text-blue-900">영향:</p>
                    <p className="text-sm text-blue-800">{policy.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 중요 날짜 */}
        <section id="dates" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">📅</span>
            {analysisT('dates.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.importantDates.contractStartDate && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">계약 시작일</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(analysis.importantDates.contractStartDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.expiryDate && (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600 mb-1">{analysisT('dates.expiry')}</p>
                <p className="text-lg font-semibold text-red-900">
                  {formatDate(analysis.importantDates.expiryDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.renewalDate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">{analysisT('dates.renewal')}</p>
                <p className="text-lg font-semibold text-blue-900">
                  {formatDate(analysis.importantDates.renewalDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.movingDate && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">{analysisT('dates.moving')}</p>
                <p className="text-lg font-semibold text-green-900">
                  {formatDate(analysis.importantDates.movingDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.noticePeriod && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600 mb-1">사전 통지 기간</p>
                <p className="text-lg font-semibold text-yellow-900">
                  {analysis.importantDates.noticePeriod}일
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

