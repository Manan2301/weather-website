const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibWFuYW4wMSIsImEiOiJja2prYTk3a2gwY2NoMnNzMjFuOXY0M2ZjIn0.9Q-4_Wkw4z32KkEI4u8Suw'
    request ({ url, json: true}, (error, {body}/*response*/ ) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(/*response.*/body.features.length === 0){
            callback('Unable to find the location, try another search', undefined)
        }
        else {
            callback(undefined,{
            latitude: /*response.*/body.features[0].center[0],
            longitude: /*response.*/body.features[0].center[1],
            place: /*response.*/body.features[0].place_name
            
            })
        }
    })
}

module.exports = geocode