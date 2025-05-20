document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    loadFontAwesome();

    setupNavigation();

    loadProducts();
    AOS.refresh();

    setupSearch();

    setupCart();

    setupCheckout();

    setupWhatsAppButton();

    updateCartDisplay();
    AOS.refresh();

});

function loadFontAwesome() {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesome);
}

function setupNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + section.clientHeight) {
           current = section.getAttribute('id');
           }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) { // Perbaikan: Gunakan backticks
                link.classList.add('active');
            }
        });

        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const initialSection = window.location.hash || '#home';
    const initialLink = document.querySelector(`nav ul li a[href="${initialSection}"]`); // Perbaikan: Gunakan backticks
    if (initialLink) {
        initialLink.classList.add('active');
    }
}

const products = [
    {
        id: 1,
        name: "Serum Retinol",
        description: "Serum retinol dengan ekstrak buah persik yang bekerja menenangkan kulit, menghaluskan tekstur, dan membantu menyamarkan tanda-tanda penuaan. Cocok untuk semua jenis kulit.",
        price: 45000,
        image: "img/produk 1.jpg"
    },
    {
        id: 2,
        name: "Serum Intensive Peeling",
        description: "Peeling serum dengan formula lembut untuk membantu mengangkat sel kulit mati, meratakan tekstur kulit, dan membuat wajah tampak lebih cerah dan halus.",
        price: 45000,
        image: "img/produk 2.jpg"
    },
    {
        id: 3,
        name: "Brightening Serum",
        description: "Diperkaya dengan Niacinamide yang efektif mencerahkan kulit kusam dan menyamarkan noda hitam, menjadikan kulit tampak lebih sehat dan merona alami.",
        price: 45000,
        image: "img/produk 3.jpg"
    },
    {
        id: 4,
        name: "Vitamin C Serum",
        description: "Serum dengan kandungan vitamin C tinggi yang membantu mencerahkan kulit, menyamarkan bekas jerawat, dan membuat wajah tampak lebih bercahaya alami.",
        price: 45000,
        image: "img/produk 4.jpg"
    },
    {
        id: 5,
        name: "Retinol Moisturizer",
        description: "Pelembap ringan yang mengandung retinol dan ekstrak buah persik, membantu menyamarkan garis halus dan membuat kulit tampak lebih halus dan cerah.",
        price: 55000,
        image: "img/produk 5.jpg"
    },
    {
        id: 6,
        name: "Moisturizer Seremaid",
        description: "Diperkaya dengan Aloe Vera alami, pelembap ini memberikan efek menenangkan dan menyegarkan kulit, cocok untuk kulit sensitif dan mudah iritasi.",
        price: 55000,
        image: "img/produk 6.jpg"
    },
    {
        id: 7,
        name: "Brightening Moisturizer",
        description: "Pelembap harian dengan formula khusus untuk mencerahkan dan menjaga kelembapan kulit. Membantu kulit tampak lebih halus dan merata.",    
        price: 55000,
        image: "img/produk 7.jpg"
    },
    {
        id: 8,
        name: "Blueberry Facial Wash",
        description: "Sabun wajah dengan ekstrak blueberry untuk membersihkan kotoran dan sisa makeup tanpa membuat kulit kering. Menjaga kelembapan alami kulit.",
        price: 50000,
        image: "img/produk 8 .jpg"
    },
    {
        id: 9,
        name: "Suncreen SPF 50++",
        description: "Tabir surya ringan dengan perlindungan SPF 50++ terhadap sinar UVA & UVB. Melindungi kulit dari paparan matahari sekaligus menjaga kelembapan dan elastisitas kulit.",
        price: 60000,
        image: "img/produk 9 .jpg"
    }
];


function loadProducts() {
    const produkList = document.querySelector('.produk-list');
    if (!produkList) return;
    
    produkList.innerHTML = '';
    
    products.forEach(product => {
        const produkElement = document.createElement('div');
        produkElement.className = 'produk';
        produkElement.setAttribute('data-aos', 'fade-up');
        
        produkElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="produk-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="harga">Rp ${product.price.toLocaleString('id-ID')}</div>
                <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
            </div>
        `;
        
        produkList.appendChild(produkElement);
    });
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId, 1);
        });
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search-container input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const produkItems = document.querySelectorAll('.produk');
        
        produkItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            const productDesc = item.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

let cart = [];

function setupCart() {
  if (localStorage.getItem('skincare_cart')) {
    cart = JSON.parse(localStorage.getItem('skincare_cart'));
    updateCartDisplay();
  }

  document.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('.remove');
    const decBtn = e.target.closest('.quantity-decrease');
    const incBtn = e.target.closest('.quantity-increase');

    if (removeBtn) {
      const productId = parseInt(removeBtn.getAttribute('data-id'));
      Swal.fire({
        title: 'Hapus produk ini dari keranjang?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Batal'
      }).then(result => {
        if (result.isConfirmed) {
          removeFromCart(productId);
          Swal.fire('Dihapus!', 'Produk telah dihapus dari keranjang.', 'success');
        }
      });
    }

    if (decBtn) {
      const productId = parseInt(decBtn.getAttribute('data-id'));
      updateQuantity(productId, -1);
    }

    if (incBtn) {
      const productId = parseInt(incBtn.getAttribute('data-id'));
      updateQuantity(productId, 1);
    }
  });
}


function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('skincare_cart', JSON.stringify(cart));
    
    updateCartDisplay();
    
    alert(`${product.name} telah ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('skincare_cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('skincare_cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const keranjangContent = document.querySelector('.keranjang-isi');
    const keranjangEmpty = document.querySelector('.keranjang-empty');
    const keranjangSummary = document.querySelector('.keranjang-summary');
    
    if (!keranjangContent || !keranjangEmpty || !keranjangSummary) return;
    
    if (cart.length === 0) {
        keranjangContent.style.display = 'none';
        keranjangSummary.style.display = 'none';
        keranjangEmpty.style.display = 'block';
        return;
    }
    
    keranjangContent.style.display = 'block';
    keranjangSummary.style.display = 'block';
    keranjangEmpty.style.display = 'none';
    
    keranjangContent.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'keranjang-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="keranjang-info">
                <h3>${item.name}</h3>
                <div class="harga">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="quantity">
                    <button class="quantity-decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove" data-id="${item.id}"><i class="fas fa-times"></i></button>
        `;
        
        keranjangContent.appendChild(itemElement);
    });
    
    const shipping = subtotal > 0 ? 15000 : 0;
    const total = subtotal + shipping;
    
    keranjangSummary.innerHTML = `
        <p><span>Subtotal:</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></p>
        <p><span>Ongkos Kirim:</span><span>Rp ${shipping.toLocaleString('id-ID')}</span></p>
        <p class="total"><span>Total:</span><span>Rp ${total.toLocaleString('id-ID')}</span></p>
        <a href="#checkout" class="cta-button">Lanjut ke Checkout</a>
    `;
    
    updateCheckoutReview();
}

function setupCheckout() {
    const checkoutForm = document.querySelector('#checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const orderData = {
            customer: {
                name: formData.get('nama'),
                email: formData.get('email'),
                phone: formData.get('telepon'),
                address: formData.get('alamat')
            },
            items: cart,
            payment: formData.get('pembayaran'),
            notes: formData.get('catatan'),
            timestamp: new Date().toISOString(),
            status: 'Pending'
        };
        
        const orders = JSON.parse(localStorage.getItem('skincare_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('skincare_orders', JSON.stringify(orders));
        
        showReceipt(orderData);
        
        cart = [];
        localStorage.setItem('skincare_cart', JSON.stringify(cart));
    });
}

function updateCheckoutReview() {
    const checkoutItems = document.querySelector('.checkout-items');
    const checkoutTotal = document.querySelector('.checkout-total');
    
    if (!checkoutItems || !checkoutTotal) return;
    
    checkoutItems.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="item-price">Rp ${itemTotal.toLocaleString('id-ID')}</div>
        `;
        
        checkoutItems.appendChild(itemElement);
    });
    
    const shipping = subtotal > 0 ? 15000 : 0;
    const total = subtotal + shipping;
    
    checkoutTotal.innerHTML = `
        <span>Total:</span>
        <span>Rp ${total.toLocaleString('id-ID')}</span>
    `;
}

function showReceipt(orderData) {
    const strukSection = document.querySelector('#struk');
    if (!strukSection) return;
    
    const strukContainer = strukSection.querySelector('.struk-container');
    
    let subtotal = 0;
    let itemsHTML = '';
    
    orderData.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="struk-item">
                <div class="struk-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="struk-item-price">
                    Rp ${itemTotal.toLocaleString('id-ID')}
                </div>
            </div>
        `;
    });
    
    const shipping = 15000;
    const total = subtotal + shipping;
    const date = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    strukContainer.innerHTML = `
        <div class="struk-header">
            <h2>Struk Pembayaran</h2>
            <p>Skincare Shop</p>
        </div>
        
        <div class="struk-info">
            <p><span>Tanggal:</span><span>${date}</span></p>
            <p><span>Nama:</span><span>${orderData.customer.name}</span></p>
            <p><span>Alamat:</span><span>${orderData.customer.address}</span></p>
            <p><span>Metode Pembayaran:</span><span>${orderData.payment}</span></p>
        </div>
        
        <div class="struk-items">
            ${itemsHTML}
        </div>
        
        <div class="struk-summary">
            <p><span>Subtotal:</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></p>
            <p><span>Ongkos Kirim:</span><span>Rp ${shipping.toLocaleString('id-ID')}</span></p>
            <p class="total"><span>Total:</span><span>Rp ${total.toLocaleString('id-ID')}</span></p>
        </div>
        
        <div class="struk-footer">
            <p>Terima kasih telah berbelanja di Skincare Shop!</p>
            <p>Semoga produk kami membuat kulitmu sehat dan cantik.</p>
        </div>
        
        <div class="struk-actions">
            <button class="btn-print" onclick="window.print()"><i class="fas fa-print"></i> Cetak</button>
            <button class="btn-home" onclick="window.location='#home'"><i class="fas fa-home"></i> Kembali ke Beranda</button>
        </div>
    `;
    
    strukSection.style.display = 'flex';
    
    window.location.href = '#struk';
}

function setupWhatsAppButton() {
    const waFloat = document.createElement('a');
    waFloat.href = "https://wa.me/+6281231192475?text=Halo%20Skincare%20Shop%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda";
    waFloat.className = "wa-float";
    waFloat.target = "_blank";
    waFloat.innerHTML = '<span class="wa-text">Chat</span><i class="fab fa-whatsapp"></i>';
    
    document.body.appendChild(waFloat);
    
    setTimeout(() => {
        waFloat.classList.add('animated');
    }, 2000);
}
