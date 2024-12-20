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
      `;
    } else {
      alert(data.message);
    }
  });
  