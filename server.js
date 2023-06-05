const app = require('./app');
const cors = require('cors');

// Enable CORS for middle
app.use(cors());
const port = 3000; //  port number

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})