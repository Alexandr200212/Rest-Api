const postList = document.querySelector('.posts_list');
const getPostsBtn = document.querySelector('.posts_get-posts');
const getPostBtn = document.querySelector('.post_get-post');
const getFilterPostsBtn = document.querySelector('.post_filter-post');

const postPost = document.querySelector('.post__post');
const postUser = document.querySelector('.post__user');

const state = {
    posts: []
};

const createPost = (post) => `
  <div class="post">
    <div class="post__wrapper">
      <h1 class="wrapper__user">${post.userId}</h1>
      <h2 class="wrapper__title">${post.title}</h2>
      <div class="wrapper__body">${post.body}</div>
    </div>
  </div>
`;

const fillPostsList = (posts) => {
    postList.innerHTML = "";

    if (posts.length) {
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = createPost(post);
            postList.appendChild(postElement);
        });
    } else {
        postList.innerHTML = '<div class="post">Посты не найдены</div>';
    }
};

getPostsBtn.addEventListener('click', async() => {
    await getPostRequest();
    await fillPostsList(state.posts);
});




getFilterPostsBtn.addEventListener('click', async() => {
    const userId = postUser.value;
    if (userId) {
        postList.innerHTML = "";

        const filteredPosts = await getFilterPostRequest(userId);
        if (filteredPosts && filteredPosts.length > 0) {
            filteredPosts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = createPost(post);
                postList.appendChild(postElement);
            });
        } else {
            postList.innerHTML = '<div class="post">Посты по указанному пользователю не найдены</div>';
        }
    } else {
        postList.innerHTML = '<div class="post">Введите Id пользователя</div>';
    }
});



getPostBtn.addEventListener('click', async() => {
    const postId = postPost.value;
    if (postId) {
        const post = await getSinglePostRequest(postId);
        if (post) {
            postList.innerHTML = createPost(post);
        } else {
            postList.innerHTML = '<div class="post">Пост не найден</div>';
        }
    } else {
        postList.innerHTML = '<div class="post">Введите Id поста</div>';
    }
});

function getPostRequest() {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=100', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((posts) => {
            state.posts = posts;
        });
}

function getSinglePostRequest(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        });
}


function getFilterPostRequest(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        });
}