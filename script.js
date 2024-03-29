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
        const response = await fetch(`http://localhost:8000/index.php?keyword=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const comments = await response.json();

        // Display the filtered comments in the UI
        const resultsList = document.getElementById('results');
        resultsList.innerHTML = '';

        if (comments.length === 0) {
            resultsList.innerHTML = '<li>No results found</li>';
        } else {
            comments.forEach(comment => {
                const li = document.createElement('li');
                li.classList.add('comment-item');
                li.innerHTML = `
                    <div class="comment-content">
                        <h3 class="comment-name">${comment.name}</h3>
                        <p class="comment-email">${comment.email}</p>
                        <p class="comment-body">${comment.body}</p>
                    </div>
                `;
                resultsList.appendChild(li);
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});
