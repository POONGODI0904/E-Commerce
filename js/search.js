// Global Search Functionality

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (!searchOverlay || !searchInput) return;

    const openSearch = () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeSearchOverlay = () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
        document.body.style.overflow = '';
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (mobileSearchBtn) mobileSearchBtn.addEventListener('click', openSearch);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchOverlay);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Close on overlay background click
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearchOverlay();
        }
    });

    // Handle Input/Live Search Suggestions
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchSuggestions.classList.remove('active');
            searchSuggestions.innerHTML = '';
            return;
        }

        const filtered = getAllProducts().filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        ).slice(0, 5); // limit suggestions to 5 items

        if (filtered.length === 0) {
            searchSuggestions.innerHTML = `
                <div class="suggestion-item" style="cursor: default; justify-content: center; padding: 1.5rem 1rem; color: var(--text-secondary);">
                    No products found for "${e.target.value}"
                </div>
            `;
            searchSuggestions.classList.add('active');
            return;
        }

        searchSuggestions.innerHTML = filtered.map(product => `
            <div class="suggestion-item" data-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="suggestion-item-info">
                    <h4>${product.name}</h4>
                    <span>$${product.price.toFixed(2)}</span>
                </div>
            </div>
        `).join('');

        searchSuggestions.classList.add('active');

        // Suggestion click behavior
        const suggestionItems = searchSuggestions.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                window.location.href = `product.html?id=${id}`;
            });
        });
    });

    // Enter Key Search Behavior
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
});
