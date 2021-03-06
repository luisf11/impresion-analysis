"use strict";
function process() {
  let text = document.querySelector("textarea");
  // console.log(text)
  if (!text.value) {
    alert("you didnt white on text area :(");
  } else {
    callApi(text.value);
  }
}

function callApi(phrase) {
  const url = "/analyse";
  const data = {
    phrase: `${phrase}`
  };

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      // console.log("req", res)
      return res.json();
    })
    .then(data => {
      // console.log("data",data)
      showScore(data);
    })
    .catch(err => {
      console.log(err);
    });
}
function showScore(score) {
  const response = document.querySelector(".legend");

  const span = `
  <span>
      <p><b>Score:</b> ${score.score}</p>
      <p><b>Tokens:</b> ${score.tokens.length}</p>
      <p><b>Negative Words:</b> ${score.negative.length}</p>
      <p><b>Positive Words:</b> ${score.positive.length}</p>
      </span>
        `;
        
  response.innerHTML = span;
  generateChart(score);
}

function generateChart(data) {
  const score = data.score;
  const negative = data.negative.length;
  const positive = data.positive.length;
  const tokens = data.tokens.length;
  const words = data.words.length;

  const positivePorcent = positive / words * 100;
  const negativePorcent = negative / words * 100;
  return showChart(positivePorcent, negativePorcent);
}
function showChart(positive, negative) {
  let data = [negative, positive];
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "doughnut",

    // The data for our dataset
    data: {
      labels: ["Negative", "Positive"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: ["#F25C54", "#51D6FF"],
          borderColor: "white",
          data: [...data]
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}
