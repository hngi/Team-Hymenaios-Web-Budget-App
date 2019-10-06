let fgpwFormBtn = document.querySelector("#forgotPasswordFormBtn")
const emailInput = document.querySelector("[data-email]");
const resetStatus = document.querySelector('#reset_status');
const login_preloader = document.querySelector('[data-login-preloader]');


fgpwFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    login_preloader.style.display = 'block';
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
            login_preloader.style.display = 'none';
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
        
        .catch(error => {
            login_preloader.style.display = 'none';
            console.error(error)
        })
})