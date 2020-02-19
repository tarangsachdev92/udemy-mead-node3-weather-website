const express = require('express');

const app = express();

app.get('', (req, res) => {
    // res.send('Hello Express');
    // send html
    // res.send('<h1>Weather</h1>');

    // send json
    res.send([{
        name: 'Tarang',
        age: 27
    }, {
        name: 'Manish',
        age: 25
    }]);
})

app.get('/help', (req, res) => {
    res.send('Help page');
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Summer',
        location: 'Ahmedabad'
    });
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
})