const menu = document.getElementById('header-menu');
const menuItems = menu.querySelectorAll('a');

console.log(menuItems);

function headerMenuRouter() {
    menuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log('click');
            const page = e.target.innerText.toLowerCase();
            window.location.href = `/${page}`;
        })
    })
}

document.addEventListener('DOMContentLoaded', headerMenuRouter);