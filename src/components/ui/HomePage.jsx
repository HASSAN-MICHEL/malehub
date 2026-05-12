import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { IncubatorCtaSection } from '../components/sections/IncubatorCtaSection'
import { InvestorCtaSection } from '../components/sections/InvestorCtaSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { JobsWeekSection } from '../components/sections/JobsWeekSection'
import { WhyChooseSection } from '../components/sections/WhyChooseSection'
import { FinalCtaSection } from '../components/sections/FinalCtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <IncubatorCtaSection />
      
      <ServicesSection />
      <JobsWeekSection />
      <WhyChooseSection />
      
    </>
  )
}
