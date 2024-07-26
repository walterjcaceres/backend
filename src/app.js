const express = require("express") ;
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js"); 

app.use(express.json());

//Rutas
app.use("/api/products", productsRouter );
app.use("/api/carts", cartsRouter); 



app.listen(PUERTO,()=>{
    console.log(`escuchando en el puerto ${PUERTO}`);
})