-- Table for 'users' interface
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for 'todos' interface
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    todo TEXT NOT NULL,
    completed BOOLEAN NOT NULL,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Add indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_todos_userId ON todos(userId);