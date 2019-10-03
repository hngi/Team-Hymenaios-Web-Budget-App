
const thisUserNameSidebar = document.querySelector('[data-this-username-side]');
const thisImageSidebar = document.querySelector('[data-this-image-side]');
const thisIncomeSpot = document.querySelector('[data-income-spot]');



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
}else {
    formatted_total_income = '0.00';
}

thisIncomeSpot.innerHTML = formatted_total_income;
