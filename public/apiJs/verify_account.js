console.log('blah')
const token_to_email =  localStorage.getItem('c-token-email');

const  verifyCodeMsg = document.querySelector('[data-verify-code-msg]')
verifyCodeMsg.textContent = `We have sent a pin to ${token_to_email}. Please confirm your email.`;

//Verify Api
//GEt the input
const verifyAccount = document.querySelector('[data-verify]');
const register_preloader = document.querySelector('[data-register-preloader]');
//Get the btn
const verifyBtn = document.querySelector('#verifyBtn');


const verifyAccountFunc = (event) => {
	event.preventDefault();
	
	document.querySelectorAll('._err_msg')[0].textContent = "";	

	const verifycode = verifyAccount.value;
	if (verifycode == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "A verification code is required!";
	}else {
		let status;
		register_preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			return response.json();
		}

		let data = {};
		data['verifycode'] = verifycode;

		const url = `${ baseUrl }api/user/verify`;
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
			console.log(data)
		register_preloader.style.display = 'none';
		let title = 'Verification Succesful';
            let action   = 'Close';
            data.verified == 'Done' ? location.replace('login.html') : null;
			Swal.fire({
			    title: `<b id="title">${title}</b>`,
			    width: 600,
			    padding: '3em',
			    background: 'none',
			    html: `<p id="error_field" style="font-weight:bold;"></p>`,
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
				const {verifycode} = data;
				error_field.innerHTML = verifycode;
			} else if (status == 400) {
				title_field.style.color = 'tomato';
				action_field.style.color = 'white';
				error_field.style.color = 'tomato';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
				error_field.innerHTML = 'An Unexpected error occured, please try again!';
			}else if (status == 409) {
				title_field.style.color = 'tomato';
				action_field.style.color = 'white';
				error_field.style.color = 'tomato';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
			    const {message} = data;
			    console.log(message)
				error_field.innerHTML = message;
			}else{
				title_field.style.color = 'lime';
				action_field.style.color = 'white';
				error_field.style.color = 'white';
				setTimeout( () => {
					localStorage.setItem('h-user-data', JSON.stringify(data));
					location.replace('dashboard/profile.html');
				}, 3000)
			}
		})
		.catch(error => {
			register_preloader.style.display = 'none';
			console.error(error)
		})
	}
}

verifyBtn.addEventListener('click', (event) => verifyAccountFunc(event));