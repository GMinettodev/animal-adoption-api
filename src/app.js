const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');
const publicRoutes = require('./routes/publicRoutes');
// const authRoutes = require('./routes/authRoutes');
// const protectedRoutes = require('./routes/protectedRoutes');

// Middlewares (global)
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/public', publicRoutes);
// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.redirect('/public/home');
});

// Error processing Middleware
app.use(errorMiddleware);

module.exports = app;
