import { Suspense, memo } from 'react';
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { type Locale } from '@/i18n'
import { CaseStudy } from '@/domain/models/case-study.model'
import { CaseStudiesLoader } from '@/components/sections/case-studies/case-studies-loader'
import { getCaseStudyService } from '@/lib/services/case-study.service';

interface CaseStudiesProps {
  locale: Locale
}


export async function CaseStudies({ locale }: CaseStudiesProps) {
  const caseStudyService = await getCaseStudyService()
  const caseStudies = await caseStudyService.getCaseStudies(locale)
  return (
    <section id="work" className="relative overflow-hidden bg-white   py-[100px]">
      <h1
        className="text-[40px] sm:text-[56px] lg:text-[48px] leading-[1.1] font-medium tracking-[-0.02em] "
        itemProp="headline"
      >
        The latest news from me and the insights
       
      </h1>
     
      <Suspense fallback={<CaseStudiesLoader />}>
        <CaseStudyList caseStudies={caseStudies} locale={locale} />
      </Suspense>

    </section>
  )
}


const CaseStudyList = memo(function CaseStudyList({ 
  caseStudies,
  locale
}: { 
  caseStudies: CaseStudy[] 
  locale: Locale
}) {
  return (
    <div className="relative mx-auto  flex flex-col gap-16 max-w-5xl">
      {caseStudies.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} locale={locale} />
      ))}
    </div>
  );
});



