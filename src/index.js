import express  from "express";
import { routerProductos,routerCart } from "../Routes/index.js";


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(PORT, ()=>  console.log (`Escuchando en puerto ${PORT}`))


app.use("/api/productos", routerProductos)
app.use("/api/carrito",routerCart)





