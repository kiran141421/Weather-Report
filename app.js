
const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

    const query=req.body.city;
    console.log(query);
    const url='https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid=006d67cfba74c95fe4f5b5fc9bc9fcad';
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
        const weatherData=JSON.parse(data);
        const temperature=weatherData.main.temp;
        const desc=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        console.log(icon);
        const imageUrl="http://openweathermap.org/img/wn/"+icon+".png";

       
        res.write("<p>the description is:"+desc+"</p>");
        res.write("<h1>The temperature in "+query+" is:"+temperature+"</h1>");
        res.write("<img src="+imageUrl+">");
        res.send();
        });
    });
});




app.listen(3000,function(){
    console.log("Server is running on 3000");
});


//API-key
//006d67cfba74c95fe4f5b5fc9bc9fcad