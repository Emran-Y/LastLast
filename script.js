document.getElementById('results').innerHTML = '<li>No search term entered</li>';
document.getElementById('search-input').addEventListener('keyup', async (e) => {
    try {
        const searchTerm = e.target.value.trim();
        
        // Check if search term is empty
        if (searchTerm === '') {
            document.getElementById('results').innerHTML = '<li>No search term entered</li>';
            return;
        }

        // Fetch comments from the API
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=3`);
        if (!response.ok) {
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const comments = await response.json();

        // Filter comments based on the search term (name)
        const filteredComments = comments.filter(comment =>
            comment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Display the filtered comments in the UI
        const resultsList = document.getElementById('results');
        resultsList.innerHTML = '';

        if (filteredComments.length === 0) {
            resultsList.innerHTML = '<li>No results found</li>';
        } else {
            filteredComments.forEach(comment => {
                const li = document.createElement('li');
                li.classList.add('comment');
                li.innerHTML = `
                    <div class="comment-header">
                        <h3 class="comment-name">${comment.name}</h3>
                        <p class="comment-email">${comment.email}</p>
                    </div>
                    <p class="comment-body">${comment.body}</p>
                `;
                resultsList.appendChild(li);
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});
