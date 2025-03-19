// Function to generate the invoice
function generateInvoice() {
    let selectedProducts;
    try {
        selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    } catch (error) {
        console.error("Error parsing selected products from local storage:", error);
        selectedProducts = [];
    }

    const invoiceDetails = document.getElementById("invoiceDetails");
    let total = 0;
    let invoiceHTML = "<h2>Invoice Details</h2><ul>";

    if (selectedProducts.length === 0) {
        invoiceHTML += "<li>No products selected.</li>";
    } else {
        selectedProducts.forEach(item => {
            const product = item.product; // Access the product object
            const quantity = item.quantity; // Access the quantity
            const productTotal = product.price * quantity;
            invoiceHTML += `<li>${product.name} - $${product.price.toFixed(2)} x ${quantity} = $${productTotal.toFixed(2)}</li>`;
            total += productTotal;
        });
    }

    // Calculate tax (15%) and final total
    const tax = total * 0.15;
    const finalTotal = total + tax;

    invoiceHTML += `</ul>
        <p><strong>Subtotal:</strong> $${total.toFixed(2)}</p>
        <p><strong>Tax (15%):</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${finalTotal.toFixed(2)}</p>
        <button onclick="confirmPurchase()">Confirm Purchase</button>`;

    invoiceDetails.innerHTML = invoiceHTML;
}

// Function to confirm purchase
function confirmPurchase() {
    alert("Purchase confirmed! Thank you for shopping with ExtremeBuilds.");
    localStorage.removeItem("selectedProducts");
    window.location.href = "products.html"; // Redirect back to products page
}

// Function to cancel invoice
function cancel() {
    localStorage.removeItem("selectedProducts");
    window.location.href = "products.html"; // Redirect back to products page
}

// Load the invoice when the page is ready
window.onload = generateInvoice;