// ./script.js

document.getElementById('search-input').addEventListener('keyup', async (e) => {
    const keyword = e.target.value.trim();
    if (keyword.length > 0) {
        fetchSuggestions(keyword);
    } else {
        document.getElementById('results').innerHTML = ''; // Clear results if input is empty
    }
});

async function fetchSuggestions(keyword) {
    try {
        const res = await fetch(`http://localhost:8000/index.php?keyword=${keyword}`);
        const json = await res.json();
        displayResults(json);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function displayResults(results) {
    const resultList = results.map(result => `<li>${result.name}</li>`).join('');
    document.getElementById('results').innerHTML = `<ul>${resultList}</ul>`;
}
