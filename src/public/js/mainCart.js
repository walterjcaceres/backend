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


// async function purchase(cartId,email) {


//     try {
//         const response = await fetch(`../api/carts/${cartId}/purchase`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ purchaser: email })
//         });
        

//         if (!response.ok) {
//             throw new Error("Error al crear ticket!");
//         }

//         const data = await response.json();
//         return (data);
        
//     } catch (error) {
//         console.error('Error:', error);
//         alert("Hubo un problema al crear ticket");
//     }
// }