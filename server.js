const express = require('require');
const path = require('path');
const app = express();


// Route

app.use(express.static(path.join(__dirname, 'build')));

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


// Listen
app.listen(process.env.PORT | 5000., () => console.log(`Server is running`));