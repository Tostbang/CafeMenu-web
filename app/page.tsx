import { SiteNav } from "@/components/landing/site-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeaturesSection } from "@/components/landing/features-section"
import { QrShowcase } from "@/components/landing/qr-showcase"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection, SiteFooter } from "@/components/landing/cta-footer"

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <SiteNav />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <QrShowcase />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}

