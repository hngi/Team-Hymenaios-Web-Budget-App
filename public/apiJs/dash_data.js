
const dataExpencesSpot = document.querySelector('[data-expences-spot]');

const dataHighestSpot_1 = document.querySelector('[data-higest-spot_1]');
const dataMediumSpot_1 = document.querySelector('[data-medium-spot_1]');
const datalowestSpot_1 = document.querySelector('[data-lowest-spot_1]');

const dataHighestSpot_2 = document.querySelector('[data-higest-spot_2]');
const dataMediumSpot_2 = document.querySelector('[data-medium-spot_2]');
const datalowestSpot_2 = document.querySelector('[data-lowest-spot_2]');
let resStatus;

const getdashData = () => {
        const url = `${ baseUrl }api/total_xpences`;
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
        if(resStatus == 401) {
          dull = null;
            return reAuthenticate(dull);
        }
        return response.json()
    })
		.then(data => {
         if(data) {
            const {total_expences, highest_priority_percent, medium_priority_percent, lowest_priority_percent, } = data[0];

            const amount_total_expences = total_expences.substr(4, total_expences.length - 2)
            const currency = total_expences.slice(0, 3)

            let formatted_total_expences;
            if(currency == "NGN") {
                formatted_total_expences = `&#8358; ${amount_total_expences}`
            }else if (currency == "USD") {
                formatted_total_expences = `&#36; ${amount_total_expences}`
            }else if (currency == "EUR") {
                formatted_total_expences = `&euro; ${amount_total_expences}`
            }else if (currency == "GBR") {
                formatted_total_expences = `&#163; ${amount_total_expences}`
            }else {
                formatted_total_expences = '0.00';
            }

           dataExpencesSpot.innerHTML = formatted_total_expences;
           
           dataHighestSpot_1.innerHTML = highest_priority_percent;
           dataHighestSpot_2.innerHTML = highest_priority_percent;

           dataMediumSpot_1.innerHTML = medium_priority_percent;
           dataMediumSpot_2.innerHTML = medium_priority_percent;

           datalowestSpot_1.innerHTML = lowest_priority_percent;
           datalowestSpot_2.innerHTML = lowest_priority_percent;
         }

        })
		.catch(error => {
        console.error(error)
		})
}
getdashData();