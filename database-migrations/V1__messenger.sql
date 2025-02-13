CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(255),
  password CHAR(128),
  socket_id CHAR(20) UNIQUE
);

CREATE TABLE messages (
  id CHAR(36) PRIMARY KEY,
  sender_id CHAR(36) REFERENCES users(id),
  receiver_id CHAR(36) REFERENCES users(id),
  message CHAR(MAX),
  created_at DATE DEFAULT GETDATE()
);