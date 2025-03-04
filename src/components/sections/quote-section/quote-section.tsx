'use client'

import { useEffect, useState } from 'react';
import { quoteSectionService } from '@/lib/services/quote-section.service';
import { QuoteItem } from '@/lib/data/quote-section';

export const QuoteSection = () => {
  const [quote, setQuote] = useState<QuoteItem | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const quoteSection = await quoteSectionService.getQuoteSection();
        console.log('quoteSection', quoteSection)
        setQuote(quoteSection);
      } catch (error) {
        console.error('Failed to fetch quote section:', error);
      }
    };

    fetchQuote();
  }, []);

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="quote-section"
      className="py-[50px] px-[20px] md:px-0 bg-black flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[26px] md:text-[48px] font-normal text-center text-white leading-[1.2]">
        {`"${quote.quote}"`}
        </h2>
      </div>
    </section>
  );
};