const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle between login and register
registerBtn.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginBtn.addEventListener('click', ()=>{
    container.classList.remove('active');
});

// Handle login
const signInBtn = document.querySelector('.sign-in');
signInBtn.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "index.html";// change index.html with the file you want to redirect
});