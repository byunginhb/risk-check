import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAnalysis } from '@/src/shared/api/mock/contract';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { FileText, AlertTriangle, ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

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
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'low':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 animate-fade-in-up">
        <Link href={`/${locale}/analysis/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
      </div>

      <div className="space-y-8 animate-fade-in-up animation-delay-200">
        {/* 계약서 요약 */}
        <section id="summary" className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <FileText className="w-6 h-6" />
            </div>
            {analysisT('summary.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{analysis.summary}</p>
          
          {analysis.propertyAddress && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground mr-2">주소:</strong> {analysis.propertyAddress}
              </p>
            </div>
          )}
        </section>

        {/* 문제점 검토 */}
        {analysis.issues.length > 0 && (
          <section id="issues" className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              {analysisT('issues.title')}
            </h2>
            <div className="space-y-4">
              {analysis.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={cn(
                    "p-6 rounded-xl border transition-all duration-300 hover:bg-card/50",
                    getSeverityColor(issue.severity)
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-current opacity-80">
                      {issue.severity === 'high' ? '높음' : issue.severity === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-sm mb-4 opacity-90">{issue.description}</p>
                  {issue.recommendation && (
                    <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                      <p className="text-sm font-medium mb-1 opacity-80">권장사항:</p>
                      <p className="text-sm opacity-90">{issue.recommendation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 정책 연관성 */}
        {analysis.policyRelevance.relevant && (
          <section id="policy" className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              {analysisT('policy.title')}
            </h2>
            <div className="space-y-4">
              {analysis.policyRelevance.policies.map((policy, index) => (
                <div key={index} className="p-6 bg-purple-500/5 rounded-xl border border-purple-500/10 hover:bg-purple-500/10 transition-colors">
                  <h3 className="font-semibold text-lg text-purple-400 mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{policy.description}</p>
                  <div className="mt-2 pt-4 border-t border-purple-500/10">
                    <p className="text-sm font-medium text-purple-400 mb-1">영향:</p>
                    <p className="text-sm text-muted-foreground">{policy.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 중요 날짜 */}
        <section id="dates" className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Calendar className="w-6 h-6" />
            </div>
            {analysisT('dates.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.importantDates.contractStartDate && (
              <div className="p-6 bg-secondary/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-2">계약 시작일</p>
                <p className="text-xl font-semibold text-foreground">
                  {formatDate(analysis.importantDates.contractStartDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.expiryDate && (
              <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10">
                <p className="text-sm text-red-400 mb-2">{analysisT('dates.expiry')}</p>
                <p className="text-xl font-semibold text-red-500">
                  {formatDate(analysis.importantDates.expiryDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.renewalDate && (
              <div className="p-6 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <p className="text-sm text-blue-400 mb-2">{analysisT('dates.renewal')}</p>
                <p className="text-xl font-semibold text-blue-500">
                  {formatDate(analysis.importantDates.renewalDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.movingDate && (
              <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <p className="text-sm text-emerald-400 mb-2">{analysisT('dates.moving')}</p>
                <p className="text-xl font-semibold text-emerald-500">
                  {formatDate(analysis.importantDates.movingDate)}
                </p>
              </div>
            )}
            {analysis.importantDates.noticePeriod && (
              <div className="p-6 bg-amber-500/5 rounded-xl border border-amber-500/10">
                <p className="text-sm text-amber-400 mb-2">사전 통지 기간</p>
                <p className="text-xl font-semibold text-amber-500">
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
