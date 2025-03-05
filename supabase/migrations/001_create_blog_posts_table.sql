DROP TABLE IF EXISTS proffessor_news;

CREATE TABLE proffessor_news (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tag TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image_alt TEXT,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO proffessor_news (slug, title, image_url, image_alt, excerpt, content_html, is_pinned, created_at, updated_at, tag)
VALUES (
    'first-post',
    'The study of Indonesian etymology and loan words reveals both its historical and social contexts. Examples are the early Sanskrit borrowings from the 7th century during the trading era',
    '/images/image1.jpg',
    'Professor teaching students',
    'The study of Indonesian etymology and loan words reveals both its historical and social contexts. Examples are the early Sanskrit borrowings from the 7th century during the trading era, the borrowings from Arabic and Persian during the time of the establishment.',
    '<h1>Other loan words</h1><p>[edit]</p><p>Modern Indonesian draws many of its words from foreign sources; there are many synonyms. For example, Indonesian has three words for "book", i.e. pustaka (from Sanskrit), kitab (from Arabic) and buku (from Dutch boek); however, each has a slightly different meaning. A pustaka is often connected with ancient wisdom or sometimes with esoteric knowledge. A derived form, perpustakaan means a library. A kitab is usually a religious scripture or a book containing moral guidance. The Indonesian words for the Bible and Gospel are Alkitab and Injil, both directly derived from Arabic. The book containing the penal code is also called the kitab. Buku is the most common word for books.</p><h3><strong style="color: rgb(16, 20, 24); background-color: rgb(255, 255, 255);">Loan words of English origin</strong></h3><p>There are direct borrowings from various other languages of the world, such as karaoke (from カラオケ) from Japanese, and ebi (from えび) which means dried shrimp. Many words that originally are adopted through the Dutch language today however often are mistaken as English due to the similarity in the Germanic nature of both languages. In some cases the words are replaced by English language through globalization: although the word arbei (Dutch: aardbei)</p><h4><strong style="color: rgb(16, 20, 24); background-color: rgb(255, 255, 255);">Loan words of English origin</strong></h4><p>still literally means strawberry in Indonesian, today the usage of the word stroberi is more common. Greek words such as demokrasi (from δημοκρατία dēmokratía), filosofi, filsafat (both from φιλοσοφία philosophia), mitos (from μῦθος mythos) came through Dutch, Arabic and Portuguese respectively.</p><p><span style="color: rgb(32, 33, 34); background-color: rgb(255, 255, 255);">gr</span>ammar. Innovations of the Central Semitic languages—all maintained in Arabic—include:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The conversion of the suffix-conjugated stative formation (jalas-) into a past tense.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The conversion of the prefix-conjugated preterite-tense formation (yajlis-) into a present tense.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The elimination of other prefix-conjugated mood/aspect forms (e.g., a present tense formed by doubling the middle root, a perfect formed by infixing a /t/ after the first root consonant, probably a jussive formed by a stress shift) in favor of new moods formed by endings attached to the prefix-conjugation forms (e.g., -u for indicative, -a for subjunctive, no ending for jussive, -an or -anna for energetic).</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>The development of an internal passive.</li></ol><p>It is notable that some of the loanwords that exist in both Indonesian and Malaysian languages are different in spelling and pronunciation mainly due to how they derived their origins: Malaysian utilises words that reflect the English usage (as used by its former colonial power, the British), while Indonesian uses a Latinate form (e.g. aktiviti (Malaysian) vs. aktivitas (Indonesian), universiti (Malaysian) vs. universitas (Indonesian)).</p><h2><strong style="background-color: rgb(255, 255, 255); color: rgb(16, 20, 24);">Loan words of English origin</strong></h2><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAACzBAMAAADBMWtNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEX///9GgrRGgrT///////////////////9GgrT///////9GgrRGgrRGgrRGgrT///+mMQ0oAAAADnRSTlMAQIAwQCDAgCBgkGDAMDcZTNsAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH6QEYCTon2iDmtwAAANZJREFUeNrt2qENwlAUhtGCIsG0GxAmqGAABAkWwQAoLHVIVkCBZSAEkxA2APOeu7QkhEDI+eyfd2SvaVHoq/XGcXmfzMIWaV7Gc52f969xed/cw5o07+J5hcfj8Xg8Ho/H4/F4PB7/w/ygqqqykCT9e13nZB1Xp/kQz6dX+fga3adpfvcY4vF4PB6Px+PxeDwej8dHfNcvh9u4RZrn8bwvJEm/1fAcl/cn56BM8zH+3jf5ede1ejKP0ryJr9UNj8fj8Xg8Ho/H4/H4dv7yWb7E41t5xT0AJAY4uuNXqGAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjUtMDEtMjRUMDk6NTg6MTkrMDA6MDAs3W45AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI1LTAxLTI0VDA5OjU4OjE5KzAwOjAwXYDWhQAAAABJRU5ErkJggg=="></p>',
    TRUE,
    NOW(),
    NOW(),
    'News, Insights'
);