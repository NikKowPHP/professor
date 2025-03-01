import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = async () => {
  return (
    <section
      className="flex flex-col sm:flex-row justify-between  pt-[180px]  border border-red-500"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="w-full">
        <Image
          src="/images/mf.webp"
          alt="Michael Friebe"
          width={150}
          height={51}
          className="h-[36px] w-[95px]"
          priority
        />
      </div>

      {/* Optimize heading for LCP */}
      <div className="flex flex-col items-center">
        <div>
          <h1
            className="font-normal text-[64px] sm:text-[72px] lg:text-[64px] leading-[1.1] font-medium tracking-[-0.02em] mb-2 text-center max-w-[1200px] mx-auto"
            itemProp="headline"
          >
            Prof. Michael Friebe, PhD
          </h1>
          <h2
            className="font-normal text-[64px] sm:text-[72px] lg:text-[64px] leading-[1.1] font-medium tracking-[-0.02em] mb-2 text-center max-w-[1200px] mx-auto"
            itemProp="headline"
          >
            HealthTEC: Creating Innovations for Enterprises and New Ventures +
          </h2>
          <h3>
            <span>Massive Transformative Purpose: </span>
            <span>Health Democratise Enabler</span>
          </h3>
          <p>
            Prof. Michael Friebe has extensive experience in medical technology,
            with a focus on innovation, entrepreneurship, and image-guided
            therapies. He has a strong background as a founder, innovator, CEO,
            and investor in various MedTech ventures.
          </p>
        </div>
        {/* cta */}
        <div>
          <Link href="/about">My Investments</Link>
        </div>
      </div>

      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  )
}
