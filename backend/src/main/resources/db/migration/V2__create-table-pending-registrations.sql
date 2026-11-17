CREATE TABLE pending_registrations (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX uq_pending_token_hash ON pending_registrations (token_hash);
CREATE INDEX idx_pending_expires_at ON  pending_registrations (expires_at);