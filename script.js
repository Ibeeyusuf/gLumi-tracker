document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const successResult = document.getElementById('successResult');
    const errorResult = document.getElementById('errorResult');
    const resultMessage = document.getElementById('resultMessage');
    const errorMessage = document.getElementById('errorMessage');
    // Removed tweetCount as it is no longer used

    // Handle search button click
    searchBtn.addEventListener('click', handleSearch);

    // Handle Enter key press in input
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    function handleSearch() {
        const username = usernameInput.value.trim();
        
        if (!username) {
            showError('Please enter a Twitter username');
            return;
        }

        // Validate username format (optional @ symbol)
        const cleanUsername = username.replace('@', '').trim();
        if (!cleanUsername) {
            showError('Please enter a valid Twitter username');
            return;
        }

        // Show loading state
        showLoading();
        hideResults();

        // Make API request
        fetch('/count-gLumi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: cleanUsername })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showSuccess(data);
            } else {
                showError(data.error || 'An error occurred');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError(error.message || 'Failed to fetch data. Please try again.');
        })
        .finally(() => {
            hideLoading();
        });
    }

    function showLoading() {
        loading.classList.remove('hidden');
        searchBtn.disabled = true;
    }

    function hideLoading() {
        loading.classList.add('hidden');
        searchBtn.disabled = false;
    }

    function showSuccess(data) {
        resultMessage.textContent = data.message;
        
        successResult.classList.remove('hidden');
        errorResult.classList.add('hidden');
        result.classList.remove('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        
        successResult.classList.add('hidden');
        errorResult.classList.remove('hidden');
        result.classList.remove('hidden');
    }

    function hideResults() {
        result.classList.add('hidden');
    }

    // Auto-focus on input
    usernameInput.focus();
});
