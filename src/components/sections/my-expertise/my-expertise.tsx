import { Suspense } from 'react'
import { getProcessItems, ProcessItem as ProcessItemType } from '@/lib/data/my-expertise'

export const MyExpertise = async () => {
  const processItems = getProcessItems()


  return (
    <>
      <Suspense
        fallback={
          <div 
            className="flex items-center justify-center min-h-[200px]"
            aria-label="Loading process section"
          >
            Loading...
          </div>
        }
      >
        <section
          id="my-expertise"
          className="sm:py-[25px]"
          itemScope
          itemType="https://schema.org/HowTo"
          aria-labelledby="process-title"
        >
          <ProcessTitleSubtitle />
          <ProcessItemList  processItems={processItems} />
        </section>
      </Suspense>
    </>
  )
}

const ProcessTitleSubtitle = () => {
  return (
    <header className='mb-[36px] '>
      <h2
        id="process-title"
        className="text-[40px] sm:text-[56px] lg:text-[48px] leading-[1.1] font-medium tracking-[-0.02em]  mb-[16px]"
        itemProp="name"
      >
        My Expertise
      </h2>
    </header>
  )
}

const ProcessItem = ({ index, item }: { index: number; item: ProcessItemType }) => {
  return (
    <div 
      className="p-[36px] shadow-sm flex flex-col gap-[60px] border border-red-500"
      style={{ 
        backgroundColor: item.bgColor,
        color: item.textColor 
      }}
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={`${index + 1}`} />
      <h3 
        className="text-[30px] font-bold"
        itemProp="name"
      >
        {item.title}
      </h3>
      <p 
        className="text-[16px] leading-[1.2]"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {item.content}
      </p>
    </div>
  )
}

const ProcessItemList = async ({
  processItems,
}: {
  processItems: Promise<ProcessItemType[]>
}) => {
  const items = await processItems
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-3 max-w-5xl justify-center mx-auto"
      role="list"
      aria-label="Development process steps"
    >
      {items.map((item: ProcessItemType, index: number) => (
        <ProcessItem 
          index={index} 
          item={item} 
          key={index} 
        />
      ))}
    </div>
  )
}
