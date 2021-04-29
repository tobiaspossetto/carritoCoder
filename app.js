$(document).ready(function () {

    
    let listaProductos = $('#lista-productos');
    let carritoHTML = $('#carritoHTML')
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let montoTotal = $('#montoTotal');
    
    let productosJSON = [];
    let producto = {}
    
    $.ajax("productos.json").done(function(data) {
        productosJSON = data;
        console.log('listo')
        console.log(productosJSON)
    });
    
    if (carrito[0]) {

        actualizarCarrito();
    }

    








    //si hace click dentro del container de listaProductos
    listaProductos.click(function agregarProducto(e) {
        e.preventDefault();
        //busca una clase que sea interaction-añadir
        if (e.target.classList.contains('interaction-añadir')) {
            //sube hasta la card y la guarda
            const cardProducto = $(e.target.parentElement).attr('data-id');
            
            console.log(cardProducto);
            //lo paso como parametro a la funcion
            obtenerDatosProducto(cardProducto, productosJSON);
            mensajeCreado();
        }
        
       
    })

    function obtenerDatosProducto(cardProducto, productosJSON) {

        //creo el objeto
        
        $(productosJSON).each(function(e){
            
            
            if(cardProducto == productosJSON[e].id){
                
                producto = {
                    id: productosJSON[e].id,
                    cantidad: 1,
                    precio: productosJSON[e].price,
                    imagen: productosJSON[e].img,
                    nombre: productosJSON[e].title

                }
            }
        })

        console.log(producto)
       
        
        
        const prodExistente = carrito.find(prod => prod.id === producto.id)

        if(prodExistente){
            const productos = carrito.map(producto => {
                if(producto.id === prodExistente.id){
                    producto.cantidad++;
                    return producto;
                }else{
                    return producto;
                }

            })


            carrito = [...productos];
        }else{
            carrito.push(producto);
        }
        /*
        $(carrito).each(function(e){
            if(carrito[e].id === producto.id){
                carrito[e].cantidad= carrito[e].cantidad + 1
                console.log('encontrado')
                
            }else{
                
                console.log('añadido')
                actualizarCarrito();
            }
        })
        */
        actualizarCarrito();
        //console.log('carrito:')
       // console.log(carrito)

        
        
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

            let divProducto = $(document.createElement('div'));
           
            $(divProducto).addClass('producto');
            $(divProducto).attr('id', 'producto');
                let divFilaNombre = $(document.createElement('div'));
               
                $(divFilaNombre).addClass('fila nombre');
                
                    let filaNombreDivImg = $(document.createElement('div'))
                    
                    $(filaNombreDivImg).addClass('img');
                        let filaNombreImg = $(document.createElement('img'));
                        $(filaNombreImg).attr('src', imagen);
                        
                    let filaNombreDivNombre = $(document.createElement('div'))
                   
                    $(filaNombreDivNombre).addClass('nombreProd');
                        let filaNombreP = $(document.createElement('p'))
                        $(filaNombreP).addClass('nombreProducto');
                        $(filaNombreP).text(nombre)

                let divFilaPrecios = $(document.createElement('div'));
               
                $(divFilaPrecios).addClass('fila precios');
                     let pPrice = $(document.createElement('p'))
                     $(pPrice).addClass('price');
                     $(pPrice).text('Price:');
                     let pPriceValue = $(document.createElement('p'))
                     $(pPriceValue).addClass('valor');
                     $(pPriceValue).text(precio);

                let divFilaCantidad = $(document.createElement('div'));
               
                $(divFilaCantidad).addClass('fila cantidad');
                    let pCantidad = $(document.createElement('p'))
                    $(pCantidad).addClass('Quantity');
                    $(pCantidad).text('Quantity:')
                    let inputCantidad = $(document.createElement('input'))
                    $(inputCantidad).addClass('cantidad-input');
                    $(inputCantidad).attr('id', 'cantidad');
                    $(inputCantidad).attr('type', 'number');
                    $(inputCantidad).attr('data-id', id);
                    $(inputCantidad).attr('value' , cantidad)
                    $(inputCantidad).attr('min', 1);
                let divQuitar = $(document.createElement('div'));
               
                $(divQuitar).addClass('quitar');
                    let btnQuitar = $(document.createElement('button'))
                    $(btnQuitar).addClass('borrar-producto');
                    $(btnQuitar).attr('type', 'button');
                    $(btnQuitar).attr('data-id',id);
                    $(btnQuitar).text('Quitar');

                    $(divQuitar).append(btnQuitar);
                    $(divFilaCantidad).append(pCantidad);
                    $(divFilaCantidad).append(inputCantidad);
                    $(divFilaPrecios).append(pPrice);
                    $(divFilaPrecios).append(pPriceValue);
                    $(filaNombreDivNombre).append(filaNombreP)
                    $(filaNombreDivImg).append(filaNombreImg)
                    $(divFilaNombre).append(filaNombreDivImg)
                    $(divFilaNombre).append(filaNombreDivNombre)
                    $(divProducto).append(divFilaNombre);
                    $(divProducto).append(divFilaPrecios);
                    $(divProducto).append(divFilaCantidad);
                    $(divProducto).append(divQuitar);
            carritoHTML.append(divProducto)
            
            })
        actualizarStorage()
        actualizarPrecio()
    }
    
    $(carritoHTML).click(function cambiarCantidad(e){
        if (e.target.classList.contains('cantidad-input')) {
            let inputCantidad = $(e.target).val();
            let idProducto =  $(e.target).attr('data-id')
            console.log('---------------------')
            console.log(`cantidad = ${inputCantidad}`)
            console.log(`id = ${idProducto}`)
            console.log(carrito)
            

            $(carrito).each(function(e){
                if(carrito[e].id == idProducto){
                    carrito[e].cantidad = Number(inputCantidad);
                    actualizarCarrito()
                    actualizarStorage()
                    actualizarPrecio()
                    mensajeCreado();
                }
            })

        }

        
    })

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
            actualizarPrecio()
            mensajeEliminado()
        }
    })

   
    function actualizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

 





    
    function actualizarPrecio(){
        let total = 0
        console.log()
        
        $(carrito).each(function(e){
          
            total +=carrito[e].precio * carrito[e].cantidad;
           
            console.log(total)
        })
        console.log(total)
        $(montoTotal).html(`$${total}`)
    }
  
    


    

    //animaciones y mensajes
    $('#btn-inicio').click( function(e) { 
        e.preventDefault();
        //Animamos sus attriedades CSS con animate
        $('html, body').animate({
            scrollTop: $("body").offset().top  
        }, 1000);
    } );

    $('#btn-carrito').click( function(e) { 
        e.preventDefault();
        //Animamos sus attriedades CSS con animate
        $('html, body').animate({
            scrollTop: $("#carritoContainer").offset().top  
        }, 1000);
    } );

    function mensajeCreado(){
        $('#agregado').animate({
            left: 0 
        }).delay(3000).animate({
            left: -5000
        });
        
    }

    function mensajeEliminado(){
        $('#eliminado').animate({
            left: 0 
        }).delay(3000).animate({
            left: -5000
        });
        
    }
    actualizarPrecio()
    
})

/*contenidoCarrito += `
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
                      <input type="number" id='cantidad' data-id='${id}' class='cantidad-input' min="1" value='${cantidad}'>
                  </div>
    
                  <div class="quitar">
                      
                      <button type='button'  class='borrar-producto' data-id="${id}">QUITAR</button>
                  </div>
              </div>

              
            </div>

              `


              
              //<a href="" class='borrar-producto'  data-id="${id}">QUITAR</a>
              
              
              
              
              
              carritoHTML.html(contenidoCarrito)*/