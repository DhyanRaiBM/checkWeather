const express = require('express')
const http = require('http')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.use(express.urlencoded({ extended: false }));
app.post('/', (req, res) => {
    userReq = req.body;
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + userReq.city + "&appid=8b91bc85a66c208561a300f3ff405281&units=metric";
    http.get(url, (response) => {
        response.on('data', (data) => {
            newData = JSON.parse(data);
            res.write("<div style='text-align: center; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 20px;'>");
            res.write("<h1 style='color: #333; margin-bottom: 10px;'>The weather in " + userReq.city + " is " + newData.main.temp + " degree celsius</h1>");
            res.write("<h2 style='color: #555; margin-top: 5px;'>Condition: <span style='font-style: italic;'>" + newData.weather[0].description + "</span></h2>");
            res.write("<img src='https://openweathermap.org/img/wn/" + newData.weather[0].icon + "@2x.png' alt='Weather Icon' style='max-width: 100px; margin-top: 10px;'>");
            res.write("</div>");

            res.send()
        })
    })
})

app.listen(3000, () => {
    console.log("THE SERVER IS UP AND RUNNING");
})

