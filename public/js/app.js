// console.log('Client side javascript is loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response => {
    response.json().then((data) => {
        console.log(data);
    })
}));

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // when deploy to heroku => remove domain 
    // fetch('http://localhost:3000/weather?address=' + location).then((response => {
    fetch('/weather?address=' + location).then((response => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    }));

});
