# 🐶Animal adoption api
This is a **RESTful API** developed with **NodeJS**, **Express** and **MySQL** with the functionalities of sign-up of users and pets, management of users ands pets and pets adoption.

---

# 📥Instalation process
``` bash
# Clone the repository
git clone https://github.com/GMinettodev/animal-adoption-api.git
cd animal-adoption-api

# Install the dependencies
npm install

# Configure the web environment
cp .env.example .env
# Edit the .env with the settings of your MySQL

# Create the database and the tables
mysql -u root -p < scripts/db.sql
mysql -u root -p < scripts/schema.sql

# Run the application
npm run dev
