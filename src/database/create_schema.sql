USE pets_db;

INSERT INTO
    users (name, email, password, phone, role)
VALUES
    (
        'Admin User',
        'admin@example.com',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0ODI4MjAwfQ.sXy7jKFF0CkRfY6UQdV4kKxU2k2J7s0kJxY7sV8nNn0',
        '123-456-7890',
        'admin'
    ),
    (
        'Adopter User',
        'adopter1@example.com',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsInJvbGUiOiJhZGRtYXBseCIsImlhdCI6MTY4NDg0ODQwMH0.2V9dKXK0l2XJrYvQm8N2V3g7s_2Kkzx1Vn3b5R1SzUo',
        '987-654-3210',
        'adopter'
    );

-- Add more users as needed
-- Insert sample pets
INSERT INTO
    pets (name, age, species, size, status, description)
VALUES
    (
        'Buddy',
        3,
        'Dog',
        'Medium',
        'Available',
        'Friendly medium-sized dog'
    ),
    (
        'Whiskers',
        2,
        'Cat',
        'Small',
        'Adopted',
        'Playful young cat'
    ),
    (
        'Max',
        5,
        'Dog',
        'Large',
        'Available',
        'Loyal large dog'
    ),
    (
        'Luna',
        1,
        'Cat',
        'Small',
        'Available',
        'Cute kitten'
    );

-- Insert sample adoptions
INSERT INTO
    adoptions (user_id, pet_id, adoption_date)
VALUES
    (2, 2, '2024-01-15'), -- Adopter user with id 2 adopted pet with id 2
    (2, 4, '2024-02-01');

-- Same user adopted another pet