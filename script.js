// إدارة السلة
let cart = JSON.parse(localStorage.getItem('lena_cart')) || [];

// تحديث العداد فور فتح الصفحة
updateCartCount();

function addToCart(name, price, image) {
    // التحقق هل المنتج موجود مسبقاً
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    saveCart();
    showToast(`تم إضافة "${name}" إلى السلة بنجاح! ✨`);
}

function saveCart() {
    localStorage.setItem('lena_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalCount;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// نظام البحث الفوري في المنتجات
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        let term = e.target.value.toLowerCase().trim();
        let cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            let name = card.getAttribute('data-name').toLowerCase();
            if (name.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}