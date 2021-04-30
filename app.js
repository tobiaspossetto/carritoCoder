$(document).ready(function () {

    //definicion de variables 
    let listaProductos = $('body') ;
    let carritoHTML = $('#carritoHTML')
    let montoTotal = $('#montoTotal');
    
    // carrito va a traer lo que guardo el localStorage, si no tiene nada entonces va a estar vacio
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    //el array donde voy a guardar los objetos del JSON
    let productosJSON = [];
    
    //traigo el array de objetos
    $.ajax("productos.json").done(function(data) {

        productosJSON = data;
        
        //cuando lo haya traido ejecuto renderizar HTML
        renderizarHTML()
    });
    
    //si el carrito tiene algun producto de antes actualizo el carrito para que se muestre
    if (carrito[0]) {

        actualizarCarrito();
    }

    //---------------------------
    //BUSCADOR

    let buscarBtn = $('#buscarBtn');

    //si hace click en el btn de buscar
    $(buscarBtn).click(function(e){
        e.preventDefault();

        
        let resultadoBusqueda = $('#resultadoBusqueda');
        $(resultadoBusqueda).text('')
        let mensajeBusqueda = $(document.createElement('h5'))
        $(mensajeBusqueda).text('Resultado de busqueda:')

        //guarda el valor del input
        let inputBuscador = $('#buscarInput').val();
        //pasa todo a minuscula
        inputBuscador = inputBuscador.toLocaleLowerCase();

        //si el input no estaba vacio
        if(inputBuscador != ''){

            //busca en los productos que traje del JSON si coincide el titulo con lo que busco el usuario, pasandolo a minusculas
            let resultado = productosJSON.filter(e => e.title.toLocaleLowerCase().includes(inputBuscador));
            
          
            
    
            //si encontro algo
            if(resultado){
                  //agrego un h5  que dice 'Resultado'
                $(resultadoBusqueda).append(mensajeBusqueda);
                //recorre el array
                resultado.forEach(e=>{
                    
                    const {id,title,cantidad,price,img} = e;
              
           
               
                    //creo las etiquetas con sus atributos para formar la card, agregando los valores correspondientes
                    //---------------------
                                    let contenedorCard = $(document.createElement('div'));
                                    $(contenedorCard).attr('data-id', id);
                                    $(contenedorCard).addClass('card h-100 mt-5')
                                        let cardA = $(document.createElement('a'));
                                    
                                        let cardAimg = $(document.createElement('img'));
                                        $(cardAimg).addClass('card-img-top')
                                        $(cardAimg).attr('src', img);
                                    let cardInfo = $(document.createElement('div'));
                                    
                                        $(cardInfo).attr('id', 'card-body');
                                        $(cardInfo).addClass('card-body')
                                        let cardInfoTitle = $(document.createElement('h4'))
                                        $(cardInfoTitle).attr('id', 'card-title');
                                        $(cardInfoTitle).addClass('card-title')
                                        $(cardInfoTitle).text(title);
                                        let cardInfoPrecio = $(document.createElement('h5'))
                                        $(cardInfoPrecio).attr('id', 'precio');
                                        $(cardInfoPrecio).addClass('precio')
                                        $(cardInfoPrecio).text(`$ ${price}`);
                                        let cardInfoText = $(document.createElement('p'))
                                        $(cardInfoText).text('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur');
                                        $(cardInfoText).addClass('card-text')
                                    let cardBtn = $(document.createElement('button'))
                                    $(cardBtn).addClass('btn btn-warning interaction-añadir')
                                    $(cardBtn).attr('id', 'btn');
                                    $(cardBtn).attr('type', 'button');
                                    $(cardBtn).attr('data-id', id);
                                    $(cardBtn).text('Añadir al carrito');
                    
                    
                    
                                    $(cardInfo).append(cardInfoTitle);
                                    $(cardInfo).append(cardInfoPrecio);
                                    $(cardInfo).append(cardInfoText);
                                    $(cardA).append(cardAimg);
                                    $(contenedorCard).append(cardA)
                                    $(contenedorCard).append(cardInfo)
                                    $(contenedorCard).append(cardBtn)
                    //---------------------
                   
                   
                   //agrego al div la card, cada vez que se recorre el for
                    $(resultadoBusqueda).append(contenedorCard);
                    /*
                    resultadoHTML +=`
                    <div data-id="${id}" class="card h-100">
                        <a href="#"><img class="card-img-top" src="${img}" alt=""></a>
                        <div class="card-body" id='card-body'>
                            <h4 class="card-title" id='card-title'>${title}</h4>
                            <h5 class='precio' id='precio'>${price}</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!
                            </p>
                        </div>
        
                        <button type="button" class="btn btn-warning interaction-añadir" id='btn' data-id='${id}'>Añadir al
                        carrito</button>
      
                   </div>
                    
                    `*/
                })
            }
            //$(resultadoBusqueda).html(resultadoHTML)
        }else{
            //si no habia nada en la busqueda simplemente no muestra nada
            $(resultadoBusqueda).html('')
        }
       

       
    })


    






    //si hace click dentro del container de listaProductos
    $(listaProductos).click(function agregarProducto(e) {
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
            
            //recorro el array de los productos 
            //si la Card que me guardo coincide con algun id de los productos entonces crea el objeto producto
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

        
       
        
        //si producto ya existe en el carrito prodExistente = true
        const prodExistente = carrito.find(prod => prod.id === producto.id)

        if(prodExistente){
            //si existe se incrementa la cantidad
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
            //si no existe solo lo empuja al carrito
            carrito.push(producto);
        }
        
        actualizarCarrito();
       

        
        
    }


    function actualizarCarrito() {


       //inicia vaciando el carrito
        carritoHTML.html('');



        //recorre el carrito y lo imprime
        $(carrito).each(e => {

            let nombre = carrito[e].nombre;
            let imagen = carrito[e].imagen;
            let precio = carrito[e].precio;
            let cantidad = carrito[e].cantidad;
            let id = carrito[e].id;
            //crea cada card del carrito y lo imprime con sus correspondientes datos del productos
            //-----------
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
                                $(btnQuitar).addClass('borrar-producto btn btn-danger');
                                $(btnQuitar).attr('type', 'button');
                                $(btnQuitar).attr('data-id',id);
                                $(btnQuitar).text('Eliminar');

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
            //---------------------

                //se lo agrega al carrito
                carritoHTML.append(divProducto)
            
        })
        actualizarStorage()
        actualizarPrecio()
    }
    
    //renderizar productos
    function renderizarHTML(){
        //renderiza los productos en el html
        let listaProductos = $('#lista-productos');
        $(listaProductos).html('');
       
        $(productosJSON).each(function (e){
            
            let title = productosJSON[e].title
            let img = productosJSON[e].img
            let price = productosJSON[e].price
            let id = productosJSON[e].id
            console.log(title,id,img,price)
            console.log(e)
            //crea los elementos para la card con sus respectivos datos del productos
            //----------------
                        let contenedorColCard = $(document.createElement('div'));
                    
                        $(contenedorColCard).addClass('col-lg-4 col-md-6 mb-4')
                    
                            let contenedorCard = $(document.createElement('div'));
                            $(contenedorCard).attr('data-id', id);
                            $(contenedorCard).addClass('card h-100')
                                let cardA = $(document.createElement('a'));
                                
                                    let cardAimg = $(document.createElement('img'));
                                    $(cardAimg).addClass('card-img-top')
                                    $(cardAimg).attr('src', img);
                                let cardInfo = $(document.createElement('div'));
                                
                                    $(cardInfo).attr('id', 'card-body');
                                    $(cardInfo).addClass('card-body')
                                    let cardInfoTitle = $(document.createElement('h4'))
                                    $(cardInfoTitle).attr('id', 'card-title');
                                    $(cardInfoTitle).addClass('card-title')
                                    $(cardInfoTitle).text(title);
                                    let cardInfoPrecio = $(document.createElement('h5'))
                                    $(cardInfoPrecio).attr('id', 'precio');
                                    $(cardInfoPrecio).addClass('precio')
                                    $(cardInfoPrecio).text(`$ ${price}`);
                                    let cardInfoText = $(document.createElement('p'))
                                    $(cardInfoText).text('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur');
                                    $(cardInfoText).addClass('card-text')
                                let cardBtn = $(document.createElement('button'))
                                $(cardBtn).addClass('btn btn-warning interaction-añadir')
                                $(cardBtn).attr('id', 'btn');
                                $(cardBtn).attr('type', 'button');
                                $(cardBtn).attr('data-id', id);
                                $(cardBtn).text('Añadir al carrito');
                
                
                
                                $(cardInfo).append(cardInfoTitle);
                                $(cardInfo).append(cardInfoPrecio);
                                $(cardInfo).append(cardInfoText);
                                $(cardA).append(cardAimg);
                                $(contenedorCard).append(cardA)
                                $(contenedorCard).append(cardInfo)
                                $(contenedorCard).append(cardBtn)
                                $(contenedorColCard).append(contenedorCard);
            //----------------               
                            
                            
            $(listaProductos).append(contenedorColCard);
        })


        //let cardProductoHTML =''
    
          
                   
        /////////////////////////////////
    }


    //funcion para editar la cantidad del producto
    $(carritoHTML).click(function cambiarCantidad(e){
        //dentro del carrito si hizo click en algun input con esa clase
        if (e.target.classList.contains('cantidad-input')) {
            //guarda el valor solicitado y el id del producto
            let inputCantidad = $(e.target).val();
            let idProducto =  $(e.target).attr('data-id')
            
            
            //recorre el carrito buscando el producto
            $(carrito).each(function(e){
                if(carrito[e].id == idProducto){
                    //le actualiza la cantidad
                    carrito[e].cantidad = Number(inputCantidad);
                    actualizarCarrito()
                    actualizarStorage()
                    actualizarPrecio()
                  
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
        //guarda el carrito en el storage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

 





    
    function actualizarPrecio(){

        let total = 0
        
        
        $(carrito).each(function(e){
            //suma todos los precios de los productos, multiplicando por la cantidad
            total +=carrito[e].precio * carrito[e].cantidad;
           
            
        })
        
        //imprime el monto total
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
        }).delay(500).animate({
            left: -5000
        });
        
    }

    function mensajeEliminado(){
        $('#eliminado').animate({
            left: 0 
        }).delay(500).animate({
            left: -5000
        });
        
    }

    //actualiza el precio al cargar el documento
    actualizarPrecio()
    
})
