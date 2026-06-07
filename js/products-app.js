// =========================================
// PRODUCTS APP - WEB APP FUNCTIONALITY
// =========================================

// State Management
const state = {
    products: [],
    filteredProducts: [],
    currentView: 'grid',
    currentPage: 1,
    productsPerPage: 12,
    filters: {
        category: 'all',
        gender: [],
        minPrice: 0,
        maxPrice: 500,
        rating: 0,
        onSale: false,
        search: ''
    },
    sortBy: 'newest'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load products from data file
    state.products = window.productsData || [];
    state.filteredProducts = [...state.products];
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize filters
    initializeFilters();
    
    // Render initial products
    renderProducts();
    
    // Update cart count
    updateCartCount();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // View Toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            toggleView(view);
        });
    });
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Category Filters
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', handleCategoryFilter);
    });
    
    // Gender Filters
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
    genderCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleGenderFilter);
    });
    
    // Price Range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceRange);
    }
    
    // Rating Filter
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', handleRatingFilter);
    });
    
    // Sale Filter
    const saleCheckbox = document.getElementById('saleOnly');
    if (saleCheckbox) {
        saleCheckbox.addEventListener('change', handleSaleFilter);
    }
    
    // Clear Filters
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // Mobile Filters Toggle
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (filtersToggle && filtersSidebar) {
        filtersToggle.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });
    }
    
    if (applyFiltersBtn && filtersSidebar) {
        applyFiltersBtn.addEventListener('click', () => {
            filtersSidebar.classList.remove('active');
        });
    }
    
    // Close modal
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
}

// Initialize Filters
function initializeFilters() {
    // Set initial price range
    const priceRange = document.getElementById('priceRange');
    const maxPriceSpan = document.getElementById('maxPrice');
    
    if (priceRange && maxPriceSpan) {
        state.filters.maxPrice = parseInt(priceRange.max);
        maxPriceSpan.textContent = `$${state.filters.maxPrice}`;
    }
    
    // Update category counts
    updateFilterCounts();
}

// Update Filter Counts
function updateFilterCounts() {
    // Category counts
    const categoryCounts = {};
    state.products.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    // Update count badges
    Object.keys(categoryCounts).forEach(category => {
        const countEl = document.querySelector(`input[value="${category}"]`)?.nextElementSibling?.nextElementSibling;
        if (countEl) {
            countEl.textContent = categoryCounts[category];
        }
    });
}

// Filter Handlers
function handleCategoryFilter(e) {
    state.filters.category = e.target.value;
    state.currentPage = 1;
    applyFilters();
}

function handleGenderFilter(e) {
    const gender = e.target.value;
    if (e.target.checked) {
        state.filters.gender.push(gender);
    } else {
        state.filters.gender = state.filters.gender.filter(g => g !== gender);
    }
    state.currentPage = 1;
    applyFilters();
}

function handlePriceRange(e) {
    state.filters.maxPrice = parseInt(e.target.value);
    document.getElementById('maxPrice').textContent = `$${state.filters.maxPrice}`;
    state.currentPage = 1;
    debounce(applyFilters, 300)();
}

function handleRatingFilter(e) {
    state.filters.rating = parseFloat(e.target.value);
    state.currentPage = 1;
    applyFilters();
}

function handleSaleFilter(e) {
    state.filters.onSale = e.target.checked;
    state.currentPage = 1;
    applyFilters();
}

function handleSearch(e) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        state.filters.search = searchInput.value.trim().toLowerCase();
        state.currentPage = 1;
        applyFilters();
    }
}

function handleSort(e) {
    state.sortBy = e.target.value;
    applyFilters();
}

// Apply All Filters
function applyFilters() {
    let filtered = [...state.products];
    
    // Category filter
    if (state.filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === state.filters.category);
    }
    
    // Gender filter
    if (state.filters.gender.length > 0) {
        filtered = filtered.filter(p => state.filters.gender.includes(p.gender));
    }
    
    // Price filter
    filtered = filtered.filter(p => {
        const price = getFinalPrice(p);
        return price >= state.filters.minPrice && price <= state.filters.maxPrice;
    });
    
    // Rating filter
    if (state.filters.rating > 0) {
        filtered = filtered.filter(p => p.rating >= state.filters.rating);
    }
    
    // Sale filter
    if (state.filters.onSale) {
        filtered = filtered.filter(p => p.discount > 0);
    }
    
    // Search filter
    if (state.filters.search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(state.filters.search) ||
            p.description.toLowerCase().includes(state.filters.search) ||
            p.category.toLowerCase().includes(state.filters.search)
        );
    }
    
    // Sort
    filtered = sortProducts(filtered, state.sortBy);
    
    state.filteredProducts = filtered;
    renderProducts();
}

// Sort Products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        case 'price-high':
            return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
        default:
            return sorted.sort((a, b) => b.id - a.id);
    }
}

// Clear All Filters
function clearFilters() {
    state.filters = {
        category: 'all',
        gender: [],
        minPrice: 0,
        maxPrice: 500,
        rating: 0,
        onSale: false,
        search: ''
    };
    state.currentPage = 1;
    
    // Reset form inputs
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelector('input[value="all"]').checked = true;
    
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = priceRange.max;
        document.getElementById('maxPrice').textContent = `$${priceRange.max}`;
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    applyFilters();
}

// Toggle View
function toggleView(view) {
    state.currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update grid class
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.classList.toggle('list-view', view === 'list');
    }
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    // Show loading state
    showLoading();
    
    setTimeout(() => {
        const start = (state.currentPage - 1) * state.productsPerPage;
        const end = start + state.productsPerPage;
        const productsToShow = state.filteredProducts.slice(start, end);
        
        // Update results count
        updateResultsCount();
        
        if (productsToShow.length === 0) {
            showEmptyState();
            return;
        }
        
        // Render products
        grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
        
        // Add event listeners to cards
        grid.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.product-wishlist') && !e.target.closest('.btn-primary')) {
                    const productId = parseInt(card.dataset.id);
                    showQuickView(productId);
                }
            });
        });
        
        // Add to cart buttons
        grid.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.id);
                addToCart(productId);
            });
        });
        
        // Wishlist buttons
        grid.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(btn);
            });
        });
        
        // Render pagination
        renderPagination();
    }, 300);
}

// Create Product Card
function createProductCard(product) {
    const finalPrice = getFinalPrice(product);
    const stars = generateStars(product.rating);
    const badgeHTML = product.discount > 0 
        ? `<div class="product-badge">-${product.discount}%</div>` 
        : (product.featured ? `<div class="product-badge">Destacado</div>` : '');
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${badgeHTML}
                <button class="product-wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${finalPrice.toFixed(2)}</span>
                    ${product.discount > 0 ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Agregar
                    </button>
                    <button class="btn-secondary" onclick="showQuickView(${product.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate Stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
    
    return stars;
}

// Show Loading State
function showLoading() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Cargando productos...</p>
            </div>
        `;
    }
}

// Show Empty State
function showEmptyState() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o busca algo diferente</p>
                <button class="btn-reset" onclick="clearFilters()">Limpiar Filtros</button>
            </div>
        `;
    }
}

// Update Results Count
function updateResultsCount() {
    const countEl = document.getElementById('resultsCount');
    if (countEl) {
        countEl.textContent = `Mostrando ${state.filteredProducts.length} productos`;
    }
}

// Pagination
function renderPagination() {
    const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
    const paginationContainer = document.getElementById('paginationNumbers');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let pages = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
            pages += `<button class="page-number ${i === state.currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
            pages += '<span>...</span>';
        }
    }
    
    paginationContainer.innerHTML = pages;
    
    // Update prev/next buttons
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) prevBtn.disabled = state.currentPage === 1;
    if (nextBtn) nextBtn.disabled = state.currentPage === totalPages;
}

function goToPage(page) {
    state.currentPage = page;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevPage() {
    if (state.currentPage > 1) {
        goToPage(state.currentPage - 1);
    }
}

function nextPage() {
    const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
    if (state.currentPage < totalPages) {
        goToPage(state.currentPage + 1);
    }
}

// Quick View Modal
function showQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const modalBody = modal.querySelector('.modal-body');
    
    const finalPrice = getFinalPrice(product);
    const stars = generateStars(product.rating);
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 15px; border: 2px solid rgba(255, 255, 255, 0.3);">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 15px;">
                    ${product.images.slice(0, 4).map(img => `
                        <img src="${img}" alt="${product.name}" style="width: 100%; border-radius: 8px; cursor: pointer; border: 2px solid rgba(0, 179, 179, 0.3);">
                    `).join('')}
                </div>
            </div>
            <div>
                <div style="color: #00b3b3; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                    ${product.category} - ${product.gender}
                </div>
                <h2 style="color: #fff; font-size: 2rem; margin-bottom: 15px;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <span style="color: #ffd700; font-size: 1.1rem;">${stars}</span>
                    <span style="color: #999;">${product.rating} (${product.reviews} reseñas)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                    <span style="color: #ffffff; font-size: 2.5rem; font-weight: bold;">$${finalPrice.toFixed(2)}</span>
                    ${product.discount > 0 ? `
                        <span style="color: #999; font-size: 1.5rem; text-decoration: line-through;">$${product.price.toFixed(2)}</span>
                        <span style="background: linear-gradient(135deg, #ffffff, #f5f5f5); color: #fff; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">-${product.discount}%</span>
                    ` : ''}
                </div>
                <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">${product.description}</p>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Tallas Disponibles:</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${product.sizes.map(size => `
                            <button style="padding: 10px 20px; background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 8px; color: #fff; cursor: pointer;">
                                ${size}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="color: #fff; margin-bottom: 10px;">Colores:</h4>
                    <div style="display: flex; gap: 10px;">
                        ${product.colors.map(color => `
                            <div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%; cursor: pointer; border: 2px solid rgba(255, 255, 255, 0.3);"></div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="background: rgba(0, 179, 179, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                    <p style="color: ${product.stock > 10 ? '#00ff00' : '#f5f5f5'}; font-weight: bold;">
                        <i class="fas fa-box"></i> ${product.stock > 10 ? 'En Stock' : `Solo ${product.stock} disponibles`}
                    </p>
                </div>
                
                <button class="btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem;" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
                
                <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                    <h4 style="color: #fff; margin-bottom: 15px;">Detalles del Producto:</h4>
                    <ul style="color: #ccc; line-height: 2;">
                        ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Cart Functions
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('denaliCart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: getFinalPrice(product),
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('denaliCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} agregado al carrito!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('denaliCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart badge
    const cartBadges = document.querySelectorAll('.cart-count');
    cartBadges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    });
}

// Wishlist Functions
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    
    if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.background = '#ffffff';
        showNotification('Agregado a favoritos!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.background = 'rgba(0, 0, 0, 0.7)';
        showNotification('Removido de favoritos');
    }
}

// Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #ffffff, #f5f5f5);
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4);
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        font-weight: bold;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Helper Functions
function getFinalPrice(product) {
    if (product.discount > 0) {
        return product.price * (1 - product.discount / 100);
    }
    return product.price;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
