$(document).ready(function () {

    
    let listaProductos = $('#lista-productos');
    let carritoHTML = $('#carritoHTML')
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let montoTotal = $('#montoTotal');
  


    if (carrito[0]) {

        actualizarCarrito();
    }









    //si hace click dentro del container de listaProductos
    listaProductos.click(function agregarProducto(e) {
        e.preventDefault();
        //busca una clase que sea interaction-añadir
        if (e.target.classList.contains('interaction-añadir')) {
            //sube hasta la card y la guarda
            const cardProducto = e.target.parentElement;
            console.log(cardProducto);
            //lo paso como parametro a la funcion
            obtenerDatosProducto(cardProducto);
        }

        mensajeCreado();
    })

    function obtenerDatosProducto(cardProducto) {

        //creo el objeto
        const producto = {
            nombre: $(cardProducto).children('#card-body').children('#card-title').text(),
            imagen: $(cardProducto).children('a').children('img').attr('src'),
            precio: $(cardProducto).children('#card-body').children('#precio').text(),
            cantidad: 1,
            id: $(cardProducto).children('#btn').data('id')

            
        }
        
        //lo empujo al carrito
        carrito.push(producto);
       

        actualizarCarrito();

    }


    function actualizarCarrito() {


        let contenidoCarrito = ''
        carritoHTML.html('');



        //recorre el carrito y lo imprime
        $(carrito).each(e => {

            let nombre = carrito[e].nombre;
            let imagen = carrito[e].imagen;
            let precio = carrito[e].precio;
            let cantidad = carrito[e].cantidad;
            let id = carrito[e].id;



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

              
            </div>

              `


        })

        //<a href="" class='borrar-producto'  data-id="${id}">QUITAR</a>





        carritoHTML.html(contenidoCarrito)
        actualizarStorage()
        actualizarPrecio()
    }

    carritoHTML.click(function borrarProducto(e) {
        
        //si hizo click en el btn con la clase borrar-producto
        if (e.target.classList.contains('borrar-producto')) {

            //busca el id de ese btn
            let id = e.target.getAttribute('data-id');
            console.log(id)
            //filtra del carrito y quita el objeto con ese id
            carrito = carrito.filter(producto => producto.id != id);
            console.log(carrito)

            actualizarCarrito()
            actualizarStorage()
            //actualizarPrecio()
        }
    })

   
    function actualizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }







    
    function actualizarPrecio(){
        let total = 0
        console.log()
        
        $(carrito).each(function(e){
          
            total +=carrito[e].precio;
           
            console.log(total)
        })
        console.log(total)
        $(montoTotal).html(total)
    }
  
    


    

    //animaciones y mensajes
    $('#btn-inicio').click( function(e) { 
        e.preventDefault();
        //Animamos sus propiedades CSS con animate
        $('html, body').animate({
            scrollTop: $("body").offset().top  
        }, 1000);
    } );

    $('#btn-carrito').click( function(e) { 
        e.preventDefault();
        //Animamos sus propiedades CSS con animate
        $('html, body').animate({
            scrollTop: $("#carritoContainer").offset().top  
        }, 1000);
    } );

    function mensajeCreado(){
        $('#mensaje').animate({
            left: 0 
        }).delay(3000).animate({
            left: -1000
        });
        
    }

})