
//Now to get the user info, refer to the global.js
const thisFullName = document.querySelector('[data-this-fullname]');
const thisFirstNameEdit = document.querySelector('[data-this-first-name-edit]');
const thisLastNameEdit = document.querySelector('[data-this-last-name-edit]');

const thisUserName = document.querySelector('[data-this-username]');
const thisUserNameSidebar = document.querySelector('[data-this-username-side]');
const thisUserEdit = document.querySelector('[data-this-username-edit]')

const thisImage = document.querySelector('[data-this-image]');
const thisImageSidebar = document.querySelector('[data-this-image-side]');

const thisEmail = document.querySelector('[data-this-email]');

const thisBio = document.querySelector('[data-this-bio]');
const thisBioEdit = document.querySelector('[data-this-bio-edit]');

const thisDobEdit = document.querySelector('[data-this-Dob-edit]');

if(first_name || last_name || bio || dob) {
    thisFullName.innerHTML = `${first_name}, ${last_name}` 
    thisFirstNameEdit.value = `${first_name}`;
    thisLastNameEdit.value = `${last_name}`;
    thisBio.innerHTML = `${bio}` 
    thisBioEdit.value = `${bio}` 

    thisDobEdit.value = `${dob}`
}  


thisUserName.innerHTML = `@${username}`;
thisUserEdit.value = `${username}`;
thisUserNameSidebar.innerHTML = `@${username}`;

thisEmail.innerHTML = `${email}`;

thisImage.src = `${image_link}${image_format}${image}`;

thisImageSidebar.src = `${image_link}${image_format}${image}`;
