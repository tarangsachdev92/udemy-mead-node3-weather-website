const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    // render allows us to render view(handlebars template)
    res.render('index', { title: 'Weather App', name: 'Tarang Sachdev' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About me', name: 'Tarang Sachdev' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', helpText: 'This is some helpfull text!', name: 'Tarang Sachdev' })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address term'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

})

app.get('/products', (req, res) => {
    // console.log(req.query)

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '404 Help',
        name: 'Tarang Sachdev',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    // res.send('My 404 page');
    res.render('404', {
        title: '404',
        name: 'Tarang Sachdev',
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
})
