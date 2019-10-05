
const calcWork = document.querySelector('[data-calc-work]');
let allocatedItems = [];
let not_allocatedItems = [];
let tip;
const getCalcItemsApi = (event) => {
    event.preventDefault();
        const url = `${ baseUrl }api/calculate/${budget_id}`;
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
                $("#allocated").modal("toggle")
                dull = null;
                return reAuthenticate(dull);
            }
            return response.json()
        })
		.then(data => {
            if(data) {
                console.log(data)
                allocatedItems = [];
                not_allocatedItems = [];
                allocatedItems.push(...data.allocated);
                not_allocatedItems.push(...data.not_allocated);
                calculatedResult(data.low_budget)
            }
        
        })
		.catch(error => {
            console.error(error)
			console.error(error.status)
		})
}

const calculatedResult = (low_budget) => {
const allocatedList = document.querySelector('[data-allocated-list]')
const not_allocatedList = document.querySelector('[data-not_allocated-list]')
    if(allocatedItems.length != 0) {
        allocatedList.innerHTML = '';
        allocatedItems.map((item, i) => {
            
            const {id, budget_id, category, priority, title, description, created_at, item_amount} = item;

            const amount_item_amount = item_amount.substr(4, item_amount.length - 2)
            const currency = item_amount.slice(0, 3);

            if(currency == "NGN") {
                formatted_item_amount = `&#8358; ${amount_item_amount }`
            }else if (currency == "USD") {
                formatted_item_amount = `&#36; ${amount_item_amount }`
            }else if (currency == "EUR") {
                formatted_item_amount = `&euro; ${amount_item_amount }`
            }else if (currency == "GBR") {
                formatted_item_amount = `&#163; ${amount_item_amount }`
            }

           
            allocatedList.innerHTML += `
                <li class="budget-item" style="list-style:none;">
                    <div id="cal_border-design${id}" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <span class="list-edit list-item">${title} :</span>
                            <span class="list-edit list-amount amount_allocated">${formatted_item_amount}</span>
                            </div>
                            <div name="comments" rows="4"
                            class="list-edit list-description">${description}</div>
                            <ul class="list-label-list">
                            <li class="list-label-item normal-label" style="color:black;">${i +1}</li>
                            <li class="list-label-item normal-label">${category}</li>
                            <li id="cal_border-design_2${id}" class="prior list-label-item important-priority-label">${priority}</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </li>
            `;
                const cal_borderDesign = document.querySelector(`#cal_border-design${id}`);
                const cal_borderDesign_2 = document.querySelector(`#cal_border-design_2${id}`);
                if(priority == "Highest"){
                    console.log(priority)
                    cal_borderDesign.classList.add('border-left-primary')
                    cal_borderDesign_2.classList.add('bg-primary')
                }else if(priority == "Medium") {
                    cal_borderDesign.classList.add('border-left-warning')
                    cal_borderDesign_2.classList.add('bg-warning')
                }else if (priority == "Lowest"){
                    cal_borderDesign.classList.add('border-left-danger')
                    cal_borderDesign_2.classList.add('bg-danger')
                }
        })

    }else {
        allocatedList.innerHTML = `<p style="text-align:center;">Nothing to calculate! </p>`;
    }

    //////////////////////////////////////////////////////////////
    if(not_allocatedItems.length != 0) {
        not_allocatedList.innerHTML = '';
        not_allocatedItems.map((item, i) => {
            
            const {id, budget_id, category, priority, title, description, created_at, item_amount} = item;

            const amount_item_amount = item_amount.substr(4, item_amount.length - 2)
            const currency = item_amount.slice(0, 3);
           
            if(currency == "NGN") {
                formatted_item_amount = `&#8358; ${amount_item_amount }`
                tip = `&#8358;`
            }else if (currency == "USD") {
                formatted_item_amount = `&#36; ${amount_item_amount }`
                tip = `&#36;`
            }else if (currency == "EUR") {
                formatted_item_amount = `&euro; ${amount_item_amount }`
                tip = `&euro;`
            }else if (currency == "GBR") {
                formatted_item_amount = `&#163; ${amount_item_amount }`
                tip = `&#163;`
            }

           
            not_allocatedList.innerHTML += `
                <li class="budget-item" style="list-style:none;">
                    <div id="cal_not_border-design${id}" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <span class="list-edit list-item">${title} :</span>
                            <span class="list-edit list-amount not_amount_allocated">${formatted_item_amount}</span>
                            </div>
                            <div name="comments" rows="4"
                            class="list-edit list-description">${description}</div>
                            <ul class="list-label-list">
                            <li class="list-label-item normal-label" style=" color:black;">${i+1}</li>
                            <li class="list-label-item normal-label">${category}</li>
                            <li id="cal_not_border-design_2${id}" class="na_prior list-label-item important-priority-label">${priority}</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </li>
            `;
                const cal_not_borderDesign = document.querySelector(`#cal_not_border-design${id}`);
                const cal_not_borderDesign_2 = document.querySelector(`#cal_not_border-design_2${id}`);
                if(priority == "Highest"){
                    console.log(priority)
                    cal_not_borderDesign.classList.add('border-left-primary')
                    cal_not_borderDesign_2.classList.add('bg-primary')
                }else if(priority == "Medium") {
                    cal_not_borderDesign.classList.add('border-left-warning')
                    cal_not_borderDesign_2.classList.add('bg-warning')
                }else if (priority == "Lowest"){
                    cal_not_borderDesign.classList.add('border-left-danger')
                    cal_not_borderDesign_2.classList.add('bg-danger')
                }
        })

    }else {
        not_allocatedList.innerHTML = `<li style="text-align:center;">All items are allocated! </li>`;
    }
    if(low_budget.length != 0) {
        document.querySelector('[data-low-budget_1]').innerHTML = `Allocation skipped for item (${low_budget[0][0]}) with amount (${tip} ${low_budget[0][1]}) due to a low budget amount (${tip} ${low_budget[0][2]})`;
        document.querySelector('[data-low-budget_2]').innerHTML = `Allocation skipped for item (${low_budget[0][0]}) with amount (${tip} ${low_budget[0][1]}) due to a low budget amount (${tip} ${low_budget[0][2]})`;
    }

}
calcWork.addEventListener('click', (event) => getCalcItemsApi(event));



