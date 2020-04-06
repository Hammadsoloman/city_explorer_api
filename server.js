'use strict';

/*to get the library, and express function has alots of methods and 
properties can we use it in the server*/
const express=require('express');

//to get promision who can touch my server
// Load Environment Variables from the .env file
const cors =require('cors');

//read our invironment variable
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app=express();

app.use(cors(/*in this lab its open for every one*/));

//now we should handle the route to the port, and that by using get
app.get('/',(request,response)=>{
    response.status(200).send('Welcome');//done successfully 
});


//we send the request to the express server, and our case have it in JSON file, not from APi 

app.get('/location',(request,response)=>{
    //get all of the data from json file
    try {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    //we use the query to access the parameter that we nees
    const locationData= new Location(city,geoData) //location data is an object
    response.status(200).json(locationData);
    } catch (error) {
    errorHandler(error, request, response);
  }
 
});


app.get('/weather',(request,response)=>{
  try {
  const darkskyDate=require('./data/darksky.json');
  const weatherSuemmry=[];

  darkskyDate.data.forEash((day,index)=>{
   weatherSuemmry.push(new Weather (day));
  });
  response.status(200).json(locationWeather);
    } catch (error) {
    errorHandler(error, request, response);
  }
});
  

//   console.log(sky);

//we use it to select the all , and we can use "get" rather than "use"
app.use('*', notFoundHandler);
function Location(city,geoData){
    this.search_query=city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
};
// console.log(Location)

//constructor for the weather, when the user wrote the city it will show the weather
function Weather(sky){
    this.forcast = sky.weather.description;
    this.time = new Date(sky.valid_date).toDateString();
};



function notFoundHandler(request, response) {
response.status(404).send('NOT FOUND!!');
  };


//to handle with the error that happend with uncorrect input or value
function errorHandler(error, request, response) {
    response.status(500).send({'Status': 500,responseText:'sorry something went wrong'});

  };
 
// listening for requests
app.listen (PORT,()=>{
    console.log(`the server is up and running on ${PORT}`);
});