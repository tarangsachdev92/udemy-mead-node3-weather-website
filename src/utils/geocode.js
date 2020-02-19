const request = require('request');

const geoCode = (address, callback) => {
    // const url = "https://api.darksky.net/forecast/5e576f4c1a016e3021b419ee021ea513/37.8267,-122.4233"
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFyYW5nc2FjaGRldiIsImEiOiJjazZyZnV5NWUwNW1rM2t0NHpnb2preG1rIn0.xfODDNfqmVyKEHoeTUVvMg&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find a location.Try another search!', undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, { latitude, longitude, location });
        }
    });
};

module.exports = geoCode;