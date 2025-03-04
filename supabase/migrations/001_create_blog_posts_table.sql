DROP TABLE IF EXISTS proffessor_news;

CREATE TABLE proffessor_news (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image_alt TEXT,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO proffessor_news (slug, title, image_url, image_alt, excerpt, content_html, is_pinned, created_at, updated_at)
VALUES (
    'first-post',
    'The Future of Computer Science Education',
    '/images/image1.jpg',
    'Professor teaching students',
    'Exploring innovative approaches to tech education...',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    TRUE,
    NOW(),
    NOW()
);