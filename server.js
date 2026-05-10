require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connect');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
