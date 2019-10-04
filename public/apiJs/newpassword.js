let newPwdFormBtn = document.querySelector("#newPwdFormBtn")
const tokenInput = document.querySelector("#new_token");
const pwdInput = document.querySelector("#new_password");
const resetStatus = document.querySelector('#reset_status');

newPwdFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newPwdFormBtn.setAttribute('disabled', '')
    data = {
        'verifycode': tokenInput.value,
        'password' : pwdInput.value
    }
    const url = `${ baseUrl }api/password/change`;
    let status;
    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers : {
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
        console.log(status);
        if (status == 200){
            $('#passwordResetModal').modal('toggle')
            resetStatus.innerHTML = `${data.data.message}`

            var delayInMilliseconds = 3000; //1 second

                setTimeout(function () {
                    location.replace('login.html')
                }, delayInMilliseconds);
        }
        if(status == 422) {
            $('#passwordResetModal').modal('toggle')
            resetStatus.innerHTML = `${data.data.message}`
        }
        if(status == 401) {
            $('#passwordResetModal').modal('toggle')
            resetStatus.innerHTML = `${data.data.message}`
        }
        if(status == 500) {
            $('#passwordResetModal').modal('toggle')
            resetStatus.innerHTML = `${data.data.message}`
        }
    })
    .catch(error => console.error(error))
})