'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAnalysis } from '@/src/shared/api/mock/contract';
import { ContractAnalysis } from '@/src/shared/types/contract';
import { Button } from '@/src/shared/ui/button';
import { Loader2, FileText, AlertTriangle, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

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
  const [id, setId] = useState<string>('');
  const [locale, setLocale] = useState<string>('ko');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [highlightAreas, setHighlightAreas] = useState<HighlightArea[]>([]);
  const router = useRouter();
  const t = useTranslations('analysis');

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      setLocale(p.locale);
      getAnalysis(p.id, p.locale).then((data) => {
        setAnalysis(data);
      });
    });
  }, [params]);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return { text: t('severity.high'), color: 'red' as const };
      case 'medium':
        return { text: t('severity.medium'), color: 'yellow' as const };
      case 'low':
        return { text: t('severity.low'), color: 'green' as const };
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
        areas.push({ x: 5, y: 5, width: 90, height: 30, type: 'summary' });
        break;
      case 'issues':
        if (issueId === 'issue-001') {
          areas.push({ x: 5, y: 45, width: 90, height: 15, type: 'issue', id: issueId });
        } else if (issueId === 'issue-002') {
          areas.push({ x: 5, y: 60, width: 90, height: 12, type: 'issue', id: issueId });
        } else {
          areas.push({ x: 5, y: 75, width: 90, height: 20, type: 'issue', id: issueId });
        }
        break;
      case 'policy':
        areas.push({ x: 5, y: 50, width: 90, height: 20, type: 'policy' });
        break;
      case 'dates':
        areas.push({ x: 5, y: 25, width: 90, height: 10, type: 'date' });
        break;
    }
    
    setHighlightAreas(areas);
  };

  const hasIssues = analysis.issues.length > 0;
  const hasPolicyRelevance = analysis.policyRelevance.relevant;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">{t('analysisId')}: {id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 좌측: 문서 원본 */}
          <div className="glass-card rounded-xl p-6 sticky top-24 h-fit animate-fade-in-up animation-delay-200">
            <h2 className="text-xl font-semibold text-foreground mb-4">{t('originalContract')}</h2>
            <div className="relative border border-border rounded-lg overflow-hidden bg-muted/50">
              <div className="relative aspect-3/4 w-full">
                <Image
                  src="/sample.png"
                  alt="계약서 원본"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
                {/* 하이라이트 오버레이 */}
                {highlightAreas.map((area, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute border-2 rounded transition-all duration-300",
                      area.type === 'issue' && "border-red-500 bg-red-500/20",
                      area.type === 'policy' && "border-purple-500 bg-purple-500/20",
                      area.type === 'date' && "border-emerald-500 bg-emerald-500/20",
                      area.type === 'summary' && "border-blue-500 bg-blue-500/20"
                    )}
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
              <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-fade-in-up">
                <p className="text-sm text-primary">
                  {selectedCard === 'summary' && t('cardHelp.summary')}
                  {selectedCard === 'issues' && t('cardHelp.issues')}
                  {selectedCard === 'policy' && t('cardHelp.policy')}
                  {selectedCard === 'dates' && t('cardHelp.dates')}
                </p>
              </div>
            )}
          </div>

          {/* 우측: 분석 결과 카드 */}
          <div className="space-y-6 animate-fade-in-up animation-delay-400">
            {/* 계약서 요약 카드 */}
            <div
              onClick={() => handleCardClick('summary')}
              className={cn(
                "glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-card/80",
                selectedCard === 'summary' ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('summary.title')}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{analysis.summary}</p>
              <div className="text-sm text-primary font-medium flex items-center">
                {t('clickToView')}
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* 문제점 검토 카드 */}
            {hasIssues && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t('issues.title')}</h3>
                {analysis.issues.map((issue) => {
                  const badge = getSeverityBadge(issue.severity);
                  return (
                    <div
                      key={issue.id}
                      onClick={() => handleCardClick('issues', issue.id)}
                      className={cn(
                        "glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-card/80",
                        selectedCard === 'issues' && highlightAreas[0]?.id === issue.id
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-border hover:border-red-500/50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <span
                          className={cn(
                            "px-2.5 py-1 text-xs font-medium rounded-full border",
                            badge.color === 'red' && "bg-red-500/10 text-red-500 border-red-500/20",
                            badge.color === 'yellow' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                            badge.color === 'green' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          )}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{issue.title}</h4>
                      <p className="text-muted-foreground mb-2 text-sm">{issue.description}</p>
                      {issue.recommendation && (
                        <p className="text-muted-foreground/80 text-sm italic border-l-2 border-border pl-3 mt-3">
                          {issue.recommendation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 정책 연관성 카드 */}
            {hasPolicyRelevance && (
              <div
                onClick={() => handleCardClick('policy')}
                className={cn(
                  "glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-card/80",
                  selectedCard === 'policy' ? "border-purple-500 ring-1 ring-purple-500" : "border-border hover:border-purple-500/50"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('policy.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('policy.count', { count: analysis.policyRelevance.policies.length })}
                </p>
                <div className="text-sm text-purple-500 font-medium flex items-center">
                  {t('clickToView')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            )}

            {/* 중요 날짜 카드 */}
            <div
              onClick={() => handleCardClick('dates')}
              className={cn(
                "glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-card/80",
                selectedCard === 'dates' ? "border-emerald-500 ring-1 ring-emerald-500" : "border-border hover:border-emerald-500/50"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('dates.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('dates.description')}</p>
              <div className="text-sm text-emerald-500 font-medium flex items-center">
                {t('clickToView')}
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* 전체 상세보기 버튼 */}
            <div className="pt-4">
              <Button
                onClick={() => router.push(`/${locale}/analysis/${id}/detail`)}
                variant="primary"
                size="lg"
                className="w-full h-14 text-lg shadow-lg shadow-primary/20"
              >
                {t('viewFullDetails')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
