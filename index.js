"use strict";
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname+ "/public/index.html"));
    
    });

app.post("/analyse",(req, res)=>{
    const text = req.body.phrase;

});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });