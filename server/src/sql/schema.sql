CREATE DATABASE users_app;
USE users_app;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 1),
    lastEntry TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isBlocked TINYINT(1) DEFAULT 0,
    UNIQUE INDEX emailUnique (email)
);

INSERT INTO users (name, email, password)
VALUES ("Admin", "admin@gmail.com", "admin");