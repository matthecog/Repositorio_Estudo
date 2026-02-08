const express = require('express');
const setCepRoutes = require('./routes/cep');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setCepRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});