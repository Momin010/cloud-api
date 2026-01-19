document.getElementById('fetchBtn').addEventListener('click', async () => {
    const file = document.getElementById('fileSelect').value;
    if (!file) {
        alert('Please select a file');
        return;
    }
    try {
        const response = await fetch(`/api/validate?file=${encodeURIComponent(file)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const xml = await response.text();
        document.getElementById('xmlDisplay').textContent = xml;
    } catch (error) {
        document.getElementById('xmlDisplay').textContent = 'Error: ' + error.message;
    }
});