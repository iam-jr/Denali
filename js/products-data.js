// 🛍️ DATOS DE PRODUCTOS - DENALI
// Edita estos datos fácilmente para actualizar tus productos

const productsData = [
    // HOODIES
    {
        id: 1,
        name: "Denali Hoodie Classic",
        category: "hoodies",
        gender: "unisex",
        price: 89.99,
        discount: 15,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif", "img/denali-prod-1.avif"],
        rating: 4.8,
        reviews: 124,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Gris", "Azul"],
        stock: 45,
        featured: true,
        description: "Sudadera premium con diseño exclusivo Denali. Material suave y cómodo.",
        details: "100% Algodón orgánico, diseño bordado, ajuste regular"
    },
    {
        id: 2,
        name: "Denali Hoodie Moon Edition",
        category: "hoodies",
        gender: "unisex",
        price: 99.99,
        discount: 20,
        image: "img/denali-prod-2.avif",
        images: ["img/denali-prod-2.avif", "img/denali-prod-2.avif"],
        rating: 4.9,
        reviews: 89,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Blanco"],
        stock: 32,
        featured: true,
        description: "Edición limitada inspirada en la luna con detalles reflectantes.",
        details: "Edición limitada, diseño exclusivo, material premium"
    },
    {
        id: 3,
        name: "Denali Zip Hoodie",
        category: "hoodies",
        gender: "men",
        price: 94.99,
        discount: 0,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.7,
        reviews: 156,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Negro", "Gris", "Verde Militar"],
        stock: 28,
        featured: false,
        description: "Hoodie con cierre completo, bolsillos laterales y capucha ajustable.",
        details: "Mezcla algodón-poliéster, cierre YKK, capucha forrada"
    },
    
    // CAMISETAS
    {
        id: 4,
        name: "Denali Over Size Shirt",
        category: "shirts",
        gender: "unisex",
        price: 54.99,
        discount: 10,
        image: "img/denali-prod-3.avif",
        images: ["img/denali-prod-3.avif", "img/denali-prod-3.avif"],
        rating: 4.6,
        reviews: 203,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Blanco", "Gris"],
        stock: 67,
        featured: true,
        description: "Camisa oversized cómoda y elegante con logo bordado.",
        details: "Corte oversize, 100% algodón peinado, cuello redondo"
    },
    {
        id: 5,
        name: "Denali Basic Tee",
        category: "shirts",
        gender: "unisex",
        price: 34.99,
        discount: 0,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.5,
        reviews: 342,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Blanco", "Gris", "Azul Marino"],
        stock: 120,
        featured: false,
        description: "Camiseta básica esencial con logo pequeño en el pecho.",
        details: "Algodón orgánico, corte regular, costuras reforzadas"
    },
    {
        id: 6,
        name: "Denali Long Sleeve",
        category: "shirts",
        gender: "men",
        price: 44.99,
        discount: 5,
        image: "img/denali-prod-3.avif",
        images: ["img/denali-prod-3.avif"],
        rating: 4.7,
        reviews: 98,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Gris Oscuro", "Borgoña"],
        stock: 54,
        featured: false,
        description: "Camiseta manga larga con diseño gráfico en la espalda.",
        details: "Jersey suave, diseño screen-printed, ajuste slim"
    },

    // PANTALONES
    {
        id: 7,
        name: "Denali Cargo Pants",
        category: "pants",
        gender: "men",
        price: 79.99,
        discount: 15,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.8,
        reviews: 167,
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Negro", "Verde Militar", "Beige"],
        stock: 41,
        featured: true,
        description: "Pantalón cargo con múltiples bolsillos y ajuste cómodo.",
        details: "Tela resistente, 6 bolsillos, cintura elástica parcial"
    },
    {
        id: 8,
        name: "Denali Joggers",
        category: "pants",
        gender: "unisex",
        price: 64.99,
        discount: 0,
        image: "img/denali-prod-2.avif",
        images: ["img/denali-prod-2.avif"],
        rating: 4.9,
        reviews: 289,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Negro", "Gris", "Azul Marino"],
        stock: 78,
        featured: true,
        description: "Joggers deportivos premium con logo bordado lateral.",
        details: "Algodón French Terry, puños elásticos, bolsillos laterales"
    },

    // ZAPATOS
    {
        id: 9,
        name: "Denali Sneakers Classic",
        category: "shoes",
        gender: "unisex",
        price: 129.99,
        discount: 20,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.7,
        reviews: 234,
        sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
        colors: ["Negro/Blanco", "Blanco/Negro", "Negro Total"],
        stock: 56,
        featured: true,
        description: "Sneakers clásicos con diseño moderno y suela de goma.",
        details: "Cuero sintético premium, suela antideslizante, plantilla acolchada"
    },
    {
        id: 10,
        name: "Denali High Tops",
        category: "shoes",
        gender: "unisex",
        price: 139.99,
        discount: 10,
        image: "img/denali-prod-2.avif",
        images: ["img/denali-prod-2.avif"],
        rating: 4.8,
        reviews: 178,
        sizes: ["37", "38", "39", "40", "41", "42", "43"],
        colors: ["Negro", "Blanco", "Rojo/Negro"],
        stock: 34,
        featured: false,
        description: "Botines deportivos con soporte de tobillo y diseño urbano.",
        details: "Corte alto, soporte de tobillo, cierre de cordones"
    },

    // ACCESORIOS
    {
        id: 11,
        name: "Denali Cap Classic",
        category: "accessories",
        gender: "unisex",
        price: 29.99,
        discount: 0,
        image: "img/denali-prod-3.avif",
        images: ["img/denali-prod-3.avif"],
        rating: 4.6,
        reviews: 412,
        sizes: ["Única"],
        colors: ["Negro", "Blanco", "Azul", "Rojo"],
        stock: 156,
        featured: false,
        description: "Gorra ajustable con logo bordado frontal.",
        details: "100% algodón, visera curva, cierre ajustable"
    },
    {
        id: 12,
        name: "Denali Backpack",
        category: "accessories",
        gender: "unisex",
        price: 74.99,
        discount: 15,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.9,
        reviews: 267,
        sizes: ["Única"],
        colors: ["Negro", "Gris", "Azul Marino"],
        stock: 43,
        featured: true,
        description: "Mochila urbana con compartimento para laptop hasta 15 pulgadas.",
        details: "Poliéster resistente, acolchado para laptop, múltiples bolsillos"
    },
    {
        id: 13,
        name: "Denali Socks Pack",
        category: "accessories",
        gender: "unisex",
        price: 24.99,
        discount: 5,
        image: "img/denali-prod-2.avif",
        images: ["img/denali-prod-2.avif"],
        rating: 4.5,
        reviews: 523,
        sizes: ["S/M", "L/XL"],
        colors: ["Negro", "Blanco", "Mix"],
        stock: 234,
        featured: false,
        description: "Pack de 3 pares de calcetines con logo Denali.",
        details: "Mezcla algodón-poliéster, transpirables, elástico reforzado"
    },
    {
        id: 14,
        name: "Denali Belt Leather",
        category: "accessories",
        gender: "unisex",
        price: 39.99,
        discount: 0,
        image: "img/denali-prod-3.avif",
        images: ["img/denali-prod-3.avif"],
        rating: 4.7,
        reviews: 189,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Marrón"],
        stock: 67,
        featured: false,
        description: "Cinturón de cuero genuino con hebilla metálica Denali.",
        details: "Cuero genuino, hebilla de metal, ajustable"
    },

    // CHAQUETAS
    {
        id: 15,
        name: "Denali Bomber Jacket",
        category: "jackets",
        gender: "men",
        price: 149.99,
        discount: 25,
        image: "img/denali-prod-1.avif",
        images: ["img/denali-prod-1.avif"],
        rating: 4.9,
        reviews: 156,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Verde Militar", "Azul Marino"],
        stock: 28,
        featured: true,
        description: "Chaqueta bomber premium con forro acolchado.",
        details: "Forro acolchado, cierre de cremallera YKK, bolsillos laterales"
    },
    {
        id: 16,
        name: "Denali Windbreaker",
        category: "jackets",
        gender: "unisex",
        price: 84.99,
        discount: 10,
        image: "img/denali-prod-2.avif",
        images: ["img/denali-prod-2.avif"],
        rating: 4.6,
        reviews: 201,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Blanco", "Reflectante"],
        stock: 45,
        featured: false,
        description: "Rompevientos ligero con detalles reflectantes.",
        details: "Material impermeable, capucha plegable, ultra ligero"
    }
];

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'all') return productsData;
    return productsData.filter(p => p.category === category);
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return productsData.filter(p => p.featured);
}

// Función para buscar productos
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

// Función para filtrar por precio
function filterByPrice(min, max) {
    return productsData.filter(p => {
        const finalPrice = p.discount > 0 ? p.price * (1 - p.discount / 100) : p.price;
        return finalPrice >= min && finalPrice <= max;
    });
}

// Función para ordenar productos
function sortProducts(products, sortBy) {
    const sorted = [...products];
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

// Calcular precio con descuento
function getFinalPrice(product) {
    if (product.discount > 0) {
        return product.price * (1 - product.discount / 100);
    }
    return product.price;
}
