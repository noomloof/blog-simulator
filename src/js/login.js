import { Api } from "../models/api.js";

const login = document.getElementById('loginButton');
login.addEventListener('click', () => {
    const registeredUser = {};
    registeredUser.email = document.getElementById('userEmail').value;
    registeredUser.password = document.getElementById('userPw').value;
    let moreAction = {};
    Api.loginUser(registeredUser)
    .then((res) => {
        moreAction = res;
        if(moreAction.ok) {
            window.location.href = "./mainPage.html"
        } else {
            alert('Your information is incorrect.')
        }
    })
})