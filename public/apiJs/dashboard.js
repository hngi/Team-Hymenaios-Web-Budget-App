
//Now to get the user info, refer to the global.js
const thisFullName = document.querySelector('[data-this-fullname]');
const thisUserName = document.querySelector('[data-this-username]');

const thisUserNameSidebar = document.querySelector('[data-this-username-side]');
const thisImageSidebar = document.querySelector('[data-this-image-side]');

const thisEmail = document.querySelector('[data-this-email]');

const thisImage = document.querySelector('[data-this-image]');

first_name || last_name ? thisFullName.innerHTML = `${first_name}, ${last_name}` : null;

thisUserName.innerHTML = `@${username}`;

thisUserNameSidebar.innerHTML = `@${username}`;

thisEmail.innerHTML = `${email}`;

thisImage.src = `${image_link}${image_format}${image}`;

thisImageSidebar.src = `${image_link}${image_format}${image}`;
