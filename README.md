# 🐶Animal adoption api

This is a **RESTful API** developed with **NodeJS**, **Express** and **MySQL** with the functionalities of sign-up of users and pets, management of users ands pets and pets adoption.

## 🛠️Technologies used

- JavaScript
- Node.js
- Express
- MySQL

## 🗃️Database schema

The database consists of the following collections:

### Users

- `_id`: Unique identifier
- `name`: User's full name
- `email`: User's email address
- `password`: Hashed password
- `phone`: Phone number
- `role`: User role ('adopter', 'admin'), default is 'adopter'

### Pets

- `_id`: Unique identifier
- `name`: Pet's name
- `age`: Pet's age
- `species`: Species of the pet
- `size`: Size category (e.g., small, medium, large)
- `status`: Adoption status (e.g., available, adopted)
- `description`: Description of the pet

### Adoptions

- `_id`: Unique identifier
- `userId`: Reference to the Users collection
- `petId`: Reference to the Pets collection
- `adoptionDate`: Date when the adoption occurred

## 📥Instalation process

```bash
# Clone the repository
git clone https://github.com/GMinettodev/animal-adoption-api.git
cd animal-adoption-api

# Install the dependencies
npm install

# Configure the web environment
cp .env.example .env
# Edit the .env with the settings of your MySQL

# Create the database and the tables
mysql -u root
source src/database/create_database.sql
source src/database/create_tables.sql

# Run the application
npm run dev
```
