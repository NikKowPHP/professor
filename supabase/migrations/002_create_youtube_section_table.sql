DROP TABLE IF EXISTS youtube_sections;

CREATE TABLE proffessor_youtube_section (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    youtube_url TEXT NOT NULL,
    quote TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO proffessor_youtube_section (id, youtube_url, quote, is_active, created_at, updated_at)
VALUES (
    'youtubeItem1',
    'SDrQH84YzU0',
    'Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
    TRUE,
    NOW(),
    NOW()
);