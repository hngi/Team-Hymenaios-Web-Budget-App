const createBudgetForm = document.querySelector('#addBudgetForm');
const preloader = document.querySelector('[data-preloader]');
const editBudgetForm = document.querySelector('#editBudgetForm');
// const delUser = document.querySelector('#delAccountForm');
const addTotalIncomeForm = document.querySelector('#addTotalIncomeForm');
total_income == null ? $("#addIncomeModal").modal("toggle"): null;


const createBudgetFormFunc = (event) => {
	event.preventDefault();
	if(total_income == null){
				$("#addBudgetModal").modal("toggle")
		return $("#addIncomeModal").modal("toggle");
	}
	document.querySelectorAll('._err_msg')[0].textContent = "";	
	document.querySelectorAll('._err_msg')[1].textContent = "";	
	
	const formData = new FormData(createBudgetForm);
	if (formData.get('title') == "") {
		document.querySelectorAll('._err_msg')[0].textContent = "Title is required!";
	}else if(formData.get('amount') == "") {
		document.querySelectorAll('._err_msg')[1].textContent = "Amount is required!";	
	}else {
		let status;
		preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			 if(status == 401) {
			 	$('#addBudgetModal').modal("toggle");
				console.log(status)
                return reAuthenticate(preloader);
            }
			return response.json();
		}
        console.log(formData.get('currency'));
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/budget/create`;
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
        console.log(data)
        if(data) {
        	preloader.style.display = 'none';
		let title = 'Process Succesful';
			let msg = `Budget Created!`;
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
				createBudgetForm.reset();
				setTimeout( () => {
				location.replace('budget-edit.html');
				}, 2000)
				
			}
        }
		
		})
		.catch(error => {
            preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

createBudgetForm.addEventListener('submit', (event) => createBudgetFormFunc(event));  




const addTotalIncomeFormFunc = (event) => {
	event.preventDefault();
	
	document.querySelectorAll('._err_msg')[4].textContent = "";	
	
	const formData = new FormData(addTotalIncomeForm);
	if (formData.get('total_income') == "") {
		document.querySelectorAll('._err_msg')[4].textContent = "Title is required!";
	}else {
		let status;
		preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			if(status == 401) {
			 	$('#addIncomeModal').modal("toggle");
                return reAuthenticate(preloader);
            }
			return response.json();
		}
        console.log(formData.get('currency'));
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/total_income   `;
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
        if(data) {
        	preloader.style.display = 'none';
		let title = 'Process Succesful';
			let msg = `Total Income Updated!`;
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
				const {currency, total_income} = data;
				msg = '';
				if(currency) {
					msg +=`${currency} <br>`;
				}else if (total_income){
					msg +=`${total_income} <br>`;
				}

				error_field.innerHTML = msg;
			} else if (status == 501) {
				title_field.style.color = 'red';
				action_field.style.color = 'white';
				error_field.style.color = 'red';
				title_field.innerHTML = 'Oops, an error just occured !';
				action_field.innerHTML = '<i class="fa fa-thumbs-down"></i>Try again !';
				error_field.innerHTML = 'An Unexpected error occured, please try again!';
			}else{
				title_field.style.color = 'lime';
				action_field.style.color = 'white';
				error_field.style.color = 'white';
				createBudgetForm.reset();
				setTimeout( () => {
					localStorage.setItem('h-user-data', JSON.stringify(data));
					location.href = `${location.origin}/dashboard/budget-edit.html`;
				}, 2000)
			}
        }
		
		})
		.catch(error => {
            preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

addTotalIncomeForm.addEventListener('submit', (event) => addTotalIncomeFormFunc(event));






const editBudgetFormFunc = (event) => {
	event.preventDefault();
	if(total_income == null){
				$("#addBudgetModal").modal("toggle")
		return $("#addIncomeModal").modal("toggle");
	}
	document.querySelectorAll('._err_msg')[2].textContent = "";	
	document.querySelectorAll('._err_msg')[3].textContent = "";	
	const budget_id = document.querySelector('[data-budget-edit-id]').innerHTML;
	
	const formData = new FormData(editBudgetForm);
	if (formData.get('title') == "") {
		document.querySelectorAll('._err_msg')[2].textContent = "Title is required!";
	}else if(formData.get('amount') == "") {
		document.querySelectorAll('._err_msg')[3].textContent = "Amount is required!";	
	}else {
		let status;
		preloader.style.display = 'block';
		const errorHandling = (response) => {
			status = response.status;
			if(status == 401) {
			 	$('#editBudgetModal').modal("toggle");
                return reAuthenticate(preloader);
            }
			return response.json();
		}
        console.log(formData.get('currency'));
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/budget/${budget_id}/edit`;
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
        if(data) {
        	preloader.style.display = 'none';
		let title = 'Process Succesful';
			let msg = `Budget Updated!`;
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
				editBudgetForm.reset();
				setTimeout( () => {
					location.replace('budget-edit.html');
				}, 3000)
			}
        }
		
		})
		.catch(error => {
            preloader.style.display = 'none';
            console.error(error)
			console.error(error.status)
		})
	}
}

editBudgetForm.addEventListener('submit', (event) => editBudgetFormFunc(event));  


