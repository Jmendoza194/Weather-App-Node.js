const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

// this is what initializes express
const app = express()

//Gives us the local path to directory and file name
// console.log(__dirname)
// console.log(__filename)

//allows for path manipulation
//path.join(__dirname, '../public')
const publicDirectory = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Way to customize server
//express.static takes it to file path
//Static means the assest do not change
//Not dynamic webpage
//app.use(express.static(publicDirectory))


//Sets up handlebars, ready for templating
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res) =>{
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/about',(req,res) =>{
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req,res)=>{
  res.render('help',{
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Andrew Mead'
  })
})

app.get('/weather', (req, res) =>{
  if(!req.query.address){
    return res.send({
      error:'No address provided'
    })
  }
  //the ={} is just setting a default parameter that prevents crashing when no data is provided
  geocode(req.query.address, (error, {location, lat, lon} ={}) =>{
    if(error){
      return res.send({error})
    }forecast(lat, lon,(error, data) => {
      if(error){
        return res.send({error})
      }else{
        res.send({
          forecast: data,
          location,
          address: req.query.address
        })
      }
    })
  })

})

app.get('/products', (req, res) =>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  res.send({
    products:[]
  })
})

app.get('/help/*', (req,res)=>{
  res.render('404', {
    title: '404',
    name:'Andrew Mead',
    errorMessage: 'Help article not found.'
  })
})

//Has to be done last
app.get('*', (req, res) =>{
  res.render('404',{
    title:' 404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found'
  })
})

//Need to start server up
app.listen(3000, () =>{
  console.log('Server is up on port 3000')
})