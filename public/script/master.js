
 function process() {
    let text = document.querySelector('textarea');
    // console.log(text)
    if(!text.value){
        alert('you didnt white on text area :(')
    }else{
        callApi(text.value);
    }
}

function callApi(phrase) {
    const url = '/analyse';
    const data = {
        'phrase': `${phrase}`
    }

    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        // console.log("req", res)
        return res.json()

    }).then(data => {
        console.log("data",data)
        showScore(data);
    }).catch(err => {
        console.log(err)
    });
}
function showScore(score){
    const response = document.querySelector('.response');
    
    const span = `<span>
        <p>Score: ${score.score}</p>
        <p>Comparative: ${score.comparative}</p>
        <p>Tokens: ${score.tokens.length}</p>
        <p>Negative Words: ${score.negative.length}</p>
        <p>Positive Words: ${score.positive.length}</p>
        </span>`;
    response.innerHTML = span;
}
