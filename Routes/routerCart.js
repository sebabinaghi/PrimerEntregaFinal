import { Router } from "express";
import { carrito, Productos } from "../src/Dao/index.js";

const routerCart = Router()


routerCart.get("/:Id",async (req,res)=>{

    const {carritoId} = req.params;

    const cart =  await carrito.getById(Number(carritoId))
    if(!cart) return res.send("Error, no existe carrito")

    res.send({carrito:cart})

}  )


routerCart.delete("/:carritoId",async (req,res)=>{
   
        
        const {carritoId} = req.params;

    const cart =  await carrito.getById(Number(carritoId))
    if(!cart) return res.send("Error, no existe carrito")
    const Carteliminado =  await carrito.deleteById(carritoId)

    res.send({Carteliminado, mensaje:"carrito eliminado"})
        
}  )



routerCart.post("/",  async (req,res)=>{
    const Firstcart={timestamp : new Date().toLocaleDateString(),productos:[] }
    const cart= await carrito.save(Firstcart);
    res.send({cartId:cart.id})
}  )


routerCart.post("/:carritoId/productos",  async (req,res)=>{
    const {productoId} = req.body;
    const {carritoId} = req.params;
    
    const cart =  await carrito.getById(Number(carritoId))

    if(!cart) return res.send("Error, no existe carrito")

    const producto = await Productos.getById(Number(productoId))

    
    if(!producto) return res.send("Error, no existe ese producto")

    cart.productos.push(producto)

    const carritoActualizado = await carrito.updateById(Number(carritoId),cart)

    res.send({ mensaje: "producto añadido"  ,cart: carritoActualizado})
}  )


routerCart.delete("/:carritoId/productos/:id_prod", async (req,res)=>{

        const {carritoId} = req.params
        const {id_prod} = req.params

        const cart = await carrito.getById(Number(carritoId))
        if(!cart) {res.send("carrito no encontrado")}
        else{
            const product = await Productos.getById(Number(id_prod))
            if(!product) return res.send("producto no encontrado")


            const elementoEncontrado = cart.productos.findIndex(Element=> Element.id == id_prod)


            if(elementoEncontrado === -1) return res.send("producto no encontrado")
            cart.productos.splice(elementoEncontrado,1)

            res.send({ success:true , mensaje : `se elemino del carrito ${carritoId} el producto con el Id ${id_prod} ` })
        }

        const carritoActualizado = await carrito.updateById(Number(carritoId),cart)
        res.send({success:true, cart:carritoActualizado})
})



export {routerCart}