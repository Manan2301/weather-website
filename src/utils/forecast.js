const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude + '&appid=3afec1615fe52100a27f35843eb2fd1d&units=metric'
    request ({url, json: true}, (error, /*response.*/{body} ) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } 
        else if(/*response.*/body.cod === 400){
            callback('Unable to fetch the weather for this location, try another search', undefined)
        }
        else {
            
            callback(undefined,/*response.*/body.daily[0].weather[0].description + '. It is currently '+ /*response.*/body.current.temp)          
            
        }
    })
}

module.exports = forecast