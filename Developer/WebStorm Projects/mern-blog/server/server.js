const express = require('express');
const cors = require('cors');
const config = require('./config');
const app = express();git
const postRoutes = require('./routes/post.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', postRoutes);

app.listen(config.PORT, function() {
    console.log('Server is running on Port:', config.PORT);
});