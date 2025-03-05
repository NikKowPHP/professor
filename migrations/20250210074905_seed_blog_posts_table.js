/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const blogPostsEn = [
    {
      slug: 'first-post',
      title: 'The study of Indonesian etymology and loan words reveals both its historical and social contexts. Examples are the early Sanskrit borrowings from the 7th century during the trading era
',
      image_url: '/images/image1.jpg',
      image_alt: 'First Blog Post',
      excerpt:
        'The study of Indonesian etymology and loan words reveals both its historical and social contexts. Examples are the early Sanskrit borrowings from the 7th century during the trading era, the borrowings from Arabic and Persian during the time of the establishment.',
      content_html: `
     <h1>Other loan words</h1><p>[edit]</p><p>Modern Indonesian draws many of its words from foreign sources; there are many synonyms. For example, Indonesian has three words for "book", i.e. pustaka (from Sanskrit), kitab (from Arabic) and buku (from Dutch boek); however, each has a slightly different meaning. A pustaka is often connected with ancient wisdom or sometimes with esoteric knowledge. A derived form, perpustakaan means a library. A kitab is usually a religious scripture or a book containing moral guidance. The Indonesian words for the Bible and Gospel are Alkitab and Injil, both directly derived from Arabic. The book containing the penal code is also called the kitab. Buku is the most common word for books.</p><h3><strong style="color: rgb(16, 20, 24); background-color: rgb(255, 255, 255);">Loan words of English origin</strong></h3><p>There are direct borrowings from various other languages of the world, such as karaoke (from カラオケ) from Japanese, and ebi (from えび) which means dried shrimp. Many words that originally are adopted through the Dutch language today however often are mistaken as English due to the similarity in the Germanic nature of both languages. In some cases the words are replaced by English language through globalization: although the word arbei (Dutch: aardbei)</p><h4><strong style="color: rgb(16, 20, 24); background-color: rgb(255, 255, 255);">Loan words of English origin</strong></h4><p>still literally means strawberry in Indonesian, today the usage of the word stroberi is more common. Greek words such as demokrasi (from δημοκρατία dēmokratía), filosofi, filsafat (both from φιλοσοφία philosophia), mitos (from μῦθος mythos) came through Dutch, Arabic and Portuguese respectively.</p><p><span style="color: rgb(32, 33, 34); background-color: rgb(255, 255, 255);">gr</span>ammar. Innovations of the Central Semitic languages—all maintained in Arabic—include:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The conversion of the suffix-conjugated stative formation (jalas-) into a past tense.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The conversion of the prefix-conjugated preterite-tense formation (yajlis-) into a present tense.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The elimination of other prefix-conjugated mood/aspect forms (e.g., a present tense formed by doubling the middle root, a perfect formed by infixing a /t/ after the first root consonant, probably a jussive formed by a stress shift) in favor of new moods formed by endings attached to the prefix-conjugation forms (e.g., -u for indicative, -a for subjunctive, no ending for jussive, -an or -anna for energetic).</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The development of an internal passive.</li></ol><p>It is notable that some of the loanwords that exist in both Indonesian and Malaysian languages are different in spelling and pronunciation mainly due to how they derived their origins: Malaysian utilises words that reflect the English usage (as used by its former colonial power, the British), while Indonesian uses a Latinate form (e.g. aktiviti (Malaysian) vs. aktivitas (Indonesian), universiti (Malaysian) vs. universitas (Indonesian)).</p><h2><strong style="background-color: rgb(255, 255, 255); color: rgb(16, 20, 24);">Loan words of English origin</strong></h2><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAACzBAMAAADBMWtNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEX///9GgrRGgrT///////////////////9GgrT///////9GgrRGgrRGgrRGgrT///+mMQ0oAAAADnRSTlMAQIAwQCDAgCBgkGDAMDcZTNsAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH6QEYCTon2iDmtwAAANZJREFUeNrt2qENwlAUhtGCIsG0GxAmqGAABAkWwQAoLHVIVkCBZSAEkxA2APOeu7QkhEDI+eyfd2SvaVHoq/XGcXmfzMIWaV7Gc52f969xed/cw5o07+J5hcfj8Xg8Ho/H4/F4PB7/w/ygqqqykCT9e13nZB1Xp/kQz6dX+fga3adpfvcY4vF4PB6Px+PxeDwej8dHfNcvh9u4RZrn8bwvJEm/1fAcl/cn56BM8zH+3jf5ede1ejKP0ryJr9UNj8fj8Xg8Ho/H4/H4dv7yWb7E41t5xT0AJAY4uuNXqGAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjUtMDEtMjRUMDk6NTg6MTkrMDA6MDAs3W45AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI1LTAxLTI0VDA5OjU4OjE5KzAwOjAwXYDWhQAAAABJRU5ErkJggg=="></p>
      
      `,
      is_pinned: true,
      tag: 'News'
    },
    {
      slug: 'second-post',
      title: 'Second Blog Post: Deep Dive into Next.js',
      image_url: '/images/case-studies/gsense/gsense.avif',
      image_alt: 'Second Blog Post',
      excerpt:
        '<p><em>Excerpt:</em> A detailed exploration of Next.js features and best practices for building modern web applications.</p>',
      content_html:
        '<p>In this post, we delve into the advanced features of Next.js, including server-side rendering, static site generation, and API routes. We will also cover performance optimization techniques and deployment strategies.</p><img src="/images/case-studies/gsense/gsense.avif" alt="Next.js" /><p>Learn how to leverage Next.js to create fast, scalable, and SEO-friendly web applications.</p>',
      is_pinned: false,
      
      tag: 'News'
    },
    {
      slug: 'third-post',
      title: 'Third Blog Post: The Future of Web Development',
      image_url: '/images/case-studies/gsense/gsense.avif',
      image_alt: 'Third Blog Post',
      excerpt:
        '<p><em>Excerpt:</em> An overview of the emerging trends and technologies that are shaping the future of web development.</p>',
      content_html:
        '<p>This post explores the latest trends in web development, such as WebAssembly, serverless computing, and progressive web apps. We will discuss how these technologies are transforming the way we build and deploy web applications.</p><img src="/images/case-studies/gsense/gsense.avif" alt="Web Development Trends" /><p>Stay ahead of the curve by understanding the technologies that will define the future of the web.</p>',
      is_pinned: false,
      tag: 'News'
    },
  ]

  const blogPostsPl = [
    {
      slug: 'pierwszy-post',
      title: 'Pierwszy Post na Blogu',
      image_url: '/images/case-studies/gsense/gsense.avif',
      image_alt: 'Pierwszy Post na Blogu',
      excerpt:
        '<p><em>Fragment:</em> To kompleksowe wprowadzenie do naszego pierwszego postu na blogu, obejmujące szeroki zakres tematów i mające na celu zaangażowanie czytelników od początku do końca.</p>',
      content_html: `
        <h1>Wprowadzenie</h1>
        <p>Witamy w naszym pierwszym poście na blogu! W tym artykule zbadamy różne aspekty nowoczesnego tworzenia stron internetowych i podzielimy się spostrzeżeniami na temat tego, jak budować lepsze aplikacje internetowe.</p>

        <h2>Sekcja 1: Zrozumienie Podstaw</h2>
        <p>Zanim przejdziemy do zaawansowanych tematów, omówmy kilka podstawowych koncepcji. Tworzenie stron internetowych obejmuje kombinację HTML, CSS i JavaScript.</p>

        <h3>HTML</h3>
        <p>HTML (HyperText Markup Language) to podstawa każdej strony internetowej. Zapewnia strukturę i treść.</p>

        <h3>CSS</h3>
        <p>CSS (Cascading Style Sheets) służy do stylizowania elementów HTML, kontrolując wygląd wizualny strony.</p>

        <h3>JavaScript</h3>
        <p>JavaScript dodaje interaktywność i dynamiczne zachowanie do stron internetowych.</p>

        <h2>Sekcja 2: Zaawansowane Techniki</h2>
        <p>Teraz, gdy mamy podstawowe zrozumienie, zbadajmy kilka zaawansowanych technik.</p>

        <ul>
          <li><strong>Renderowanie po stronie serwera (SSR):</strong> Poprawia wydajność i SEO.</li>
          <li><strong>Generowanie statycznych stron (SSG):</strong> Generuje statyczne pliki HTML w czasie budowania.</li>
          <li><strong>Trasy API:</strong> Twórz funkcje bezserwerowe do obsługi żądań API.</li>
        </ul>

        <blockquote>
          "Tworzenie stron internetowych stale się rozwija, dlatego ważne jest, aby być na bieżąco z najnowszymi trendami i technologiami." - John Doe, Ekspert ds. Tworzenia Stron Internetowych
        </blockquote>

        <img src="/images/case-studies/gsense/gsense.avif" alt="Tworzenie Stron Internetowych" />

        <h2>Sekcja 3: Najlepsze Praktyki</h2>
        <p>Aby zapewnić, że Twoje aplikacje internetowe są solidne i łatwe w utrzymaniu, postępuj zgodnie z tymi najlepszymi praktykami:</p>

        <ol>
          <li>Pisz czysty i dobrze udokumentowany kod.</li>
          <li>Optymalizuj wydajność, minimalizując żądania HTTP.</li>
          <li>Używaj systemu kontroli wersji, takiego jak Git.</li>
        </ol>

        <h2>Wniosek</h2>
        <p>Dziękujemy za przeczytanie naszego pierwszego postu na blogu! Mamy nadzieję, że był on pouczający i pomocny. Bądźcie czujni na kolejne artykuły o tworzeniu stron internetowych.</p>
      `,
      is_pinned: false,
      tag: 'News'
    },
    {
      slug: 'drugi-post',
      title: 'Drugi Post na Blogu: Dogłębne Zanurzenie w Next.js',
      image_url: '/images/case-studies/gsense/gsense.avif',
      image_alt: 'Drugi Post na Blogu',
      excerpt:
        '<p><em>Fragment:</em> Szczegółowa eksploracja funkcji Next.js i najlepszych praktyk dotyczących budowania nowoczesnych aplikacji internetowych.</p>',
      content_html:
        '<p>W tym poście zagłębiamy się w zaawansowane funkcje Next.js, w tym renderowanie po stronie serwera, generowanie statycznych stron i trasy API. Omówimy również techniki optymalizacji wydajności i strategie wdrażania.</p><img src="/images/case-studies/gsense/gsense.avif" alt="Next.js" /><p>Dowiedz się, jak wykorzystać Next.js do tworzenia szybkich, skalowalnych i przyjaznych dla SEO aplikacji internetowych.</p>',
      is_pinned: false,
      tag: 'News'
    },
    {
      slug: 'trzeci-post',
      title: 'Trzeci Post na Blogu: Przyszłość Tworzenia Stron Internetowych',
      image_url: '/images/case-studies/gsense/gsense.avif',
      image_alt: 'Trzeci Post na Blogu',
      excerpt:
        '<p><em>Fragment:</em> Przegląd pojawiających się trendów i technologii, które kształtują przyszłość tworzenia stron internetowych.</p>',
      content_html:
        '<p>Ten post bada najnowsze trendy w tworzeniu stron internetowych, takie jak WebAssembly, przetwarzanie bezserwerowe i progresywne aplikacje internetowe. Omówimy, w jaki sposób te technologie zmieniają sposób, w jaki budujemy i wdrażamy aplikacje internetowe.</p><img src="/images/case-studies/gsense/gsense.avif" alt="Trendy w Tworzeniu Stron Internetowych" /><p>Wyprzedź konkurencję, rozumiejąc technologie, które zdefiniują przyszłość sieci.</p>',
      is_pinned: false,
      tag: 'News'
    },
  ]

  await knex('professor_news_posts').insert(blogPostsEn)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex('professor_news_posts').del()
}
