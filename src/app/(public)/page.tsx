import {
  HeroSection,
  JourneySection,
  CurriculumSection,
  FacilitiesSection,
  CareerPathsSection,
  AdmissionCTASection,
  FAQPreviewSection,
  WhySection,
  AchievementsSection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <JourneySection />
      <CurriculumSection />
      <AchievementsSection />
      <FacilitiesSection />
      <CareerPathsSection />
      <AdmissionCTASection />
      <FAQPreviewSection />
    </>
  );
}
