'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, AlertTriangle, FileCheck, ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

interface AnalysisCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: 'green' | 'yellow' | 'red' | 'blue';
}

export function AnalysisCard({ title, description, href, icon, badge, badgeColor = 'blue' }: AnalysisCardProps) {
  const t = useTranslations('common');

  const badgeStyles = {
    green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    yellow: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    red: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  return (
    <Link href={href} className="block h-full group">
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:bg-primary/10 transition-colors">
              {icon || <FileCheck className="w-6 h-6" />}
            </div>
            {badge && (
              <span className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-full border",
                badgeStyles[badgeColor]
              )}>
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
            {description}
          </p>

          <div className="flex items-center text-primary font-medium text-sm mt-auto">
            {t('viewDetails')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
