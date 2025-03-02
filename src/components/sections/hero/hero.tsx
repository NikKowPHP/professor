import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = async () => {

  const massiveTransformativePurpose = () => {
    return "Massive Transformative Purpose: ".split(' ').map((word, index) => (
      <span key={index}>
        <strong>{word[0]}</strong>
        {word.slice(1)}
        {' '}
      </span>
    ))
  }


  return (
    <section
      className=" px-5 sm:px-0 pb-[20px] sm:py-[40px] "
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[150px] gap-y-[40px] sm:gap-y-0 '>

        <div className="w-full ">
          <Image
            src="/images/mf.webp"
            alt="Michael Friebe"
            width={1500}
            height={1000}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Optimize heading for LCP */}
        <div className="flex flex-col  gap-[20px]">
          <div className=" flex flex-col items-start justify-start gap-[40px]">
            <h1
              className=" text-[36px] sm:text-[36px] lg:text-[36px] leading-[1.1] font-bold italic "
              itemProp="headline"
            >
              Prof. Michael Friebe, PhD
            </h1>
            <h2
              className="flex flex-col items-start justify-start text-[36px] max-w-[400px] sm:text-[36px] lg:text-[36px] leading-[1.1] font-normal "
              itemProp="headline"
            >
              <span>HealthTEC: </span> <span>
                Creating Innovations <br /> for Enterprises and New Ventures +
              </span>
            </h2>
            <h3 className="flex flex-col text-[16px]">
              <span>{massiveTransformativePurpose()}</span>
              <span className="font-bold text-[24px] ">Health Democratise Enabler</span>
            </h3>
            <p className="text-[16px] max-w-[400px]">
              Prof. Michael Friebe has extensive experience in medical technology,
              with a focus on innovation, entrepreneurship, and image-guided
              therapies. He has a strong background as a founder, innovator, CEO,
              and investor in various MedTech ventures.
            </p>
          </div>
          {/* cta */}
          <div>
            <Link href="/about" className="flex items-center gap-[10px] text-[#189E70] text-[16px]">My Investments <ArrowUpRight className="w-6 h-6" /></Link>
          </div>
        </div>

      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  )
}
