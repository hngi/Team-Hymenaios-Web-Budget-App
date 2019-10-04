const parsedUrl = new URL(window.location.href);
const getSearchParam = parsedUrl.searchParams;
let budget_id = getSearchParam.get("id");
let budget_title = getSearchParam.get("budget");
let budget_amt = getSearchParam.get("amount");
if(!(budget_id && budget_title && budget_amt)){
	location.replace('login.html')
}

const thisUserNameSidebar = document.querySelector('[data-this-username-side]');
const thisImageSidebar = document.querySelector('[data-this-image-side]');
const thisIncomeSpot = document.querySelector('[data-income-spot]');

const thisBudgetTitle = document.querySelector('[data-budget-title]');

thisBudgetTitle.innerHTML = `${budget_title} (${budget_amt})`;


thisUserNameSidebar.innerHTML = `@${username}`;
thisImageSidebar.src = `${image_link}${image_format}${image}`;

const amount_total_income = total_income.substr(4, total_income.length - 2)
const currency = total_income.slice(0, 3)

let formatted_total_income;
if(currency == "NGN") {
    formatted_total_income = `&#8358; ${amount_total_income}`
}else if (currency == "USD") {
    formatted_total_income = `&#36; ${amount_total_income}`
}else if (currency == "EUR") {
    formatted_total_income = `&euro; ${amount_total_income}`
}else if (currency == "GBR") {
    formatted_total_income = `&#163; ${amount_total_income}`
}

thisIncomeSpot.innerHTML = formatted_total_income;
