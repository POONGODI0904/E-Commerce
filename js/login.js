// Login State & Verification Management

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me')?.checked;

        // Reset error messages if any
        if (!email || !password) {
            Cart.toast('Please fill out all fields.', 'error');
            return;
        }

        // Simple mock account check
        // Check if there is a registered user in localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        
        // Let's add a default admin and user account for easy evaluation
        if (registeredUsers.length === 0) {
            registeredUsers.push({
                name: "Demo User",
                email: "user@example.com",
                password: "password123",
                isAdmin: false
            });
            registeredUsers.push({
                name: "System Admin",
                email: "admin@example.com",
                password: "admin123",
                isAdmin: true
            });
            localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
        }

        const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            Cart.toast('No account registered with this email.', 'error');
            return;
        }

        if (user.password !== password) {
            Cart.toast('Incorrect password. Please try again.', 'error');
            return;
        }

        // Login success!
        const sessionUser = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin || false,
            timestamp: Date.now()
        };

        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        Cart.toast(`Welcome back, ${user.name}! Logging you in...`, 'success');

        // Redirect based on role or original URL
        setTimeout(() => {
            if (user.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    });
});
