//На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули

// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

//user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.

// блоки з короткою іфною про post - в ряд по 5.


let userId = new URL(location.href).searchParams.get("id");

fetch("http://jsonplaceholder.typicode.com/users?id=" + userId)
    .then(value => value.json())
    .then(value => {
        let user = value[0];
        let userDetailsWrapper = document.createElement("div");
        userDetailsWrapper.className = "userDetailsWrapper";
        getAllUserData(user);

        function getAllUserData(user) {
            for (const userKey in user) {
                if (typeof user[userKey] === "object") {
                    getAllUserData(user[userKey]);
                } else {
                    let userDataDiv = document.createElement("div");
                    userDataDiv.className = "userDataDiv";
                    userDataDiv.innerHTML = userKey + ": " + user[userKey];
                    userDetailsWrapper.append(userDataDiv);
                }
            }
        }

        fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/posts")
            .then(value1 => value1.json())
            .then(value1 => {
                let posts = value1;
                let postOfCurrentUser = document.createElement("button");
                postOfCurrentUser.innerHTML = "post of current user";
                postOfCurrentUser.className = "postOfCurrentUser";
                userDetailsWrapper.append(postOfCurrentUser);

                postOfCurrentUser.onclick = function () {
                    let i = 0;
                    let fivePostWrapper;

                    for (const post of posts) {
                        if (i % 5 === 0) {
                            fivePostWrapper = document.createElement("div");
                        }
                        let postTitleDivWrapper = document.createElement("div");
                        postTitleDivWrapper.className = "postTitleDivWrapper";
                        fivePostWrapper.append(postTitleDivWrapper);

                        let postTitleDiv = document.createElement("div");
                        postTitleDiv.className="postTitleDiv";
                        postTitleDiv.innerHTML = "post title: " + post.title;
                        postTitleDivWrapper.append(postTitleDiv);
                        let postDetailsButton = document.createElement("button");
                        postDetailsButton.innerHTML = "show post details";
                        postTitleDivWrapper.append(postDetailsButton);

                        postDetailsButton.onclick = function () {
                            location.href = `post-details.html?id=${post.id}`;
                        }
                        i++;
                        fivePostWrapper.className = "fivePostWrapper";
                        document.body.append(fivePostWrapper);
                    }
                }
            });
        document.body.append(userDetailsWrapper);
    });
