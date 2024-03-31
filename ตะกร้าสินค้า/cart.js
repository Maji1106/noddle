const cart = {};

document.querySelectorAll(".button-86").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    const productElement = document.createElement("p");
    productElement.textContent = `เมนูที่ ${productId}: ${item.quantity} x ฿${item.price} = ฿${itemTotalPrice}`;
    cartElement.appendChild(productElement);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `ราคารวม: ฿${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

function printCartToPDF() {
  // Open a new window for printing
  const printWindow = window.open("", "_blank");

  // Set up the content to be printed
  let printContent = "<h1>รายการเมนูที่ถูกเพิ่มในตะกร้า</h1>";

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    printContent += `<p>เมนูที่ ${productId}: ${item.quantity} x ฿${item.price} = ฿${itemTotalPrice}</p>`;
  }

  // Add total price to print content
  let totalPrice = calculateTotalPrice();
  printContent += `<p>ราคารวม: ฿${totalPrice}</p>`;

  // Write the content to the print window
  printWindow.document.write(printContent);

  // Print the content
  printWindow.print();

  // Close the print window after printing
  printWindow.close();
}

// Function to calculate total price
function calculateTotalPrice() {
  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
  }
  return totalPrice;
}

// Function to remove an item from the cart
function removeItem(productId) {
    if (cart[productId]) {
        // Decrease quantity by 1
        cart[productId].quantity--;
        
        // If quantity reaches zero, remove the item from the cart
        if (cart[productId].quantity === 0) {
            delete cart[productId];
        }
        
        // Update cart display
        updateCartDisplay();
    }
}
