const express = require('express');
const orgRoutes = require('./routes/organizations');
const issuesRoutes = require('./routes/issues');
const dashboardRoutes = require('./routes/dashboard');
const cors = require('cors'); // Import the cors package
const connectDb = require('../MongoConfig');
const app = express();
const port = process.env.PORT || 4001;

// Use cors middleware
app.use(cors({
    origin: ['http://localhost:3000'], // Add your domain here
    credentials: true, // Enable cookies in requests
}));
connectDb();
// Middleware to parse JSON requests
app.use(express.json());
app.use('/org', orgRoutes);
app.use('/issues', issuesRoutes)
app.use('/dashboard', dashboardRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});