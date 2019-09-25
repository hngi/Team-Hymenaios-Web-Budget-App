const baseUrl = `https://budget-calculator-app-api.herokuapp.com/`;
//Logout User
const logOutBtn = document.querySelector('[data-logout]')
const logOut = () => {
    localStorage.removeItem('h-user-data');
    location.href='login.html'
}

logOutBtn.addEventListener('click', (event) => logOut(event));