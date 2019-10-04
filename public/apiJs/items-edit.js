const createItemForm = document.querySelector('#addItemForm');
const preloader = document.querySelector('[data-preloader]');
const editItemForm = document.querySelector('#editItemForm');

const sendReportBtn = document.querySelector('#send_report_btn');

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
			$("#addItemModal").modal("toggle")
			if(status == 401) {
                return reAuthenticate(preloader);
            }
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
			if(data) {
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
					createItemForm.reset();
					setTimeout( () => {
					location.replace(`items-edit.html?id=${budget_id}&budget=${budget_title}&amount=${budget_amt}`);
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
			if(status == 401) {
				$("#editItemModal").modal("toggle")
                return reAuthenticate(preloader);
            }
			return response.json();
		}
		let data = {};

		for (const [key, value]  of formData.entries()) {
		    data[key] = value;
		}

		const url = `${ baseUrl }api/item/${budget_id}/${item_id}/edit`;
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
					editItemForm.reset();
					setTimeout( () => {
							location.replace(`items-edit.html?id=${budget_id}&budget=${budget_title}&amount=${budget_amt}`);
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

editItemForm.addEventListener('submit', (event) => editItemFormFunc(event));  


const reportTo = (event) => {
	event.preventDefault();
	const btn = event.target || event.srcElement;
	document.querySelector('#_err_msg_mail').textContent = "please seperate emails with a comma sign!";
	btn.setAttribute('disabled', "");
	preloader.style.display = 'block';

	//Validate Input
	const get_emails = document.querySelector('#emails_to').value;
	if (get_emails == '') {
		preloader.style.display = 'none';
		btn.removeAttribute('disabled');
		document.querySelector('#_err_msg_mail').textContent = "Emails are required!";
		return false;
	}
	let emails = get_emails.split(',');
	if(emails.length > 5) {
		preloader.style.display = 'none';
		btn.removeAttribute('disabled');
		document.querySelector('#_err_msg_mail').textContent = "Please send 5 mails at a time!";
		return false;
	}
	   re = /([a-z0-9A-Z@.])/;
	   emails = emails.map(function (x, i) {
	   		if (!re.test(x)){
	   			preloader.style.display = 'none';
				btn.removeAttribute('disabled');
				document.querySelector('#_err_msg_mail').textContent = `The ${i+1} email is invalid!`;
				return false;
	   		}
            return {
                "email": x
            }
        });
	   console.log(emails)
	   var settings = {
            "url": `${ baseUrl }api/mail/report/${budget_id}`,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization":token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "emails": emails
            }
        };
        console.log(settings);
	     $.ajax(settings).done(function (response) {
	     	preloader.style.display = 'none';
			console.log(response);
			btn.removeAttribute('disabled', "");
			$('.report_status').html("The budget has been sent to all emails")
			$('#allocated').modal('toggle')
			$('#EmailReportModal').modal('toggle')
			$('#reportStatusModal').modal('toggle')
        }).fail(function (err) {
        	preloader.style.display = 'none';
           if (err)
		    {
				console.error(err);
				console.log(err.status)
		        preloader.style.display = 'none';
		       if(err.status == 401) {
		       	  $("#EmailReportModal").modal("toggle")
		          return reAuthenticate(preloader);
		       }
		       if(err.status == 422) {
				btn.removeAttribute('disabled', "");
				$('.report_status').html("Incorrect email format")
				$('#allocated').modal('toggle')
				$('#EmailReportModal').modal('toggle')
				$('#reportStatusModal').modal('toggle')
		       }
		    }
        });

}
sendReportBtn.addEventListener('click', (event) => reportTo(event));