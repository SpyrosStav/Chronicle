function showLogin(){
    document.getElementById("loginPopup").style.display = "block";
}
function closeLogin(){
    document.getElementById("loginPopup").style.display = "none";
    document.querySelector('#loginErrorMessage').style.display = 'none';
    document.getElementById('loginForm').reset();
    
}
function showRegister(){
    document.getElementById("registerPopup").style.display = "block";
}
function closeRegister(){
    document.getElementById("registerPopup").style.display = "none";
    document.querySelector('#registerErrorMessage').style.display = 'none';
    document.getElementById('registerForm').reset();
}

var password = document.getElementById("passwordRegisterInput")
var confirm_password = document.getElementById("passwordRegisterConfirmInput");

function validatePassword(){
if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
} else {
    confirm_password.setCustomValidity('');
}
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

// Register handling
document.querySelector('#registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/register', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.querySelector('#registerPopup').style.display = 'none';
            location.reload();
        } else {
            let message = document.querySelector('#registerErrorMessage')
            message.className = 'alert alert-danger';
            message.textContent = data.message;
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
});

// Login Handling
document.querySelector("#loginForm").addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("/login", { 
        method : 'POST',
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 'success') {
            document.querySelector('#loginPopup').style.display = 'none';
            location.reload();
        }
        else{
            let message = document.querySelector('#loginErrorMessage')
            message.className = 'alert alert-danger';
            message.textContent = data.message;
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
})