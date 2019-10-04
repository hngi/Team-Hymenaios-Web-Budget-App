let key = 1;
const sidebarBtn = document.querySelector('[data-side-toggle]');
const sidebar = document.querySelector('#accordionSidebar');

sidebarBtn.addEventListener('click', () => {
    if(key == 0) {
        sidebar.style.display = 'block';
        key = 1;
    }else {
        sidebar.style.display = 'none';
        key = 0;
    }
})

const container = document.querySelector('#content-wrapper');
function myFunction(x) {
    if (x.matches) { // If media query matches
        if(key == 1){
            sidebar.style.display = 'none';
        }
        key = 0
    } else {
        key = 1;
        sidebar.style.display = 'block';
    }
  }
  
  var x = window.matchMedia("(max-width: 575px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  