"use strict";
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const sentiment = require('sentiment');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname+ "/public/index.html"));
    
    });

app.post("/analyse",(req, res)=>{
    const text = req.body.phrase;
    // console.log(text)
    if(!text){
        res.statusCode = 422;
        res.json({
            error: 'Unprocessable Entity'
        })
    }else{
        sentiment(text,(err, result)=>{
            res.statusCode = 200;
            res.json(result);
        })
    }
        
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });