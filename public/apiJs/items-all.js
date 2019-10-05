
let allItems = [];
let resStatus;

const getAllItemsApi = () => {
        const url = `${ baseUrl }api/items/${budget_id}`;
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
                const dataPreloader = document.querySelector('[data-preloader-global]');
                return reAuthenticate(dataPreloader);
            }
            return response.json()
        })
		.then(data => {
            if(data) {
                allItems = [];
                allItems.push(...data[0].items);
                showAllItems()
            }
        })
		.catch(error => {
            console.error(error)
			console.error(error.status)
		})
}

const showAllItems = () => {
const itemsList = document.querySelector('[data-item-list]')
    if(allItems != []) {
        itemsList.innerHTML = '';
        allItems.map((items, i) => {
            
            console.log(items);
            const {id, budget_id, category, owner_id, priority, title, description, created_at, item_amount} = items;

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

           
            itemsList.innerHTML += `
                <li class="budget-item">
                    <div id="border-design${id}" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <span class="list-edit list-item">${title} :</span>
                            <span class="list-edit list-amount">${formatted_item_amount}</span>
                            <span class="delete-budget px-0 text-right" style="cursor: pointer; float: right">
                                <i style="margin-right:10px; font-size: 15px;" data-edit-id="${id}" data-budget-id="${budget_id}" class="far fa-edit edit_item" class="btn btn-primary" data-toggle="modal"
                                data-target="#editItemModal"></i>
                                <i  style="margin-right:10px; font-size: 15px;" data-del-id=${id} class="fas fa-times-circle del_item"></i>
                            </span>
                            </div>
                            <div name="comments" rows="4"
                            class="list-edit list-description">${description}</div>
                            <ul class="list-label-list">
                            <li class="list-label-item normal-label" style="color:black;">${i}</li>
                            <li class="list-label-item normal-label">${category}</li>
                            <li id="border-design_2${id}" class="list-label-item important-priority-label">${priority}</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </li>
            `;
                const borderDesign = document.querySelector(`#border-design${id}`);
                const borderDesign_2 = document.querySelector(`#border-design_2${id}`);
                if(priority == "Highest"){
                    console.log(priority)
                    borderDesign.classList.add('border-left-primary')
                    borderDesign_2.classList.add('bg-primary')
                }else if(priority == "Medium") {
                    borderDesign.classList.add('border-left-warning')
                    borderDesign_2.classList.add('bg-warning')
                }else if (priority == "Lowest"){
                    borderDesign.classList.add('border-left-danger')
                    borderDesign_2.classList.add('bg-danger')
                }
        })
        
        //Edit item
        const editItems = Array.from(document.querySelectorAll('.edit_item'));
        const itemDisMantle = (event, item) => {
            event.preventDefault();
            const edit_id = item.dataset.editId
            document.querySelector('[data-item-edit-id]').innerHTML = edit_id;
        }

        editItems.map((item, i) => {
            item.addEventListener('click', (event) => itemDisMantle(event, item));
        })

        //Delete item
        const delItems = Array.from(document.querySelectorAll('.del_item'));
                      
            const deleteItem = (event, delitem) => {
                event.preventDefault();
                const del_id = delitem.dataset.delId  
                console.log(del_id)
                const url = `${ baseUrl }api/item/${del_id}/delete`;
                fetch(url, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json"
                }
                })
                .then(response => {
                    resStatus = response.status;
                    if(resStatus == 401) {
                        let dull = null;
                        return reAuthenticate(dull);
                    }
                    return response.json()
                })
                .then(data => {
                    if(data) {
                    location.replace(`items-edit.html?id=${budget_id}&budget=${budget_title}&amount=${budget_amt}`);
                    }
                })
                .catch(error => {
                    preloader.style.display = 'none';
                    console.error(error)

                })
            }
        delItems.map((delItem, i) => {
            delItem.addEventListener('click', (event) => deleteItem(event, delItem));
        })
    


    }else {
        budgetList.innerHTML += `<p style="text-align:center;">No budget created yet! </p>`;
    }
}

getAllItemsApi();

