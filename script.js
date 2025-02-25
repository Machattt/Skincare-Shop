let cart = JSON.parse(localStorage.getItem("cart")) || [];

function tampilkanHalaman(idHalaman) {
    let halaman = document.querySelectorAll(".halaman");
    halaman.forEach(section => {
        section.style.display = "none"; // Sembunyikan semua halaman
    });

    let halamanAktif = document.getElementById(idHalaman);
    if (halamanAktif) {
        halamanAktif.style.display = "flex"; // Tampilkan halaman yang diklik
    }

    let navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => link.classList.remove("aktif"));

    let navAktif = document.getElementById("nav-" + idHalaman);
    if (navAktif) {
        navAktif.classList.add("aktif");
    }
}

// Saat halaman dimuat, tampilkan halaman Home
document.addEventListener("DOMContentLoaded", function () {
    tampilkanHalaman("home");
    updateStruk();
});

// Fungsi untuk menambah produk ke keranjang
function tambahKeKeranjang(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product} telah ditambahkan ke keranjang!`);
    updateStruk();
}

// Fungsi untuk menampilkan struk pembelian
function updateStruk() {
    const listStruk = document.getElementById("list-struk");
    const totalHarga = document.getElementById("total-harga");

    listStruk.innerHTML = ""; // Bersihkan struk sebelum diperbarui
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.product} - Rp ${item.price.toLocaleString("id-ID")} 
                        <button onclick="hapusItem(${index})">Hapus</button>`;
        listStruk.appendChild(li);
        total += item.price;
    });

    totalHarga.textContent = `Rp ${total.toLocaleString("id-ID")}`;
}

// Fungsi untuk menghapus item dari keranjang
function hapusItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateStruk();
}

// Fungsi untuk menangani pemesanan dan menampilkan detail di struk
document.getElementById("form-pemesanan").addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah halaman refresh

    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;
    let pembayaran = document.getElementById("pembayaran").value;
    let totalHarga = document.getElementById("total-harga").textContent;

    let detailPesanan = document.createElement("div");
    detailPesanan.innerHTML = `
        <h3>Detail Pemesanan</h3>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Alamat:</strong> ${alamat}</p>
        <p><strong>Metode Pembayaran:</strong> ${pembayaran}</p>
        <p><strong>Total Pembayaran:</strong> ${totalHarga}</p>
    `;

    // Tambahkan detail pemesanan ke struk
    let strukSection = document.getElementById("struk");
    let existingDetail = strukSection.querySelector("div#detail-pesanan");
    if (existingDetail) {
        existingDetail.remove(); // Hapus jika ada detail sebelumnya
    }

    detailPesanan.id = "detail-pesanan";
    strukSection.appendChild(detailPesanan);
});

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    tampilkanHalaman("home");
    updateStruk();
});