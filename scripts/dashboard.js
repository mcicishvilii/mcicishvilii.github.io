import { fetchProfile, refreshToken } from './auth.js';

async function initializeDashboard() {
    if (!localStorage.getItem('access_token')) {
        window.location.href = 'index.html';
        return;
    }

    await refreshToken();
    await fetchProfile();

    // Set up logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) {
                localStorage.clear();
                window.location.href = 'index.html';
                return;
            }

            try {
                await fetch('https://ladogudi.serv00.net/api/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
            } catch (e) {
            }
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeDashboard);
