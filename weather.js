const express=require('express')
const http=require('http')
const app=express()

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.use(express.urlencoded({ extended: false }));
app.post('/',(req,res)=>{
    userReq=req.body;
    const url="http://api.openweathermap.org/data/2.5/weather?q="+userReq.city+"&appid=8b91bc85a66c208561a300f3ff405281&units=metric"
    http.get(url,(response)=>{
        response.on('data',(data)=>{
            newData=JSON.parse(data)
            res.write("<h1>The weather in "+userReq.city+" is "+newData.main.temp+" degree celcius<h1>")
            res.write("<h2>Condition :"+newData.weather[0].description+"</h2>")
            res.write("<img src='https://openweathermap.org/img/wn/"+newData.weather[0].icon+"@2x.png' alt=' '>")
            res.send()
        })  
    })
})

app.listen(3000,()=>{
    console.log("THE SERVER IS UP AND RUNNING");
})

