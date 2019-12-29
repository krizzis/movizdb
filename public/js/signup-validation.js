var username = document.querySelector('.input__name');
var email = document.querySelector('.input__email');
var password = document.querySelector('.input__password');
var repassword = document.querySelector('.input__repassword');

var submit = document.querySelector('.btn');

var checkbox = document.getElementById("terms");

var username_error = document.getElementById('username_error');
var email_error = document.getElementById('email_error');
var password_error = document.getElementById('password_error');
var repassword_error = document.getElementById('repassword_error');
var terms_error = document.getElementById('terms_error');

const usernameCheck = /[^A-Za-z0-9]/;
const emailCheck = /.[^@]+@[^\.]+\...+/;
const passwordCheck = /^[a-zA-Z0-9!?@%:<>#$&(*)\\-`.+,={}[\]/\"]*$/

function checkUsername(){
    if(username.value === "") {
        username_error.innerText = "Field is required";
    }
    else if (usernameCheck.test(username.value)){
        username_error.innerText = "Only letters and numbers allowed"
    }
    else {
        username_error.innerText = ""
        submit.disabled = false;
    }
}

function checkEmail(){
    if(email.value === "") {
        email_error.innerText = "Field is required"
    }
    else {
        email_error.innerText = ""
        submit.disabled = false;
    }
}

function checkEmailFormat(){
    if (!emailCheck.test(email.value)){
        email_error.innerText = "Please enter correct email address";
    }
    else {
        submit.disabled = false;
    }
}

function checkPassword(){
    if(password.value === "") {
        password_error.innerText = "Field is required";
    }
    else if (!passwordCheck.test(password.value)){
        password_error.innerText = "Password contains unallowed characters"
    }
    else {
        password_error.innerText = "";
        submit.disabled = false;
    }
}

function checkPasswordLength(){
    if (password.value.length <= 6){
        password_error.innerText = "Password have to be 6 characters long or more";
    }
    else {
        submit.disabled = false;
    }
}

function checkTerms(){
    if (!checkbox.checked){
        terms_error.innerText = "You need to agree with terms of use to proceed"
        submit.disabled = true;
    }
    else {
        terms_error.innerText = ""
        submit.disabled = false;
    }
}

function checkOnSubmit(){
    checkEmail();
    checkUsername();
    checkPassword();
    checkTerms();
    if (password.value != repassword.value){
        repassword_error.innerText = "Passwords are not matched";
    }
    if (
        password_error.innerText.length > 0 ||
        repassword_error.innerText.length > 0 ||
        username_error.innerText.length > 0 ||
        terms_error.innerText.length > 0
    ) {
        submit.disabled = true;
    }
    else
    {
        submit.disabled = false;
    }
}