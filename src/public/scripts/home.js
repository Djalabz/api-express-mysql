const requestBtn = document.getElementById('request-btn');
const dashboard = document.getElementById('dashboard');

// function fetchData() {
//     console.log('fetchData');

//     fetch('http://localhost:3000/users/home/data', {
//         method: 'GET',
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
        // renderHome(data);
//     })
//     .catch(error => console.error(error));
// }

// function renderHome(data) {

//     const html = `
//         <h1 class="text-center">Bienvenue ${data.username} !</h1>
//         <p class="text-center">Vous êtes connecté en tant que ${data.email}</p>
//     `;
//     dashboard.innerHTML = html;
// }

// fetchData();