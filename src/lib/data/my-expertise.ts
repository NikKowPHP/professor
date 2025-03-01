export interface ProcessItem {
    id: string
    title: string
    content: string
    bgColor: string
    textColor: string
  }
  
  export const processItems: ProcessItem[] = [

    {
        id: 'items.item1',
        title: 'Diagnostic Imaging and Image-Guided Therapies',
        content: 'We invest in advanced technology that addresses important societal issues. We have a special interest in advanced materials, industry 4.0, energy, advanced computing, AI, and synthetic biology.',
        bgColor: '#027355',
        textColor: '#fff'
      },
      {
        id: 'items.item2',
        title: 'Innovation Generation and Entrepreneurship',
        content: 'I excel at identifying opportunities, creating innovative solutions, and building successful ventures. Additionally, I enjoy coaching and mentoring startups to help them grow and thrive.',
        bgColor: '#218AC6',
        textColor: '#000'
      },
      {
        id: 'items.item3',
        title: 'Medical Technology',
        content: 'With decades of experience in the MedTech industry, I possess a deep understanding of the complexities involved in medical device development, regulation, and commercialization. I strive to bridge the gap between technological advancements and practical healthcare solutions.',
        bgColor: '#FBB239',
        textColor: '#000'
      },
    
    // Add more testimonials
  ]
  
  export async function getProcessItems(): Promise<ProcessItem[]> {
    return processItems
  }