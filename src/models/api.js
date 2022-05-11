export class Api {
    static async registerUser(data) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then((res) => res)
        .catch(err => console.error(err))
        return response
    }

    static async loginUser(data) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        const token = await response.json()
        window.localStorage.setItem("response", JSON.stringify(token))
        return response
    }

    static async getUser(userId, token) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/" + userId + "?null=null", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .catch(err => console.error(err))
        return response
    }

    static async createPost(data, token) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"  
            },
            body: JSON.stringify(data)
        })
        .then((res) => res)
        .catch(err => console.error(err))

        return response

    }

    static async listPost(userId, token) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/post/" + userId, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => res)
        .catch(err => console.error(err))

        return response

    }

    static async listPostPage(page, token) {
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .catch(err => console.error(err))

        return response
    }

    static async editPost(data, userId, token) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/post/" + userId, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res) => res)
        .catch(err => console.error(err))

        return response

    }

    static async deletePost(userId, token) {
        const response = await fetch("https://api-blog-m2.herokuapp.com/post/" + userId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        })
        .then((res) => res)
        .catch(err => console.error(err))

        return response

    }
}