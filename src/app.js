const express = require("express") ;
//import { ExpressHandlebars } from "express-handlebars";
const ExpressHandlebars = require("express-handlebars");
const app = express();
const PUERTO = 8080;
const viewsRouter = require("./routes/views.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js"); 
const ProductManager = require("./managers/product-manager.js"); 
const manager = new ProductManager("./src/data/productos.json");
const {Server} = require("socket.io")

app.use(express.json());
app.use('/products/', express.static('./src/public'));


app.engine("handlebars",ExpressHandlebars.engine());
app.set("view engine","handlebars");
app.set("views","./src/views"); //estas configuraciones son para que funque handlebars

//Rutas
app.use("/api/products", productsRouter );
app.use("/products", viewsRouter );
app.use("/api/carts", cartsRouter); 



const httpServer = app.listen(PUERTO,()=>{
    console.log(`escuchando en el puerto ${PUERTO}`);
})

const io = new Server(httpServer);

io.on("connection", async (socket)=>{
    console.log("un cliente se conecto");
    
    socket.on("mensaje",async(data)=>{
        console.log(data);

        socket.emit("saludito","hola front, soy el server pa");
        
        const arrayProductos = await manager.getProducts();
        socket.emit("array",arrayProductos);
    })

    socket.on("eliminar",async(data)=>{
        console.log(data);
        await manager.deleteProduct(data);
        console.log(data);
        
        const arrayProductos = await manager.getProducts();
        socket.emit("array",arrayProductos);
    })

    socket.on("agregar",async(data)=>{
        
        await manager.addProduct(data);
        
        const arrayProductos = await manager.getProducts();
        socket.emit("array",arrayProductos);
    })

    
    
})