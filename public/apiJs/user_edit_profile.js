const editAccountForm = document.querySelector('#editAccountForm');
const profile_preloader = document.querySelector('[data-editAccount-preloader]');
const changePassword = document.querySelector('#changePasswordForm');
const delUser = document.querySelector('#delAccountForm');

const editAccountFormFunc = (event) => {
	event.preventDefault();
	
	document.querySelectorAll('._err_msg')[0].textContent = "";	
	document.querySelectorAll('._err_msg')[1].textContent = "";	
    document.querySelectorAll('._err_msg')[2].textContent = "";	
    document.querySelectorAll('._err_msg')[3].textContent = "";	
	document.querySelectorAll('._err_msg')[4].textContent = "";	

	const formData = new FormData(editAccountForm);
	if (formData.get('username') == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "A username is required!";
	}else if(formData.get('first_name') == "") {
		document.querySelectorAll('._err_msg')[1].textContent = "First name is required!";	
	}else if(formData.get('last_name') == ""){
		document.querySelectorAll('._err_msg')[2].textContent = "Last name is required!";
	}else if(formData.get('dob') == "") {
		document.querySelectorAll('._err_msg')[3].textContent = "Date of birth is required!";	
	}else if(formData.get('bio') == ""){
		document.querySelectorAll('._err_msg')[4].textContent = "Bio is required!";
	}else {
		let status;
		profile_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			if(status == 401) {
			 	$('#editProfileModal').modal("toggle");
				console.log(status)
                return reAuthenticate(profile_preloader);
            }
			return response.json();
		}

		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/user/edit`;
		fetch(url, {
		 method: "PUT",
		 mode: "cors",
		 headers: {
             "Authorization": `${token}`,
		 	 "Content-Type": "application/json"
		 },
		 body: JSON.stringify(data)
		})
		.then(response => errorHandling(response))
		.then(data => {
        	if(data) {
        		console.log(data)
				profile_preloader.style.display = 'none';
				let title = 'Process Succesful';
					let msg = `Account Updated!`;
					let action   = 'Close!';
					Swal.fire({
					    title: `<b id="title">${title}</b>`,
					    width: 600,
					    padding: '3em',
					    background: 'none',
					    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
					    backdrop: `
						rgba(0,0,0,0.5)
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
						const {username, first_name, last_name, bio, dob} = data;
						msg = '';
						if(username) {
							msg +=`${username} <br>`;
						}else if (first_name){
							msg +=`${first_name} <br>`;
						}else if (last_name){
							msg +=`${last_name} <br>`;
						}else if (dob){
							msg +=`${dob} <br>`;
						}else if (bio){
							msg +=`${bio} <br>`;
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
						editAccountForm.reset();
						setTimeout( () => {
							localStorage.setItem('h-user-data', JSON.stringify(data));
						}, 3000)
					}
        	}
		})
		.catch(error => {
            profile_preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

editAccountForm.addEventListener('submit', (event) => editAccountFormFunc(event));




const changePasswordFormFunc = (event) => {
	event.preventDefault();
	
    document.querySelectorAll('._err_msg')[5].textContent = "";	
    document.querySelectorAll('._err_msg')[6].textContent = "";		

	const formData = new FormData(changePasswordForm);
    
    if(formData.get('old_password') == ""){
		document.querySelectorAll('._err_msg')[5].textContent = "Old password is required!";
	}else if(formData.get('password') == ""){
		document.querySelectorAll('._err_msg')[6].textContent = "Password is required!";
	}else {
		let status;
		profile_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			if(status == 401) {
			 	$('#editPasswordModal').modal("toggle");
				console.log(status)
                return reAuthenticate(profile_preloader);
            }
			return response.json();
		}

		let data = {
            "old_password": formData.get('old_password'),
            "password": formData.get('password')
        };

		const url = `${ baseUrl }api/password`;
		fetch(url, {
		 method: "PUT",
		 mode: "cors",
		 headers: {
             "Authorization": `${token}`,
		 	 "Content-Type": "application/json"
		 },
		 body: JSON.stringify(data)
		})
		.then(response => errorHandling(response))
		.then(data => {
       			if (data) {
					profile_preloader.style.display = 'none';
					let title = 'Proccess Successful';
						let msg = `Password Changed!`;
						let action   = 'Close!';
						Swal.fire({
						    title: `<b id="title">${title}</b>`,
						    width: 600,
						    padding: '3em',
						    background: 'none',
						    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
						    backdrop: `
							rgba(0,0,0,0.5)
							  `,
							confirmButtonText: `<span id="action">${action}</span>`
						})
						const title_field =document.querySelector('#title');
						const action_field =document.querySelector('#action');
						const error_field =document.querySelector('#error_field');
						if (status == 422) {
							title_field.style.color = 'tomato';
							action_field.style.color = 'white';
							error_field.style.color = 'tomato';
							title_field.innerHTML = 'Oops, an error just occured !';
							action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
							const {old_password, password} = data;
							msg = '';
							if (password){
								msg +=`${password} <br>`;
							}else if(old_password) {
			                    msg +=`${old_password} <br>`;
			                }

							error_field.innerHTML = msg;
						} else if (status == 402) {
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
							changePasswordForm.reset();
						}
       			}
		})
		.catch(error => {
            profile_preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

changePasswordForm.addEventListener('submit', (event) => changePasswordFormFunc(event));



const delUserFunc = (event) => {
	event.preventDefault();

		let status;
		profile_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			if(status == 401) {
			 	$('#deleteModal').modal("toggle");
                return reAuthenticate(profile_preloader);
            }
			return response.json();
		}

		const url = `${ baseUrl }api/user/delete`;
		fetch(url, {
		 method: "DELETE",
		 mode: "cors",
		 headers: {
             "Authorization": `${token}`,
		 	 "Content-Type": "application/json"
		 }
		})
		.then(response => errorHandling(response))
		.then(data => {
        console.log(data)
			if(data) {
				profile_preloader.style.display = 'none';
				let title = 'Proccess Successful';
					let msg = `Account Delete!`;
					let action   = 'Close!';
					Swal.fire({
					    title: `<b id="title">${title}</b>`,
					    width: 600,
					    padding: '3em',
					    background: 'none',
					    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
					    backdrop: `
						rgba(0,0,0,0.5)
						  `,
						confirmButtonText: `<span id="action">${action}</span>`
					})
					const title_field =document.querySelector('#title');
					const action_field =document.querySelector('#action');
					const error_field =document.querySelector('#error_field');
				     if (status == 501) {
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
		                setTimeout( () => {
							localStorage.removeItem('h-user-data');
		                    location.href=location.origin;
						}, 1000)
					}
			}
		})
		.catch(error => {
            profile_preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}

    delUser.addEventListener('submit', (event) =>  delUserFunc(event));

