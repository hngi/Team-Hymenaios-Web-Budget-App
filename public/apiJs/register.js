const registerForm = document.querySelector('#registerForm');
const register_preloader = document.querySelector('[data-register-preloader]');


const registerFormFunc = (event) => {
	event.preventDefault();
	
	document.querySelectorAll('._err_msg')[0].textContent = "";	
	document.querySelectorAll('._err_msg')[1].textContent = "";	
	document.querySelectorAll('._err_msg')[2].textContent = "";	

	const formData = new FormData(registerForm);
	if (formData.get('username') == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "A username is required!";
	}else if(formData.get('email') == "") {
		document.querySelectorAll('._err_msg')[1].textContent = "A valid email is required!";	
	}else if(formData.get('password') == ""){
		document.querySelectorAll('._err_msg')[2].textContent = "A secured password is required!";
	}else {
		let status;
		register_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			return response.json();
		}

		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/user/register`;
		fetch(url, {
		 method: "POST",
		 mode: "cors",
		 headers: {
		 	 "Content-Type": "application/json"
		 },
		 body: JSON.stringify(data)
		})
		.then(response => errorHandling(response))
		.then(data => {
		register_preloader.style.display = 'none';
		let title = 'Sign up succesful';
			let msg = `please check you email 
							<a style="color: lime; text-decoration:none; padding-right:5px; padding-left:5px;">
										${formData.get('email')}
							</a> 
						to verify your account!`;
			let action   = '<i class="fa fa-thumbs-up"></i>Thank You !';
			Swal.fire({
			    title: `<b id="title">${title}</b>`,
			    width: 600,
			    padding: '3em',
			    background: 'none',
			    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
			    backdrop: `
				rgba(0,0,0,0.5)
				    center 
				    no-repeat
				  `,
				confirmButtonText: `<span id="action">${action}</span>`
			})
			const title_field =document.querySelector('#title');
			const action_field =document.querySelector('#action');
			const error_field =document.querySelector('#error_field');
			if (status == 422) {
				title_field.style.color = 'red';
				action_field.style.color = 'white';
				error_field.style.color = 'red';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
				const {username, email, password} = data;
				msg = '';
				if(username) {
					msg +=`${username} <br>`;
				}else if (email){
					msg +=`${email} <br>`;
				}else if (password){
					msg +=`${password} <br>`;
				}

				error_field.innerHTML = msg;
			} else if (status == 501) {
				title_field.style.color = 'tomato';
				action_field.style.color = 'white';
				error_field.style.color = 'tomato';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
				error_field.innerHTML = 'An Unexpected error occured, please try again!';
			}else{
				title_field.style.color = 'lime';
				action_field.style.color = 'white';
				error_field.style.color = 'white';
				registerForm.reset();
				setTimeout( () => {
					localStorage.setItem('c-token-email', formData.get('email'));
					location.replace('verify-account.html');
				}, 3000)
			}
		})
		.catch(error => {
			register_preloader.style.display = 'none';
			console.error(error)
		})
	}
}

registerForm.addEventListener('submit', (event) => registerFormFunc(event));