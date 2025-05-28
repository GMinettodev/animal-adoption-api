USE pets_db;

CREATE TABLE
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        species VARCHAR(255) NOT NULL,
        size VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS adoptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        pet_id INT NOT NULL,
        adoption_date DATE NOT NULL
    );