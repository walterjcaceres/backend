async function AddProductToCart(productId,cartId,quantity) {
    console.log("prod:",productId);
    console.log("cart:",cartId);
    console.log("cant:",quantity);
    try {
        const response = await fetch(`../api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity:parseInt(quantity) })
        });

        if (!response.ok) {
            throw new Error("Error al agregar el producto al carrito");
        }

        const data = await response.json();
        console.log("producto agregado");
    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al agregar el producto al carrito");
    }
}
