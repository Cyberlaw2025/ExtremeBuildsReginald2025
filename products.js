// Global variables for products and selected items
const products = [
    { id: 1, name: "🔥GPU CPU Combo - Sapphire Tech 11323-02-20G Bundle with AMD cpu🔥", price: 1078.99, image: "../Assets/images/img(1).jpg" },
    { id: 2, name: "🔥AMD's Radeon RX 9070 XT Graphics Card GDDR7 16GB🔥", price: 687.99, image: "../Assets/images/img(2).jpg" },
    { id: 3, name: "🔥ASUS TUF Gaming GeForce RTX 5090 32GB GDDR7 OC Edition TUF-RTX5090-O32G-GAMING PCI-Express 5.0 DLSS 4.0 Graphics Card🔥", price: 2569.99, image: "../Assets/images/img(3).jpg" },
    { id: 4, name: "🔥GIGABYTE Gaming GeForce RTX 5090 32GB GDDR7 PCI Express 5.0 ATX Graphics Card GV-N5090GAMING OC-32GD🔥", price: 2875.99, image: "../Assets/images/img(4).jpg" },
    { id: 5, name: "🔥Intel Core Ultra 9 285K - Core Ultra 9 (Series 2) Arrow Lake 24-Core (8P+16E), LGA 1851, 125W Desktop Processor🔥", price: 612.99, image: "../Assets/images/img(5).jpg" },
    { id: 6, name: "🔥Intel Core Ultra 9 285 - Core Ultra 9 (Series 2) Arrow Lake 24-Core (8P+16E), LGA 1851, 65W Desktop Processor🔥", price: 598.99, image: "../Assets/images/img(6).jpg" },
    { id: 7, name: "🔥CORSAIR Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000 (PC5 48000) Desktop Memory Model🔥", price: 329.99, image: "../Assets/images/img(7).jpg" },
    { id: 8, name: "🔥AMD Ryzen 7 9800X3D - Ryzen 7 9000 Series Zen 5 8-Core 5.2 GHz - Socket AM5 120W - AMD Radeon Graphics Desktop Processor🔥", price: 574.99, image: "../Assets/images/img(8).jpg" },
    { id: 9, name: "🔥AMD Ryzen 7 7800X3D - Ryzen 7 7000 Series Zen 4 8-Core 4.2 GHz - Socket AM5 120W - AMD Radeon Graphics Desktop Processor🔥", price: 468.99, image: "../Assets/images/img(9).jpg" },
];

let selectedProducts = [];

// Load products on products page
if (document.getElementById("productList")) {
    const productList = document.getElementById("productList");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button id="add-${product.id}" onclick="addToChart(${product.id})">Add to Chart</button>
            <button id="remove-${product.id}" onclick="removeFromChart(${product.id})" style="display:none;">Remove from Chart</button>
            <label for="quantity-${product.id}">Quantity:</label>
            <input type="number" id="quantity-${product.id}" name="quantity" min="1" value="1" style="width: 50px;" />
        `;
        productList.appendChild(productDiv);
    });

    document.getElementById("checkOutButton").addEventListener("click", checkout);
    document.getElementById("logoutButton").addEventListener("click", logout); // Assuming you have a logout button
}

// Function to add product to chart
function addToChart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0 && !selectedProducts.some(p => p.product.id === productId)) {
        const product = products.find(p => p.id === productId);
        selectedProducts.push({ product, quantity });
        document.getElementById(`add-${productId}`).style.display = 'none';
        document.getElementById(`remove-${productId}`).style.display = 'inline';
    }
}

// Function to remove product from chart
function removeFromChart(productId) {
    const index = selectedProducts.findIndex(p => p.product.id === productId);
    if (index > -1) {
        selectedProducts.splice(index, 1);
        document.getElementById(`add-${productId}`).style.display = 'inline';
        document.getElementById(`remove-${productId}`).style.display = 'none';
    }
}

// Checkout function
function Checkout() {
    if (selectedProducts.length > 0) {
        // Store selected products in local storage or handle as needed
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        window.location.href = "invoice.html"; // Redirect to invoice page
    } else {
        alert("Please select at least one product to checkout.");
    }
}

// Logout function
function Logout() {
    // Clear selected products from local storage
    localStorage.removeItem("selectedProducts");
    // Redirect to login page or home page
    window.location.href = "index.html"; // redirect to login/index page URL
}


function openCart() {
    const cartModal = document.getElementById("cartModal");
    const cartItems = document.getElementById("cartItems");
    
    // Clear previous items
    cartItems.innerHTML = '';

    // Display selected products
    if (selectedProducts.length > 0) {
        selectedProducts.forEach(item => {
            const product = item.product;
            const quantity = item.quantity;
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:50px;"/>
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)} x ${quantity}</p>
                <p>Total: $${(product.price * quantity).toFixed(2)}</p>
            `;
            cartItems.appendChild(productDiv);
        });
    } else {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    // Set display to block and then add the show class for fade-in effect
    cartModal.style.display = 'block'; // Set display to block first
    setTimeout(() => {
        cartModal.classList.add("show"); // Add the show class to trigger fade-in
    }, 10); // Small timeout to allow the display change to take effect
}

function closeCart() {
    const cartModal = document.getElementById("cartModal");
    cartModal.classList.remove("show"); // Remove the show class to trigger fade-out

    // Wait for the transition to finish before setting display to none
    cartModal.addEventListener('transitionend', function() {
        if (!cartModal.classList.contains('show')) {
            cartModal.style.display = 'none'; // Set display to none after fade out
        }
    }, { once: true }); // Use { once: true } to ensure the event listener is removed after it runs
}


