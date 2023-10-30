const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users', require('./routes/posts'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});