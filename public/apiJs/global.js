//This area holdss the user important secrete data needed for are pages
//Get user information from the localstorage
const current_user = JSON.parse(localStorage.getItem('h-user-data'))
//Check if this user is real or else redirect to login
const checkUser = () => {
    !current_user ?  location.replace('login.html'): null
}
checkUser();
console.log(current_user)

//Destruct to get data
const {token, image_link, image_format, user} = current_user;
//eg token
//eg cloudinary image link and round format Read more on cloudinary Doc

//Get the user by destruring
const {first_name, last_name, email, username, image, dob, id, bio, total_income, created_at, updated_at } = user;



