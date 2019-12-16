const request = require('request')

const forecast = (lon, lat, callback) =>{

    const url = 'https://api.darksky.net/forecast/b1740dbbede5c839481ba71351ea8e67/' + lon + ',' +lat
  
    request({url:url, json:true}, (error, { body })=>{
      if(error){
        callback('Unable to connect  weather service.', undefined )
      }else if(body.error){
        callback('Unable to find loaction', undefined)
      }else{
        callback(undefined, body.daily.data[0]. summary + ' it is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
      }
    })
  }

  module.exports = forecast