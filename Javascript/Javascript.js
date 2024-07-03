// Codigo general aplicado para las paginas, especificamente, la de Index y Productos (Ingreso y Registro utilizaron solo el de Firebase code)

// Funcion utilizada para presentar una alerta al usuario cuando presiona la opcion de "Productos" en el Navbar presente en indexedDB, si presiona "Aceptar", sera redirigido a la pagina de Registro y si presiona "Cancelar", no se realiza ningun proceso
  function Advertencia_productos() {
    if (confirm("Para acceder a nuestros productos, debe registrarse")) {
        window.location.href = "Registro.html";
      } 
      else {}
  }

// La funcion "openNav()" es aquella que sirve para abrir el menu desplegable presente en la pagina de Productos; mientras "closeNav()" lo cierra. Ambos se realizan modificando los estilos aplicados en el propio menu para que sea o no visible y en el contenido de la pagina para que se mueva junto al menu
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0px";
    document.getElementById("main").style.marginRight= "0px";
  }

// A continuacion, se presenta el codigo utilizado para agregar productos en el menu de compras de la pagina Productos

  // Se crea el contador "i", este sera utilizado para identificar cada producto presente en la lista de compras, a la vez, cual fue el boton de "borrar" que ha sido presionado, esto sera util para pasos futuros
    let i=0

  // Se crea la funcion que sera utilizada para crear y agregar un nuevo producto en la lista de compras; el parametro "boton_id" almacena el identificador del boton de "Agregar al carrito" que haya sido presionado, el identificador sirve para almacenar el nombre del producto a agregar. En la funcion se realiza el siguiente procedimiento:
    function Agregar_producto(boton_id) {
      
      //Se crea la constante "Lista_car", que almacena a la lista generada para el carrito de compras, la cual almacenaras los productos.
        const Lista_car=document.getElementById('Lista_car')

      // Se crean una serie de elementos (etiquetas vacias) HTML, lo cuales son las piezas que construiran la estructura de los productos, estos se almacenan en sus respectivos constantes y variables; se crean un indice de lista (li), dos divisores (div) y un boton (buton), respectivamente
        const elemento_li=document.createElement("li") //Se usara para enlistar el producto
        const texto_li=document.createElement("div") //Se usara para presentar el nombre del producto
        let boton_li=document.createElement("div") //Se usara para dar un espacio al boton "borrar"
        const borrar=document.createElement("button") //Se usara para agregar el boton de "borrar"

      /*Se establecen en "elemento_li" y "borrar" un identificador que este dado por el contador "i", de esta forma ambos poseen el mismo id y este es numerico (esto es importante para pasos futuros)
      Nota: Si bien es contraintuitivo debido a que el identificador se caracteriza por ser unico, es la unica forma en la que se ha podido realizar el proceso ideado*/
        elemento_li.setAttribute('id',i)
        borrar.setAttribute('id',i)

      //Se agregan a "elemento_li" y "borrar" las clases que se utilizan para aplicar sus respectivos estilos
        elemento_li.classList.add("list-group-item","opcion_car")
        borrar.classList.add("btn", "btn-default")

      //Se agrega al boton de "borar" generado, la caracteristica de que al ser presionado, se ejecutara la funcion "Borrar", de parametro "id_boton_b"; en la funcion se realiza el procedimiento:
        borrar.addEventListener("click",function Borrar(id_boton_b){

          // Se almacena en el parametro "id_boton_b" el identificador del boton presionado
            id_boton_b=this.id

          // Se crea la variable "lista_opciones", en esta se almacenaran todas los indices de listas que esten presentes en la lista del carrito de compras, debido a que todos poseen como clase a "opcion_car", que es la caracteristica utilizada para ubicarlos dentro de la pagina.
            var lista_opciones = document.getElementsByClassName("opcion_car");

          /*Se utilizara una estructura ciclica "for" para recorrer la lista de los indices del carrito de compras, en busqueda de cual es el indice que posee el mismo identificador que el del boton presionado, y asi borrar el indice del mismo boton. 
          
          Dentro del "for" se aplica la estructura logica "if" en la cual se comprueba si el identificador del indice recorrido en el ciclo es el mismo que el del boton (hay que recodar que todos los botones tienen el mismo identificador que el indice en el cual se ubican); si el identificador es el mismo, se aplicara el metodo "removeChild()" para eliminar el indice que coincida, lo que tambien eliminara a todos los elementos que posea adentro, eliminando asi al producto de la lista del carrito.
          */
            for (var j = 0; j < lista_opciones.length; j++) {
              
              if (lista_opciones[j].id==id_boton_b) {
                Lista_car.removeChild(Lista_car.children[j+1])
              }
            }
        })
      //Se agregan a "texto_li" y a "borrar" nodos de texto, es decir, un texto sin ningun elemento incluido; en "texto_li" se le agregara a "boton_id" como texto, que como se explico antes, almacena el nombre del producto agregado al carrito.
        texto_li.appendChild(document.createTextNode(boton_id))
        borrar.appendChild(document.createTextNode("borrar"))

      /*A continuacion se utiliza una serie de metodos "appendChild()" para agregar elementos dentro de otros, siguiendo el orden en el que se realizan, se:
        1. Almacena a "borrar" en "boton_li"
        2. Almacena a "texto_li" en "elemento_li"
        3. Almacena a "boton_li" en "elemento_li"
      Siguiendo esta estructura, se almacena en "elemento_li" (aproximadamente) el siguiente codigo HTML (Se dejaran espacios a los lados en las partes que son determinadas por variables):
        <li id=" i " class="list-group-item opcion_car">
          <div> boton_id </div>
          <div><button id=" i " class="btn btn-default">borrar</button></div>
        </li>
      */
        boton_li.appendChild(borrar)
        elemento_li.appendChild(texto_li)
        elemento_li.appendChild(boton_li)

      //Se almacena en ultima posicion a "elemento_li" dentro de la lista de "Lista_car"
        Lista_car.appendChild(elemento_li)

      //Se aumenta el contador "i" en 1, de esta forma, todos los identificadores entre los indices y botones de borrar seran unicos por producto agregado al carrito
        i+=1
    }
