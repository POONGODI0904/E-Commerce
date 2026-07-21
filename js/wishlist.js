// Wishlist State Management

const Wishlist = {
    items: [],

    init() {
        this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.updateBadges();
    },

    save() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
        this.updateBadges();
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { items: this.items } }));
    },

    toggleItem(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const index = this.items.indexOf(productId);
        if (index > -1) {
            this.items.splice(index, 1);
            this.save();
            this.toast(`Removed "${product.name}" from your wishlist.`, 'info');
            return false;
        } else {
            this.items.push(productId);
            this.save();
            this.toast(`Added "${product.name}" to your wishlist!`, 'success');
            return true;
        }
    },

    hasItem(productId) {
        return this.items.includes(productId);
    },

    getCount() {
        return this.items.length;
    },

    updateBadges() {
        const wishlistBadge = document.getElementById('wishlist-badge');
        if (wishlistBadge) {
            const count = this.getCount();
            wishlistBadge.textContent = count;
            wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    toast(message, type = 'success') {
        if (typeof Cart !== 'undefined' && Cart.toast) {
            Cart.toast(message, type);
        } else {
            console.log(`[Wishlist] ${type}: ${message}`);
        }
    }
};

// Initialize Wishlist
document.addEventListener('DOMContentLoaded', () => {
    Wishlist.init();
});
