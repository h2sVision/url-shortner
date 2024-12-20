document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('url-section').style.display = 'block';
      loadUrlList(); // Load the URL list after login
    } else {
      alert(data.message);
    }
  });
  
  document.getElementById('shorten-btn').addEventListener('click', async () => {
    const url = document.getElementById('long-url').value;
  
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
  
    const data = await response.json();
    if (response.ok) {
        const resultDiv = document.getElementById('short-url-result');
        resultDiv.innerHTML = `
         <p>Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p> 
         <p>QR Code:</p>
         <img src="${data.qrCode}" alt="QR Code for ${data.shortUrl}" />
         `;
      loadUrlList(); // Reload the URL list after shortening a new URL
    } else {
      alert(data.message);
    }
  });
  
async function loadUrlList() {
    try {
      const response = await fetch('/api/shortenedUrls', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      console.log('Fetched URLs:', data);
  
      if (response.ok) {
        const tableBody = document.getElementById('url-table-body');
        tableBody.innerHTML = ''; // Clear existing rows
  
        data.forEach((url, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="${url.originalUrl}" target="_blank">${url.originalUrl}</a></td>
            <td><a href="${url.shortUrl}" target="_blank">${url.shortUrl}</a></td>
            <td>${new Date(url.createdAt).toLocaleString()}</td>
            <td>${new Date(url.updatedAt).toLocaleString()}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error('Failed to fetch URLs:', data.message);
        alert('Failed to load URL list');
      }
    } catch (err) {
      console.error('Error loading URL list:', err.message);
      alert('An error occurred while loading the URL list');
    }
  }
  