//На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

//post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)


let postId = new URL(location.href).searchParams.get("id");

fetch("https://jsonplaceholder.typicode.com/posts?id=" + postId)
    .then(value => value.json())
    .then(value => {
        let postDetails = value[0];
        let postDetailsDivWrapper = document.createElement("div");
        postDetailsDivWrapper.className = "postDetailsDivWrapper"
        document.body.append(postDetailsDivWrapper);
        for (const postDetailsKey in postDetails) {
            let postDetailsDiv = document.createElement("div");
            postDetailsDiv.innerHTML = postDetailsKey + ": " + postDetails[postDetailsKey];
            postDetailsDivWrapper.append(postDetailsDiv);
        }

        fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments")
            .then(value => value.json())
            .then(value => {
                let comments = value;
                let i = 0;
                let fourCommentsWrap;

                for (const comment of comments) {
                    let commentsWrap = document.createElement("div");
                    if (i % 4 === 0) {
                        fourCommentsWrap = document.createElement("div");
                    }
                    for (const commentKey in comment) {
                        let commentDiv = document.createElement("div");
                        commentDiv.innerHTML = commentKey + ": " + comment[commentKey];
                        commentsWrap.append(commentDiv);
                        commentDiv.className = "commentDiv";
                    }
                    commentsWrap.className = "commentsWrap";
                    fourCommentsWrap.className = "fourCommentsWrap";
                    fourCommentsWrap.append(commentsWrap);
                    document.body.append(fourCommentsWrap);
                    i++;
                }
            });
    });
