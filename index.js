"use strict";
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname+ "/public/index.html"));
    
    });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });