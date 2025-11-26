import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/src/shared/ui/button';
import { HomeHero } from '@/src/widgets/home-hero/HomeHero';
import { AIBackground } from '@/src/shared/ui/background/AIBackground';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen text-foreground overflow-hidden bg-background">
      {/* Hero Section */}
      <HomeHero>
        <AIBackground />
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
          {/* Subtle Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-background via-background/95 to-background z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left animate-fade-in-up">
                <div className="inline-block mb-6">
                  <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium tracking-wide">
                    {t('tagline')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground">
                  {t('title')}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t('subtitle')}
                </p>
                <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
                  {t('description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <Link href={`/${locale}/upload`}>
                    <Button
                      size="lg"
                      className="text-lg h-14 px-8 rounded-lg bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {t('getStarted')}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Hero Image - Clean & Professional */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                <div className="relative w-full aspect-square max-w-[600px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/assets/images/hero-main.png" 
                    alt="AI Contract Analysis" 
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards - Professional & Clean */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="glass-card rounded-xl p-8 text-center hover:bg-card/50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">
                    1,234+
                  </div>
                  <div className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
                    {t('stats.analyzed')}
                  </div>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="glass-card rounded-xl p-8 text-center hover:bg-card/50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">
                    892
                  </div>
                  <div className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
                    {t('stats.issues')}
                  </div>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="glass-card rounded-xl p-8 text-center hover:bg-card/50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">
                    ₩2.1B+
                  </div>
                  <div className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
                    {t('stats.saved')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                {t('features.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                {t('features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group glass-card rounded-xl p-8 hover:bg-card/80 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex flex-col h-full">
                  <div className="mb-6 relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                     <Image 
                      src="/assets/images/feature-analysis.png" 
                      alt="Contract Analysis" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t('features.contractAnalysis.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('features.contractAnalysis.description')}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group glass-card rounded-xl p-8 hover:bg-card/80 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex flex-col h-full">
                  <div className="mb-6 relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                     <Image 
                      src="/assets/images/feature-issue.png" 
                      alt="Issue Detection" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t('features.issueDetection.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('features.issueDetection.description')}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group glass-card rounded-xl p-8 hover:bg-card/80 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex flex-col h-full">
                  <div className="mb-6 relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                     <Image 
                      src="/assets/images/feature-policy.png" 
                      alt="Policy Check" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t('features.policyCheck.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('features.policyCheck.description')}
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group glass-card rounded-xl p-8 hover:bg-card/80 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col h-full">
                  <div className="mb-6 relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                     <Image 
                      src="/assets/images/feature-date.png" 
                      alt="Date Tracking" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t('features.dateTracking.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('features.dateTracking.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 border-t border-border/30 relative bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground/80">
                {t('trustedBy')}
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('trustDescription')}
              </p>
            </div>
          </div>
        </section>
      </HomeHero>
    </div>
  );
}
