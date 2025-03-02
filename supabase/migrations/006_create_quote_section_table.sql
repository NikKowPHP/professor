DROP TABLE IF EXISTS quote_section;

CREATE TABLE quote_section (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO quote_section (id, quote, created_at, updated_at)
VALUES ('quoteSection1', 'Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.', NOW(), NOW());