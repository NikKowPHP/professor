DROP TABLE IF EXISTS proffessor_youtube_section;

CREATE TABLE proffessor_youtube_section (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    youtube_url TEXT NOT NULL,
    quote TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO proffessor_youtube_section (id, youtube_url, quote, created_at, updated_at)
VALUES (
    'youtubeItem1',
    'uYPRGHoWT3E',
    'Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
    NOW(),
    NOW()
);