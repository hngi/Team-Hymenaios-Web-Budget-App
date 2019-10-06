const loginForm = document.querySelector('#loginForm');
const login_preloader = document.querySelector('[data-login-preloader]');


const loginFormFunc = (event) => {
	event.preventDefault();
	
	document.querySelectorAll('._err_msg')[0].textContent = "";	
	document.querySelectorAll('._err_msg')[1].textContent = "";	

	const formData = new FormData(loginForm);
	if(formData.get('email') == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "A valid email is required!";	
	}else if(formData.get('password') == ""){
		document.querySelectorAll('._err_msg')[1].textContent = "A secured password is required!";
	}else { 
		let status;
		login_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			return response.json();
		}

		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}
		localStorage.setItem('re_auth', JSON.stringify(data));
		const url = `${ baseUrl }api/user/login`;
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
            login_preloader.style.display = 'none';
		    const flashAlert = (path) => {
				Swal.fire({
				    title: `<b id="title"></b>`,
				    width: 600,
				    padding: '3em',
				    background: 'none',
				    html: `<p id="error_field" style="font-weight:bold;"></p>`,
				    backdrop: `
					rgba(0,0,0,0.5)
					  `,
					confirmButtonText: `<span id="action"></span>`
				})
				const title_field =document.querySelector('#title');
				const action_field =document.querySelector('#action');
				const error_field =document.querySelector('#error_field');
				title_field.style.color = 'tomato';
				action_field.style.color = 'white';
				error_field.style.color = 'tomato';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
				if (path == 0) {
					console.log(data)
					data.map((err, i) => {
					error_field.innerHTML +=`Error ${i}:${err.msg} <br>`;
					})
				}else if(path == 1) {
					error_field.innerHTML = data.message;
				}
		    }
			if (status == 422) {
				flashAlert(path = 0);	
			} else if (status == 404 || status == 401) {
				flashAlert(path = 1);
			}else{
				console.log(data)
				localStorage.setItem('re_auth_permission', 0);
				localStorage.setItem('h-user-data', JSON.stringify(data));
				location.replace(`${window.location.origin}/dashboard/profile.html`)
			}
		})
		.catch(error => {
			login_preloader.style.display = 'none';
			console.error(error)
		})
	}
}

loginForm.addEventListener('submit', (event) => loginFormFunc(event));