//Logout User
const logOutBtn = document.querySelector('[data-logout]')
const logOut = () => {
    localStorage.removeItem('h-user-data');
    location.href=location.origin;
}

logOutBtn.addEventListener('click', (event) => logOut(event));

//Read Recycle Counter

const recycleCounter = () => {
	const url = `${ baseUrl }api/recycled/count`;
		fetch(url, {
		 method: "GET",
		 mode: "cors",
		 headers: {
             "Authorization": `${token}`,
		 	 "Content-Type": "application/json"
		 }
		})
		.then(response => {
			resStatus = response.status;
            console.log(resStatus);
            if(resStatus == 401) {
                dull = null;
                return reAuthenticate(dull);
            }
			return response.json()
		})
		.then(data => {
			console.log(data)
			const {recycle_count} = data;
			console.log(recycle_count)
			if(recycle_count > 0) {
				document.querySelector('#recycle_counter').style.visibility = 'visible';
				document.querySelector('#recycle_counter').innerHTML = recycle_count;
			}
		})
		.catch(error => console.error(error))
}

recycleCounter();