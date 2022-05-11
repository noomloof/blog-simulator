import { Api } from "./api.js";

export class Post {
    static currentToken = ''

    static currentUser = '';

    static postList = [];

    static postLister() {
        this.postList.forEach((element) => {
            const postsHolder = document.getElementById('postsHolder');

            const cardPost = document.createElement('div');
            cardPost.classList.add('cardPost')

            const cardPostImageHolder = document.createElement('div')
            cardPostImageHolder.classList.add('cardPostPicture')

            const cardPostPfp = document.createElement('img');
            cardPostPfp.src = element.owner.avatarUrl;

            cardPostImageHolder.append(cardPostPfp)

            const cardPostContent = document.createElement('div');
            cardPostContent.classList.add('cardPostContent')
            
            const cardPostOwner = document.createElement('div');
            cardPostOwner.innerText = element.owner.username;
            cardPostOwner.classList.add('cardPostOwner')

            const cardPostMessage = document.createElement('div');
            cardPostMessage.innerText = element.post;
            cardPostMessage.classList.add('cardPostMessage')

            const cardPostDetails = document.createElement('div')
            cardPostDetails.classList.add('cardPostDetails')

            if(this.currentUser == element.owner.id) {
                const editPost = document.createElement('div');
                editPost.innerText = "Editar";
                editPost.classList.add('editPostSection')
                editPost.addEventListener('click', (event) => {
                    const targetDiv = event.target.parentElement.parentElement.children[1].children[1];
                    targetDiv.setAttribute('contentEditable', 'true')
                    targetDiv.addEventListener('focusout', () => {
                        const newMessage = targetDiv.innerText;
                        const formattedObj = {"newContent": `${newMessage}`};
                        Api.editPost(formattedObj, element.id, this.currentToken).then(res => {
                            setTimeout(() => {
                                location.reload()
                            }, 1200);
                        })
                    })
                })

                const deletePost = document.createElement('div');
                deletePost.innerText = "Apagar";
                deletePost.classList.add('deletePostSection')
                deletePost.addEventListener('click', () => {
                    Api.deletePost(element.id, this.currentToken).then(res => {
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
                    })
                })

                const datePost = document.createElement('div');
                datePost.innerText = element.createdAt.split('-').reverse().join('/');
                datePost.classList.add('datePostOwner')
                
                cardPostDetails.append(editPost, deletePost, datePost)
            } else {
                const datePost = document.createElement('div');
                datePost.innerText = element.createdAt.split('-').reverse().join('/');
                datePost.classList.add('datePostStranger')

                cardPostDetails.append(datePost)
            }

            cardPostContent.append(cardPostOwner, cardPostMessage)

            cardPost.appendChild(cardPostImageHolder)
            cardPost.appendChild(cardPostContent)
            cardPost.appendChild(cardPostDetails)

            postsHolder.append(cardPost)
        })
    }
}