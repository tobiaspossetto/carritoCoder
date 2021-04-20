$(document).ready(function(){

    let listaProductos = $('#lista-productos');
   let carritoHTML = $('#carritoHTML')
   let carrito = [];


   listaProductos.click(function agregarProducto(e){
       e.preventDefault();
       if(e.target.classList.contains('interaction-añadir')){
           const cardProducto = e.target.parentElement;
           console.log(cardProducto);
           obtenerDatosProducto(cardProducto);
       }
   })

   function obtenerDatosProducto(cardProducto){
       console.log($(cardProducto).children('h4').text())
       
       /*const producto = {
           nombre: cardProducto.$('h1').text()
       }*/
   }

})