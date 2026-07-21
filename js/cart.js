// Cart State Management

const Cart = {
    items: [],

    init() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateBadges();
    },

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateBadges();
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: this.items } }));
    },

    addItem(productId, qty = 1, silent = false) {
        // Fetch product data
        const product = getProductById(productId);
        if (!product) return;
        
        if (!product.inStock) {
            if (!silent) this.toast(`"${product.name}" is currently out of stock.`, 'warning');
            return;
        }

        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += parseInt(qty);
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category,
                quantity: parseInt(qty)
            });
        }

        this.save();
        if (!silent) {
            this.toast(`Added "${product.name}" to your cart!`, 'success');
        }
    },

    removeItem(productId, silent = false) {
        const product = getProductById(productId);
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        if (!silent && product) {
            this.toast(`Removed "${product.name}" from your cart.`, 'error');
        }
    },

    updateQty(productId, qty) {
        const item = this.items.find(item => item.id === productId);
        if (!item) return;

        item.quantity = Math.max(1, parseInt(qty));
        this.save();
    },

    clear() {
        this.items = [];
        this.save();
    },

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateBadges() {
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            const count = this.getCount();
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // Global toast notifications utility
    toast(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-times-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-circle';
        if (type === 'info') iconClass = 'fa-info-circle';

        toast.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
};

// Initialize Cart
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
});
