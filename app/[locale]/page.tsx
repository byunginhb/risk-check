import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { HomeHero } from '@/src/widgets/home-hero/HomeHero';
import { FileText, AlertTriangle, ShieldCheck, Calendar } from 'lucide-react';
import { AIBackground } from '@/src/shared/ui/background/AIBackground';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero Section with Animation */}
      <HomeHero>
        <AIBackground />
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-background via-transparent to-background z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="inline-block mb-6 animate-bounce-slow">
                <span className="px-6 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm">
                  {t('tagline')}
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-medium max-w-4xl mx-auto">
                {t('subtitle')}
              </p>
              <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={`/${locale}/upload`}>
                  <Button
                    size="lg"
                    variant="primary"
                    className="text-lg h-14 px-8 shadow-lg shadow-primary/20"
                  >
                    {t('getStarted')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
                <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                    1,234+
                  </div>
                  <div className="text-muted-foreground font-medium text-lg">
                    {t('stats.analyzed')}
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
                <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold bg-linear-to-r from-red-500 to-rose-600 bg-clip-text text-transparent mb-3">
                    892
                  </div>
                  <div className="text-muted-foreground font-medium text-lg">
                    {t('stats.issues')}
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out">
                <div className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold bg-linear-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-3">
                    ₩2.1B+
                  </div>
                  <div className="text-muted-foreground font-medium text-lg">
                    {t('stats.saved')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-secondary/30 -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('features.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
                <div className="group h-full glass-card bg-card/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {t('features.contractAnalysis.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t('features.contractAnalysis.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
                <div className="group h-full glass-card bg-card/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {t('features.issueDetection.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t('features.issueDetection.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out">
                <div className="group h-full glass-card bg-card/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck className="w-7 h-7 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {t('features.policyCheck.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t('features.policyCheck.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400 ease-out">
                <div className="group h-full glass-card bg-card/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {t('features.dateTracking.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t('features.dateTracking.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 border-t border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t('trustedBy')}
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('trustDescription')}
              </p>
            </div>
          </div>
        </section>
      </HomeHero>
    </div>
  );
}
