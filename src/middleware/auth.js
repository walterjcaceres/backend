

function soloAdmin(req,res,next){
    if(req){
        if(req.user.role==="admin"){
            next();
        } else {
            res.status(403).send("Acceso denegado, sitio solo para Administradores.")
        }
    }

}

function soloUser(req,res,next){
    if(req){
    if(req.user.role==="user"){
        next();
    } else {
        res.status(403).send("Acceso denegado, sitio solo para Clientes.")
    }
}
}



module.exports = { soloAdmin, soloUser };