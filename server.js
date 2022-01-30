const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
// const db = require('.db/db')
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('./api', apiRoutes);




// Default response for any other request (Not Found)
// Catchall route, this route can override all other routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
});
