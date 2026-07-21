// Core Application UI Controller

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hide Loading Spinner
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 400); // smooth entry
    }

    // 2. Shrink Header & Add Shadow on Scroll
    const header = document.querySelector('.header');
    if (header) {
        const toggleHeaderScroll = () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', toggleHeaderScroll);
        toggleHeaderScroll(); // Trigger check on load
    }

    // 3. Mobile Navigation Hamburger Menu drawer triggers
    const menuToggleBtn = document.getElementById('menu-toggle');
    const drawerCloseBtn = document.getElementById('drawer-close');
    const navDrawer = document.getElementById('mobile-nav-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    const openDrawer = () => {
        if (navDrawer && drawerOverlay) {
            navDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // stop page scroll
        }
    };

    const closeDrawer = () => {
        if (navDrawer && drawerOverlay) {
            navDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            document.body.style.overflow = ''; // restore scroll
        }
    };

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // 4. Update Header Authentication Status UI
    const updateAuthenticationUI = () => {
        const profileBtn = document.getElementById('profile-btn');
        if (!profileBtn) return;

        const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
        if (sessionUser) {
            profileBtn.innerHTML = '<i class="fas fa-user-check" style="color: var(--accent-success);"></i>';
            profileBtn.title = `Go to Dashboard (${sessionUser.name})`;
            profileBtn.href = sessionUser.isAdmin ? 'admin.html' : 'dashboard.html';
        } else {
            profileBtn.innerHTML = '<i class="far fa-user"></i>';
            profileBtn.title = 'Account Login / Sign-Up';
            profileBtn.href = 'login.html';
        }
    };

    updateAuthenticationUI();

    // Catch profile status changes locally
    window.addEventListener('storage', (e) => {
        if (e.key === 'currentUser') {
            updateAuthenticationUI();
        }
    });

    // 5. General Newsletter Form Actions
    const footerNewsletter = document.querySelector('.newsletter-form');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = footerNewsletter.querySelector('input');
            if (emailInput && emailInput.value.trim()) {
                if (typeof Cart !== 'undefined') {
                    Cart.toast('Thank you for subscribing to our newsletter!', 'success');
                }
                emailInput.value = '';
            }
        });
    }
});
