const formInput = document.querySelector('form');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

function sendData(user) {
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Avec token stocké dans un cookie par exemple
            // 'Authorization': 'Bearer ' + 'token'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === 'Utilisateur connecté') {
            window.location.href = "http://localhost:3000/users/home";
        }
    })
    .catch(error => console.error(error));
}

function submitForm() {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const user = { email, password };

    console.log(user);
    sendData(user);
}

formInput.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});

