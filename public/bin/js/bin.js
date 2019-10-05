// this part will call the APIs
// unfortunately, rubbie wrote this shit :D

const base_url = "https://budget-calculator-app-api.herokuapp.com/";
const trash_list = document.getElementById('budget-list');

const append_to_trash = (data) =>{
	
	var budget_title = $("<h4 class='budget-title'></h4>").text(data["title"]);
	var descr = $("<p class='budget-descr'></p>").text(data["description"]);
	var restore = $("<a class='btn btn-primary' href='#'></a>").text("Restore");
	var del = $("<a href='#' class='btn btn-danger'></a>").text("Delete");
	var div = $("<div class='container'></div>");
	var li = $("<li class='budget'></li>");

	$(restore).on("click", function(){
		restore_trash(data["id"], data["owner_id"]);
	});

	$(del).on("click", function(){
		delete_trash(data["id"], data["owner_id"]);
	});

	$(div).append(budget_title, descr, restore, del);
	$(li).append(div);
	$(trash_list).append(li);

}

const delete_trash = (id, owner_id) =>{
	const delete_url = `${ base_url }api/budget/${id}/delete`;
	fetch(delete_url, {method: "DELETE", mode: "cors", headers:{"Authorization": `${token}`, "Content-Type": "application/json"}})
	.then(response => response.json())
	.then(data => {
		// clear list
		$(trash_list).empty();
		// re-update
		get_recycled_data();

	})
	.catch(error => {
		console.error(error);
		console.log(error.status);
	})
}

const restore_trash = (id, owner_id) =>{
	const restore_url = `${ base_url }api/budget/${id}/restore`;
	fetch(restore_url, {method: "PUT", mode: "cors", headers:{"Authorization": `${token}`, "Content-Type": "application/json"}})
	.then(response => response.json())
	.then(data => {
		// clear list
		$(trash_list).empty();
		// re-update
		get_recycled_data();
	})
	.catch(error => {
		console.error(error);
		console.log(error.status);
	})
}

const get_recycled_data = () => {
	const recycled_url = `${ base_url }api/budget/recycled`;
	fetch(recycled_url, {method: "GET", mode: "cors", headers:{"Authorization": `${token}`, "Content-Type": "application/json"}})
	.then(response => response.json())
	.then(data => {
		console.log("running...");
		for (var i = data["recycled_budget"].length - 1; i >= 0; i--) {
			append_to_trash(data["recycled_budget"][i]);
		}

		// text
		$("#len").text(data["recycled_budget"].length);

	})
	.catch(error => {
		$(trash_list).empty();
		var msg = $(`<div class="jumbotron-fluid">
			<div class="container" style="margin-bottom: 260px;">
				<h5 class="display-6" style="color: #ffffff;">You are either offline or not logged-in.</h5>
				<p class="lead" style="color: #bdbdbd;"> Please login or signup to use this feature.</p>
				<a href="https://app-hymenaios-a2838.firebaseapp.com/login.html" class="btn btn-primary">Login</a>
				<a href="https://app-hymenaios-a2838.firebaseapp.com/register.html" class="btn btn-primary">Sign Up</a>
			</div>
		</div>`);
		console.error(error);
		console.log(error.status);
		$("footer").before(msg);
	})
}

// end
get_recycled_data();