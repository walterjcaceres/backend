const express = require("express") ;
//import { ExpressHandlebars } from "express-handlebars";
const ExpressHandlebars = require("express-handlebars");
const app = express();
const PUERTO = 8080;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const viewsRouter = require("./routes/views.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js"); 
const viewsUserRouter = require("./routes/viewsUser.router.js")
const usersRouter = require("./routes/users.router.js"); 
const viewsCartsRouter = require("./routes/viewsCarts.router.js"); 
const initializePassport = require("./config/passport.config.js")
//const ProductManager = require("./dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");
const {Server} = require("socket.io")
const mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/products/', express.static('./src/public'));
initializePassport();


app.engine("handlebars",ExpressHandlebars.engine());
app.set("view engine","handlebars");
app.set("views","./src/views"); //estas configuraciones son para que funque handlebars

//Rutas
app.use("/api/products", productsRouter );
app.use("/products", viewsRouter );
app.use("/carts",viewsCartsRouter);
app.use("/api/carts", cartsRouter); 
app.use("/api/sessions",viewsUserRouter);
app.use("/",usersRouter);



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


//Conecto mongoose:

mongoose.connect("mongodb+srv://walterjcaceres:coderhouse70110@cluster0.ufccc.mongodb.net/Proyecto?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado correctamente a la DB"))
.catch((error)=>console.log("noo, todo mal, error",error))