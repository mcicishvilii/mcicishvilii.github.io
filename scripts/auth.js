// Utility function to refresh token
export async function refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
        window.location.href = 'index.html';
        return null;
    }

    try {
        const response = await fetch('https://ladogudi.serv00.net/api/refresh', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${refresh_token}` }
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('access_token', data.access_token);
            return data.access_token;
        } else {
            localStorage.clear();
            window.location.href = 'index.html';
            return null;
        }
    } catch (error) {
        localStorage.clear();
        window.location.href = 'index.html';
        return null;
    }
}

// Utility function to fetch profile
export async function fetchProfile() {
    let access_token = localStorage.getItem('access_token');
    if (!access_token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        let response = await fetch('https://ladogudi.serv00.net/api/profile', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        });

        if (response.status === 401) {
            access_token = await refreshToken();
            if (!access_token) return;

            response = await fetch('https://ladogudi.serv00.net/api/profile', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${access_token}` }
            });
        }

        const data = await response.json();
        if (response.ok) {
            document.getElementById('dashboardInfo').textContent = `Welcome, ${data.email}! (ID: ${data.id})`;
            document.getElementById('profileName').textContent = `User: ${data.email}`;
            document.getElementById('profileInfo').textContent = `Your ID is ${data.id}`;
        } else {
            document.getElementById('userInfo').textContent = 'Failed to load user information.';
        }
    } catch (error) {
        document.getElementById('userInfo').textContent = 'Network error. Please try again.';
    }
}
