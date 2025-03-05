export const navigationConfig = {
  mainNav: [
   
    {
      title: 'My Investments',
      href: 'my-investments',
      isRoute: false,
       color: '#fdba74' // orange
    },
    {
      title: 'My Story',
      href: 'my-story',
      isRoute: false,
      color: '#93c5fd' // blue
    },
    {
      title: 'News & Insights',
      href: 'news',
      isRoute: true,
       color: '#f9a8d4' // pink

    }
  ],
  mainNavLinks: [
    {
      title: 'Email',
      href: 'email',
      isRoute: false,
      
         color: '#f9a8d4'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/proffessor-website/',
      isRoute: false,
       color: '#93c5fd'
    },
    {
      title: 'ResearchGate',
      href: 'https://www.researchgate.net/profile/Proffessor-Website',
      isRoute: false,
      color: '#fdba74' 
    },
    {
      title: 'Patents',
      href: 'https://patents.google.com/patent/US11964322B2/en',
      isRoute: false,
         color: '#f9a8d4'
    },


  ],

} as const 