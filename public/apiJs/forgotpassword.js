let fgpwFormBtn = document.querySelector("#forgotPasswordFormBtn")
const emailInput = document.querySelector("[data-email]");
const resetStatus = document.querySelector('#reset_status');

fgpwFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordFormBtn.setAttribute('disabled', '')
    data = {
        'email': emailInput.value
    }
    console.log(JSON.stringify(data))
    const url = `${baseUrl}api/password/reset`;
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            status = response.status
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (status == 200) {
                $('#forgotPasswordModal').modal('toggle')
                resetStatus.innerHTML = `${data.data.message}`
                var delayInMilliseconds = 3000; //1 second

                setTimeout(function () {
                    location.replace('newpassword.html')
                }, delayInMilliseconds);
            }
            if (status == 401) {
                $('#forgotPasswordModal').modal('toggle')
                resetStatus.innerHTML = `${data.data.message}`
                forgotPasswordFormBtn.removeAttribute('disabled')
            }
            if (status == 404) {
                $('#forgotPasswordModal').modal('toggle')
                resetStatus.innerHTML = `${data.data.message}`
                forgotPasswordFormBtn.removeAttribute('disabled')
            }
            if (status == 422) {
                $('#forgotPasswordModal').modal('toggle')
                resetStatus.innerHTML = `${JSON.stringify(data.email)}`
                forgotPasswordFormBtn.removeAttribute('disabled')
            }
            if (status == 500) {
                $('#forgotPasswordModal').modal('toggle')
                resetStatus.innerHTML = `${data.data.message}`
                forgotPasswordFormBtn.removeAttribute('disabled')
            }
        })
        
        .catch(error => console.error(error))
})