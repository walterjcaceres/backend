async function purchase(cartId,email) {


    try {
        const response = await fetch(`../api/carts/${cartId}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ purchaser: email })
        });
        

        if (!response.ok) {
            throw new Error("Error al crear ticket!");
        }

        const data = await response.json();
        return console.log(data);

    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al crear ticket");
    }
}