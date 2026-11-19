CREATE TABLE password_reset_tokens (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,

   CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX uq_password_reset_token_hash
    ON password_reset_tokens (token_hash);

CREATE INDEX idx_password_reset_user_id
    ON password_reset_tokens (user_id);

CREATE INDEX idx_password_reset_expires_at
    ON password_reset_tokens (expires_at);