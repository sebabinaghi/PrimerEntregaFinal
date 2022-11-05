import { ContainerFilesystem } from "../Containers/FilesystemContainer.js"

const Productos = new ContainerFilesystem("products")
const carrito = new ContainerFilesystem("carrito")

export {Productos,carrito}; 
