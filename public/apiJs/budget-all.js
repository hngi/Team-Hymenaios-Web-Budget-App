
let allBudgets = [];
let resStatus;


const getAllBudgetApi = () => {
        const url = `${ baseUrl }api/budget/all`;
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
                const dataPreloader = document.querySelector('[data-preloader-global]');
                return reAuthenticate(dataPreloader);
            }
            return response.json()
        })
		.then(data => {
            allBudgets = [];
            allBudgets.push(...data[0].budget);
            showAllBudget()
        })
		.catch(error => {
            console.error(error)
			console.error(error.status)
		})
}

const showAllBudget = () => {
const budgetList = document.querySelector('[data-budget-list]')
    if(allBudgets != []) {
        console.log(allBudgets)
        budgetList.innerHTML = '';
        allBudgets.map((budget, i) => {
            
            console.log(budget);
            const {id, owner_id, title,description, created_at, items_count, budget_amount} = budget;

            const amount_budget_amount = budget_amount.substr(4, budget_amount.length - 2)
            const currency = budget_amount.slice(0, 3)

            if(currency == "NGN") {
                formatted_budget_amount = `&#8358; ${amount_budget_amount}`
            }else if (currency == "USD") {
                formatted_budget_amount = `&#36; ${amount_budget_amount}`
            }else if (currency == "EUR") {
                formatted_budget_amount = `&euro; ${amount_budget_amount}`
            }else if (currency == "GBR") {
                formatted_budget_amount = `&#163; ${amount_budget_amount}`
            }

            budgetList.innerHTML += `
                <div class="col-12 budget border row mx-0 mt-3 px-0">
                    <span id="id_take" style="display:none">${id}</span>
                    <div class="col-12 col-lg-2 budget-image text-center">
                         <img class="mt-3" src="../images/43016.png" alt="">
                    </div>
                    <div class="col-12 col-lg-10 row mx-0">
                    <div class="col-8 budget-name">
                        <span>${title}</span>
                    </div>
                    <div class="col-4 delete-budget px-0 text-right" style="cursor: pointer;">
                        <i style="margin-right:10px;" data-edit-id="${id}" class="far fa-edit edit_budget" class="btn btn-primary" data-toggle="modal"
                        data-target="#editBudgetModal"></i>
                        <a  style="margin-right:10px;" href="${window.location.origin}/dashboard/items-edit.html?id=${id}&budget=${title}&amount=${formatted_budget_amount}"><i class="fas fa-eye"></i></a>
                        <i  style="margin-right:10px;" data-del-id=${id} class="fas fa-times-circle del_budget"></i>
                    </div>
                    <div class="col-12 budget-desc">
                        <span>${description}</span>
                    </div>
                    <div class="col-12 budget-info mb-2 row mx-0">
                        <div class="col-12 col-sm budget-info-pill mt-2 px-0 text-center items-count border mx-2">
                        <span>${items_count} items</span>
                        </div>
                        <div class="col-12 col-sm budget-info-pill mt-2 px-0 text-center budget-total border mx-2">
                        <span>${formatted_budget_amount}</span>
                        </div>
                        <div class="col-12 col-sm budget-info-pill mt-2 px-0 text-center budget-status border mx-2">
                        <span class="negative-value">-$500</span>
                        </div>
                    </div>
                    </div>
                </div>   
            `;

        })

        //Edit Budget
        const editBudgets = Array.from(document.querySelectorAll('.edit_budget'));
        const budgetDismantle = (event, editBudget) => {
            const edit_id = editBudget.dataset.editId
            document.querySelector('[data-budget-edit-id]').innerHTML = edit_id;
        }

        editBudgets.map((editBudget, i) => {
            editBudget.addEventListener('click', (event) => budgetDismantle(event, editBudget));
        })

        //Delete Budget
        const delBudgets = Array.from(document.querySelectorAll('.del_budget'));
                      
            const deleteBudget = (event, delBudget) => {
                event.preventDefault();
                const del_id = delBudget.dataset.delId  
                console.log(del_id)
                const url = `${ baseUrl }api/budget/${del_id}/recycle`;
                fetch(url, {
                method: "PUT",
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
                        let dull = null;
                        return reAuthenticate(dull);
                    }
                    return response.json()
                })
                .then(data => {
                    location.replace('budget-edit.html');
                })
                .catch(error => {
                    preloader.style.display = 'none';
                    console.error(error)

                })
            }
        delBudgets.map((delBudget, i) => {
            delBudget.addEventListener('click', (event) => deleteBudget(event, delBudget));
        })
    


    }else {
        budgetList.innerHTML += `<p style="text-align:center;">No budget created yet! </p>`;
    }
}

getAllBudgetApi();

