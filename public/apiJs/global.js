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
let {token, image_link, image_format, user} = current_user;
//eg token
//eg cloudinary image link and round format Read more on cloudinary Doc

//Get the user by destruring
const {first_name, last_name, email, username, image, dob, id, bio, total_income, created_at, updated_at } = user;

const activateReAuth = (event) => {
	event.preventDefault();
	const btn = event.target || event.srcElement;

	const re_auth_preloader = document.querySelector('#re_auth_preloader');
	const data = JSON.parse(localStorage.getItem('re_auth'));
	if(data) {
		btn.setAttribute('disabled', "");
		re_auth_preloader.style.visibility = 'visible';
		const url = `${ baseUrl }api/user/login`;
		fetch(url, {
		 method: "POST",
		 mode: "cors",
		 headers: {
		 	 "Content-Type": "application/json"
		 },
		 body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			btn.removeAttribute('disabled');
            re_auth_preloader.style.visibility = 'hidden';
			console.log(data)
			rag = localStorage.setItem('h-user-data', JSON.stringify(data));
			console.log(window)
			location.replace(`${location.href}`)
		})
		.catch(error => {
			btn.removeAttribute('disabled');
			re_auth_preloader.style.visibility = 'hidden';
			location.replace('login.html');
			console.error(error)
		})
	}else {
		location.replace('login.html')
	}
	
}

const reAuthenticate = (dataPreloader) => {
	if (dataPreloader != null) {
		dataPreloader.style.display = 'none';
	}
const body = document.querySelector('body');
body.innerHTML += `
	<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLongTitle">Your session has expire</h5>
	      </div>
	      <div class="modal-body">
	      	<div style="width:30%; margin:auto;">
	      	<button style="background:none; border:1px solid dodgerblue; color:dodgerblue;" data-re-auth-btn class="btn" type="button">
			  <span style="color:dodgerblue;" id="re_auth_preloader" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			  Re-authenticate
			</button>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
`;
$('#exampleModalCenter').modal("toggle");

const reAuthBtn = document.querySelector('[data-re-auth-btn]');
reAuthBtn.addEventListener('click', (event) => activateReAuth(event))
}

setTimeout( () => {
	//Format Token for re-Auth
	token = '0000';
	console.log(token)
    	dull = null;
     return reAuthenticate(dull);	
}, 1800000)