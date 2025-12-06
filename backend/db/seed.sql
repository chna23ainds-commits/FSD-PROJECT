-- Seed initial test data
INSERT INTO users (email, password_hash, name, created_at, updated_at)
VALUES (
  'test@test.com',
  '$2a$10$abcd1234efgh5678ijkl90mnopqrstuvwxyz1234567890',
  'Test User',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
