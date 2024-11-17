async function deleteItem(productId,cartId) {
    console.log("prod:",productId);
    console.log("cart:",cartId);

    try {
        const response = await fetch(`../api/carts/${cartId}/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el producto al carrito!");
        }

        location.reload()
        return console.log(response);

    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al eliminar el producto al carrito");
    }
}
