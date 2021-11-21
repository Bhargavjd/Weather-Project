const express=require("express");
const https=require("https")
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res){

  res.sendFile(__dirname+ "/index.html")
})

app.post("/",function(req,res){
console.log(req.body.cityName)
const query=req.body.cityName;
const apiKey="843d91746451a019be0af6a792a507eb"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData=JSON.parse(data)
    const temp=weatherData.main.temp
    const weatherDescription=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1> The temp in "+req.body.cityName+ "is "+ temp +" degree celcius</h1>");
    res.write("<h3> weather currently is "+ weatherDescription+"</h3>");
    res.write("<img src="+imageURL+">");
    res.send();
  })
})
})



app.listen(3000,function(){
  console.log("server started");
})
