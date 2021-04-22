$(document).ready(function(){

    let listaProductos = $('#lista-productos');
   let carritoHTML = $('#carritoHTML')
   let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


//   $(carritoHTML).on('click', borrarProducto())
   if (carrito[0]) {
       
       actualizarCarrito();
   }



    






   listaProductos.click(function agregarProducto(e){
       e.preventDefault();
       if(e.target.classList.contains('interaction-añadir')){
           const cardProducto = e.target.parentElement;
           console.log(cardProducto);
           obtenerDatosProducto(cardProducto);
       }
   })

   function obtenerDatosProducto(cardProducto){
       
       
        const producto = {
           nombre: $(cardProducto).children('#card-body').children('#card-title').text(),
           imagen: $(cardProducto).children('a').children('img').attr('src'),
           precio: $(cardProducto).children('#card-body').children('#precio').text(),
           cantidad: 1,
           id: $(cardProducto).children('#btn').data('id')

       
        }

        console.log(producto)
        carrito.push(producto);
        console.log(carrito)

        actualizarCarrito();

    }
    
    
    function actualizarCarrito(){
        console.log('EL CARRITO')
        console.log(carrito)
        
        let contenidoCarrito=''
        carritoHTML.html('');
        console.log('--------------')
        console.log(carrito[0].nombre)

            
            $(carrito).each(e =>{
                console.log('--------------')
                console.log(e.nombre)
                let nombre = carrito[e].nombre;
                let imagen =  carrito[e].imagen;
                let precio =  carrito[e].precio;
                let cantidad =  carrito[e].cantidad;
                let id =  carrito[e].id;

            
                
                contenidoCarrito += `
                  <div class="producto" id='producto'> 
                  <div class="fila nombre "> 
                      <div class="img"> 
                          <img src="${imagen}" alt="">
                  
                      </div>
                      <div class="nombreProd">
                          <p class='nombreProducto'>${nombre}</p>
                      </div>
                  </div>
    
                  <div class="fila precios ">
                      <p class="price">
                          Price:
                      </p>
                      <p class="valor">
                          ${precio}
                      </p>
    
                  </div>
    
                  <div class="fila cantidad ">
                      <p class="Quantity">
                          Quantity:
                      </p>
                      <input type="number" class='cantidad-input' min="1" value='${cantidad}'>
                  </div>
    
                  <div class="quitar">
                      
                      <button type='button'  class='borrar-producto' data-id="${id}">QUITAR</button>
                  </div>
              </div>
              `


            })
            
            //<a href="" class='borrar-producto'  data-id="${id}">QUITAR</a>
           



            
            carritoHTML.html(contenidoCarrito)
            actualizarStorage()
        
    }   
/*
    function borrarProducto(e){
        

        if(e.target.classList.contains('borrar-producto')){
            const id = e.target.attr('data-id');

            carrito = carrito.filter(producto => producto.id !== id);


            actualizarCarrito()
            actualizarStorage()
        }
    }
*/
    function actualizarStorage(){
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
})