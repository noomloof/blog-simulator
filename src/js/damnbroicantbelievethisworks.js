import { Api } from "../models/api.js";

import { Post } from "../models/posts.js";

const info = JSON.parse(window.localStorage.getItem('response'));

const myUser = await Api.getUser(info.userId, info.token);

const userProfileArea = document.getElementById('profileData');

const userPfp = document.createElement('img');
userPfp.setAttribute('id', 'userPfpMain');
userPfp.src = `${myUser.avatarUrl}`;
userPfp.alt = 'Profile picture';

const userNickname = document.createElement('div');
userNickname.setAttribute('id', 'userNickMain');
userNickname.innerText = myUser.username;

userProfileArea.appendChild(userPfp);
userProfileArea.appendChild(userNickname);

const allPosts = document.getElementById('postsHolder')
const pageNavigation = document.getElementById('pageNav')
let page = 1;
async function postExec() {
    const posts = await Api.listPostPage(page, info.token)
    Post.postList = posts.data;
    Post.currentToken = info.token
    Post.currentUser = info.userId
    Post.postLister()

    if(posts.previousPage) {
        const btn = document.createElement('button');
        btn.classList.add('navButton');
        btn.innerText = 'Previous page';
        btn.addEventListener('click', () => {
            allPosts.innerText = '';
            pageNavigation.innerText = '';
            page--;
            postExec();
        })
    
        pageNavigation.append(btn)
    }

    if(posts.nextPage) {
        const btn = document.createElement('button');
        btn.classList.add('navButton');
        btn.innerText = 'Next page'
    
        btn.addEventListener('click', () => {
            allPosts.innerText = '';
            pageNavigation.innerText = '';
            page++;
            postExec();
        })
    
        pageNavigation.append(btn)
    }
    
}

postExec();

const postButton = document.getElementById('plusSign')
postButton.addEventListener('click', () => {
    let message = document.getElementById('messageBox').innerText;
    let formattedObj = {"content": `${message}`};
    Api.createPost(formattedObj, info.token).then(res => {
        setTimeout(() => {
            document.getElementById('messageBox').innerText = ''
            allPosts.innerHTML = ''
            Api.listPostPage(page, info.token).then(
                (response) => {
                    Post.postList = response.data;
                    Post.postLister()
                }
            )
        }, 500);
    })
})

const logOutButton = document.getElementById('logoutButton');
logOutButton.addEventListener('click', () => {
    window.localStorage.removeItem('response');
    window.location.href = "./login.html"
})