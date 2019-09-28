const createItemForm = document.querySelector('#addItemForm');
const preloader = document.querySelector('[data-preloader]');
const editItemForm = document.querySelector('#editItemForm');

const createItemFormFunc = (event) => {
	event.preventDefault();
	document.querySelectorAll('._err_msg')[0].textContent = "";	
	document.querySelectorAll('._err_msg')[1].textContent = "";	
	
	const formData = new FormData(createItemForm);
	if (formData.get('title') == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "Title is required!";
	}else if(formData.get('amount') == "") {
		document.querySelectorAll('._err_msg')[1].textContent = "Amount is required!";	
	}else {
		let status;
		preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			return response.json();
		}
        console.log(formData.get('currency'));
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/item/${budget_id}/create`;
		fetch(url, {
		 method: "POST",
		 mode: "cors",
		 headers: {
             "Authorization": `${token}`,
		 	 "Content-Type": "application/json"
		 },
		 body: JSON.stringify(data)
		})
		.then(response => errorHandling(response))
		.then(data => {
		preloader.style.display = 'none';
		let title = 'Process Succesful';
			let msg = `Item Created!`;
			let action   = 'Close!';
			Swal.fire({
			    title: `<b id="title">${title}</b>`,
			    width: 600,
			    padding: '3em',
			    background: 'none',
			    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
			    backdrop: `
				    rgba(0,0,123,0.4)
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
				const {title, currency, amount, description, error} = data;
				msg = '';
				if(title) {
					msg +=`${title} <br>`;
				}else if (currency){
					msg +=`${currency} <br>`;
				}else if (amount){
					msg +=`${amount} <br>`;
				}else if (error){
					msg +=`${error} <br>`;
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
				createItemForm.reset();
				location.replace(`Items-edit.html?id=${budget_id}`);
			}
		})
		.catch(error => {
            preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

createItemForm.addEventListener('submit', (event) => createItemFormFunc(event));  


const editItemFormFunc = (event) => {
	event.preventDefault();
	document.querySelectorAll('._err_msg')[2].textContent = "";	
	document.querySelectorAll('._err_msg')[3].textContent = "";	
	const item_id = document.querySelector('[data-item-edit-id]').innerHTML;
	
	const formData = new FormData( editItemForm);
	if (formData.get('title') == "") {
		document.querySelectorAll('._err_msg')[2].textContent = "Title is required!";
	}else if(formData.get('amount') == "") {
		document.querySelectorAll('._err_msg')[3].textContent = "Amount is required!";	
	}else {
		let status;
		preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			return response.json();
		}
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/budget/${budget_id}/${item_id}/edit`;
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
        console.log(data)
		preloader.style.display = 'none';
		let title = 'Process Succesful';
			let msg = `Item Updated!`;
			let action   = 'Close!';
			Swal.fire({
			    title: `<b id="title">${title}</b>`,
			    width: 600,
			    padding: '3em',
			    background: 'none',
			    html: `<p id="error_field" style="font-weight:bold;">${msg}</p>`,
			    backdrop: `
				    rgba(0,0,123,0.4)
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
				const {title, currency, amount, error} = data;
				msg = '';
				if(title) {
					msg +=`${title} <br>`;
				}else if (currency){
					msg +=`${currency} <br>`;
				}else if (amount){
					msg +=`${amount} <br>`;
				}else if (error){
					msg +=`${error} <br>`;
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
				editItemForm.reset();
				location.replace(`item-edit.html?id=${budget_id}`);
			}
		})
		.catch(error => {
            preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

editItemForm.addEventListener('submit', (event) => editItemFormFunc(event));  

