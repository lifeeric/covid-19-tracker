const express = require('express');
const path = require('path');
const app = express();


// Route

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})



// Listen
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server is running`));