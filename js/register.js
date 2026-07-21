// User Registration Controller

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms')?.checked;

        // Basic inputs validations
        if (!name || !email || !password || !confirmPassword) {
            Cart.toast('Please fill out all required fields.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            Cart.toast('Passwords do not match. Please verify.', 'error');
            return;
        }

        if (!agreeTerms) {
            Cart.toast('You must agree to the Terms & Conditions.', 'warning');
            return;
        }

        // Get existing registered list
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        
        // Ensure email isn't already taken
        const emailExists = registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            Cart.toast('An account with this email already exists.', 'error');
            return;
        }

        // Add new user
        const newUser = {
            name,
            email,
            password,
            isAdmin: email.includes('admin@') // simple check to provision admin accounts automatically
        };

        registeredUsers.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

        Cart.toast('Registration successful! Redirecting to login...', 'success');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
});
