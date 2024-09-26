let posts = [
    { id: 1, title: "First Post", content: "This is the content of the first post." },
    { id: 2, title: "Second Post", content: "This is the content of the second post." }
];
let editingPostId = null;

function renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function showPostForm(editing = false) {
    const form = document.getElementById('postForm');
    const submitBtn = document.getElementById('submitPost');
    form.style.display = 'block';
    submitBtn.textContent = editing ? 'Update Post' : 'Create Post';
    if (!editing) {
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
    }
}

function hidePostForm() {
    document.getElementById('postForm').style.display = 'none';
    editingPostId = null;
}

function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    if (title && content) {
        const newPost = { id: Date.now(), title, content };
        posts.push(newPost);
        renderPosts();
        hidePostForm();
    }
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postContent').value = post.content;
        editingPostId = id;
        showPostForm(true);
    }
}

function updatePost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    if (title && content) {
        const index = posts.findIndex(p => p.id === editingPostId);
        if (index !== -1) {
            posts[index] = { ...posts[index], title, content };
            renderPosts();
            hidePostForm();
        }
    }
}

function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
    renderPosts();
}

document.getElementById('newPostBtn').addEventListener('click', () => showPostForm());
document.getElementById('cancelPost').addEventListener('click', hidePostForm);
document.getElementById('submitPost').addEventListener('click', () => {
    if (editingPostId) {
        updatePost();
    } else {
        createPost();
    }
});

// Initial render
renderPosts();