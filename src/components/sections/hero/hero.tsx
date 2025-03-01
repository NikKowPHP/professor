import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = async () => {

 const  massiveTransformativePurpose =  ()=> {
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
      className="flex grid grid-cols-1 sm:grid-cols-2 justify-between  py-[40px]  border border-red-500"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
        <div className="w-full border border-blue-500">
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
      <div className="flex flex-col items-center">
        <div className="border border-blue-500 flex flex-col items-center gap-[40px]">
          <h1
            className="font-bold text-[36px] sm:text-[36px] lg:text-[36px] leading-[1.1] font-bold  mb-2 text-center max-w-[1200px] mx-auto italic "
            itemProp="headline"
          >
            Prof. Michael Friebe, PhD
          </h1>
          <h2
            className="font-normal text-[36px] sm:text-[36px] lg:text-[36px] leading-[1.1] font-normal mb-2 text-center max-w-[1200px] mx-auto"
            itemProp="headline"
          >
            HealthTEC: Creating Innovations for Enterprises and New Ventures +
          </h2>
          <h3 className="flex flex-col items-center gap-[10px]">
            <span>{massiveTransformativePurpose()}</span>
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
