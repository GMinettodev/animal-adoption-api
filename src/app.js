const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/userRoutes');
const petRouter = require('./routes/petRoutes');
const adoptionRouter = require('./routes/adoptionRoutes');

// Middlewares (global)
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/pets', petRouter);
app.use('/adoptions', adoptionRouter);

app.get('/', (req, res) => {
  res.redirect('/users/login');
});

// Error processing Middleware
app.use(errorMiddleware);

module.exports = app;
