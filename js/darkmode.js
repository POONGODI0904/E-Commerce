// Immediately apply theme before document is fully parsed to avoid flashes of white
(function () {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark-mode');
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('dark-mode');
        });
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.remove('dark-mode');
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const updateIcon = () => {
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    };
    
    // Set initial icon
    updateIcon();
    
    // Toggle theme on click
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateIcon();
        
        // Broadcast theme change for any custom elements
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: currentTheme } }));
    });
});
