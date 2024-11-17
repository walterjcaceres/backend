const ProductServices = require('../services/product.service.js');

class ViewsProductController {

    async getProducts (req,res){
        const carritoId=req.user.cart;
        const page=req.query.page||1;
        const limit = req.query.limit||10;
        let sort = req.query.sort||null;
        const query = req.query.query||null;
        let objetosort;
        if(sort==="asc"){
            objetosort={
                price:1
            }
        }
        if(sort==="desc"){
            objetosort={
                price:-1
            }
        }

        
        
        const arrayProductos = await ProductServices.getProducts(limit,page,objetosort,query);
        const resultado = arrayProductos.docs.map(item=>{
            const {...spread}=item.toObject();
            return spread;
        })
        res.render("home",{
            producto:resultado,
            hasPrevPage:arrayProductos.hasPrevPage,
            hasNextPage:arrayProductos.hasNextPage,
            prevPage:arrayProductos.prevPage,
            nextPage:arrayProductos.nextPage,
            page:arrayProductos.page,
            totalPages:arrayProductos.totalPages,
            limit,
            sort,
            query,
            carritoId
    
        })
    
    }

    async getRealTime(req,res){


        const page=req.query.page||1;
        const limit = req.query.limit||10;
        let sort = req.query.sort||null;
        const query = req.query.query||null;
        let objetosort;
        if(sort==="asc"){
            objetosort={
                price:1
            }
        }
        if(sort==="desc"){
            objetosort={
                price:-1
            }
        }
        
        
        const arrayProductos = await ProductServices.getProducts(limit,page,objetosort,query);
        const resultado = arrayProductos.docs.map(item=>{
            const {...spread}=item.toObject();
            return spread;
        })

        res.render("realTimeProducts",{
            producto:resultado,
            hasPrevPage:arrayProductos.hasPrevPage,
            hasNextPage:arrayProductos.hasNextPage,
            prevPage:arrayProductos.prevPage,
            nextPage:arrayProductos.nextPage,
            page:arrayProductos.page,
            totalPages:arrayProductos.totalPages,
            limit,
            sort,
            query
    
        })
    
    }
}


module.exports = new ViewsProductController ();