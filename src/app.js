const express = require("express") ;
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/product.router.js");
const cartsRouter = require("./routes/carts.router.js"); 

app.use(express.json());

//Rutas
app.use("/api/products", productsRouter );
app.use("/api/carts", cartsRouter); 

// const productos = [
//     {id:1, title:"vaso", description:"El mejor", code:"Abc123", price:200,status: true, stock:5,category:"bazar",thumbnails:[]},
//     {id:2, title:"plato", description:"El mejor", code:"Abc123", price:200,status: true, stock:5,category:"bazar",thumbnails:[]},
//     {id:3, title:"cuchillo", description:"El mejor", code:"Abc123", price:200,status: true, stock:5,category:"bazar",thumbnails:[]},
//     {id:4, title:"tenedor", description:"El mejor", code:"Abc123", price:200,status: true, stock:5,category:"bazar",thumbnails:[]}
// ];

// const carritos = [];





app.listen(PUERTO,()=>{
    console.log(`escuchando en el puerto ${PUERTO}`);
})