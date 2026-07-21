// Checkout & Payment Manager

document.addEventListener('DOMContentLoaded', () => {
    // If not on checkout page, stop execution
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;

    let discountPercentage = 0;
    let promoAppliedCode = '';

    const orderSummaryItems = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const taxEl = document.getElementById('summary-tax');
    const discountRow = document.getElementById('summary-discount-row');
    const discountEl = document.getElementById('summary-discount');
    const totalEl = document.getElementById('summary-total');

    const couponInput = document.getElementById('coupon-code-input');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponMsg = document.getElementById('coupon-message');

    // Payment Form Method Toggles
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const upiForm = document.getElementById('upi-form');
    const paypalForm = document.getElementById('paypal-form');

    const updatePaymentFields = () => {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
        
        // Hide all payment sub-forms
        if (creditCardForm) creditCardForm.style.display = 'none';
        if (upiForm) upiForm.style.display = 'none';
        if (paypalForm) paypalForm.style.display = 'none';

        // Show selected sub-form
        if (selectedMethod === 'credit_card' && creditCardForm) creditCardForm.style.display = 'block';
        if (selectedMethod === 'upi' && upiForm) upiForm.style.display = 'block';
        if (selectedMethod === 'paypal' && paypalForm) paypalForm.style.display = 'block';
    };

    if (paymentMethods) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', updatePaymentFields);
        });
    }

    // Calculations function
    const renderCheckoutSummary = () => {
        if (!orderSummaryItems) return;

        const cartItems = Cart.items;
        if (cartItems.length === 0) {
            orderSummaryItems.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
            if (subtotalEl) subtotalEl.textContent = '$0.00';
            if (shippingEl) shippingEl.textContent = '$0.00';
            if (taxEl) taxEl.textContent = '$0.00';
            if (totalEl) totalEl.textContent = '$0.00';
            return;
        }

        orderSummaryItems.innerHTML = cartItems.map(item => `
            <div class="summary-product-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${item.image}" alt="${item.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: var(--radius-sm);">
                    <div>
                        <h4 style="font-size: 0.9rem; font-weight: 600; line-height: 1.2;">${item.name}</h4>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Qty: ${item.quantity}</span>
                    </div>
                </div>
                <span style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        const subtotal = Cart.getTotal();
        const shipping = subtotal > 150 ? 0.00 : 15.00;
        const tax = subtotal * 0.08; // 8% sales tax
        const discountAmount = subtotal * (discountPercentage / 100);
        const grandTotal = subtotal + shipping + tax - discountAmount;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;

        if (discountAmount > 0) {
            if (discountRow) discountRow.style.display = 'flex';
            if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;
    };

    // Apply Coupon Promo Code
    if (applyCouponBtn && couponInput) {
        applyCouponBtn.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (!code) {
                Cart.toast('Please enter a coupon code.', 'warning');
                return;
            }

            if (code === 'SAVE10') {
                discountPercentage = 10;
                promoAppliedCode = code;
                couponMsg.textContent = 'Promo "SAVE10" applied! (10% Discount)';
                couponMsg.className = 'coupon-message success';
                Cart.toast('Coupon applied: 10% Discount!', 'success');
            } else if (code === 'WELCOME15') {
                discountPercentage = 15;
                promoAppliedCode = code;
                couponMsg.textContent = 'Promo "WELCOME15" applied! (15% Discount)';
                couponMsg.className = 'coupon-message success';
                Cart.toast('Coupon applied: 15% Discount!', 'success');
            } else {
                discountPercentage = 0;
                promoAppliedCode = '';
                couponMsg.textContent = 'Invalid promo coupon code.';
                couponMsg.className = 'coupon-message error';
                Cart.toast('Invalid coupon code.', 'error');
            }

            renderCheckoutSummary();
        });
    }

    // Submit Order Handling
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (Cart.items.length === 0) {
            Cart.toast('Your cart is empty. Add products before checking out.', 'error');
            return;
        }

        // Verify basic info
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zip = document.getElementById('zip').value.trim();

        if (!firstName || !lastName || !email || !address || !city || !zip) {
            Cart.toast('Please fill in all shipping details.', 'error');
            return;
        }

        // Verify payment subform
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
        if (!selectedMethod) {
            Cart.toast('Please select a payment method.', 'error');
            return;
        }

        if (selectedMethod === 'credit_card') {
            const cardNum = document.getElementById('cc-number').value.trim();
            const cardExpiry = document.getElementById('cc-expiry').value.trim();
            const cardCvv = document.getElementById('cc-cvv').value.trim();
            if (!cardNum || !cardExpiry || !cardCvv) {
                Cart.toast('Please complete all credit card fields.', 'error');
                return;
            }
        } else if (selectedMethod === 'upi') {
            const upiId = document.getElementById('upi-id').value.trim();
            if (!upiId) {
                Cart.toast('Please enter your UPI ID.', 'error');
                return;
            }
        }

        // Compile and Save Order
        const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        
        // Calculate figures
        const subtotal = Cart.getTotal();
        const shipping = subtotal > 150 ? 0.00 : 15.00;
        const tax = subtotal * 0.08;
        const discountAmount = subtotal * (discountPercentage / 100);
        const total = subtotal + shipping + tax - discountAmount;

        const newOrder = {
            orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString(),
            items: Cart.items,
            subtotal,
            shipping,
            tax,
            discount: discountAmount,
            total,
            shippingAddress: {
                name: `${firstName} ${lastName}`,
                email,
                address,
                city,
                zip
            },
            paymentMethod: selectedMethod,
            status: 'Processing'
        };

        orders.push(newOrder);
        localStorage.setItem('user_orders', JSON.stringify(orders));

        Cart.toast('Processing payment and placing your order...', 'info');

        setTimeout(() => {
            Cart.clear();
            Cart.toast('Order placed successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 2000);
    });

    // Initial load
    renderCheckoutSummary();
    updatePaymentFields();
});
