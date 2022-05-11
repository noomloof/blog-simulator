import { Api } from "../models/api.js";

const signUp = document.getElementById('signUpButton');
signUp.addEventListener('click', () => {
    const newUser = {};
    newUser.username = document.getElementById('userName').value;
    newUser.email = document.getElementById('userEmail').value;
    newUser.avatarUrl = document.getElementById('userPfp').value;
    newUser.password = document.getElementById('userPw').value;
    let action = {}
    Api.registerUser(newUser)
    .then((res) => {
        action = res;
        if(action.ok) {
            window.location.href = "./src/morePages/login.html"
        } else {
            alert('There was an error whilst registering!')
        }
    })
})