const links = document.querySelectorAll('.site-nav a');
const loginForm = document.getElementById('admin-login-form');
const loginMessage = document.getElementById('login-message');
const adminDashboard = document.getElementById('admin-dashboard');
const logoutButton = document.getElementById('logout-button');
const adminUsername = document.getElementById('admin-username');
const adminPassword = document.getElementById('admin-password');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = adminUsername.value.trim();
    const password = adminPassword.value.trim();

    if (!username || !password) {
      loginMessage.textContent = 'Please enter both username and password.';
      return;
    }

    loginMessage.textContent = 'Checking credentials...';

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        loginMessage.textContent = '';
        adminDashboard.classList.remove('hidden');
        loginForm.closest('.admin-card').classList.add('hidden');
      } else {
        loginMessage.textContent = result.message || 'Login failed. Please try again.';
      }
    } catch (error) {
      loginMessage.textContent = 'Unable to reach the backend server. Please start the server and try again.';
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    adminDashboard.classList.add('hidden');
    loginForm.closest('.admin-card').classList.remove('hidden');
    adminUsername.value = '';
    adminPassword.value = '';
    loginMessage.textContent = '';
  });
}
