const menu = document.getElementById('header-menu');
const menuItems = menu.querySelectorAll('a');

console.log(menuItems);

menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const page = e.target.innerText.toLowerCase();
        window.location.href = `http://${item.host}/users/${page}`;
        console.log(page);
    })
})


