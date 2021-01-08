const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')


const app = express()

//Define paths for Express config
const pathTopublic = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')// if we want to use non default templates instead of default views
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup static directory to be served
app.use(express.static(pathTopublic))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath) // not needed if we use default views directory instead of templates
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        name: 'Manan' ,
        title: 'Weather App'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name:'Manan'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        name:'Manan',
        title:'Help',
        HelpMessage: 'These are help pages'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a loaction'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, place} = {}/*data*/) => {
        if(error){
            return res.send({Error: error})
        }
        //console.log('data:',data) 
        forecast(  longitude,latitude,(error, forecastdata) => {
                if (error){
                    return res.send({Error: error})
                }
                return res.send({
                    location: place,
                    forecast: forecastdata
                })        
        }) 
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'Error',
        name:'Manan',
        error: 'Help page not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'Error',
        name:'Manan',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})

