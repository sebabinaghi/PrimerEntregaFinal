// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat"
// const dayjs = require("dayjs")
// const customParseFormat = require("dayjs/plugin/customParseFormat")
const socket = io("http://localhost:8080")
const FormularioProducto = document.getElementById("product-form")
const ContendorProductos = document.getElementById("contendor")

// DOM CHAT

// dayjs.extend(customParseFormat)

let message = document.getElementById("message")
let username = document.getElementById("username")
let send = document.getElementById("send")
let output = document.getElementById("output")
let actiion = document.getElementById("actions")

send.addEventListener("click",function(){
    socket.emit("chat:message", {
        message:message.value,
        username: username.value,
    })
})

socket.on("chat:message", function(data){
    const date = new Date().toLocaleDateString()
    // const dataFormateada = dayjs(date).format("DD/MM/YYYY  hh:mm:ss ")
    output.innerHTML+= `<p><strong>${data.username}:   </strong> ${data.message}  ${date}  </p>   `
   
} )



// PRODUCTOS

FormularioProducto.addEventListener("submit", (e)=>{
    e.preventDefault()
    const formData = new FormData(FormularioProducto)
    const formValues = Object.fromEntries(formData)
    FormularioProducto.reset()
    socket.emit("nuevo producto",formValues )
    console.log (formValues)
})

socket.on("all products", producto =>{
    renderProduct(producto)
} )


const renderProduct = async(productos)=>{
    const respuesta = await fetch("/assets/templates/tabla-productos.hbs")
    const template = await respuesta.text()    
    // compile the template
  const compiledTemplate = Handlebars.compile(template);
  
  const html = compiledTemplate({productos})
  ContendorProductos.innerHTML=html
}