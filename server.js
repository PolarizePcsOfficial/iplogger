const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3009;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to log IP
app.use('/api/log-ip', require('./api/log-ip'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
