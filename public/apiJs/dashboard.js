
//Now to get the user info, refer to the global.js
const thisUser = document.querySelector('[data-this-user]');
thisUser.innerHTML = `Hello <span style="color:hotpink;">${username}</span>,  <span style="color:lime;">[${email}]</span> this is to show that you are login into Hymenaios Budget Calculator`;