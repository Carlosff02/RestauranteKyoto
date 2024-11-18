
const sesionBtn = document.querySelector(".sesion-button");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const loginCheckbox = document.querySelector(".login-condicion input");
const registerCheckbox = document.querySelector(".register-check");
const registroBtn = document.querySelector(".btn-reg");
const loginInputs = document.querySelectorAll(".login-inputs input");
const registerInputs = document.querySelectorAll(".register-inputs input");
const btnFondos = document.querySelector(".fondos");
const btnMakis = document.querySelector(".makis")
const btnPostres = document.querySelector(".postres")
const btnRamen = document.querySelector(".ramen")
const btnTodos = document.querySelector(".todos")
const contenedorPlatillos = document.querySelector(".platillos")
const codigosPromo = ['A1234', 'B3456']
let nombreUsuario = ''

let descuento = 0;
let loggin = false;

  function cargarUsuario(){

  
  if(loggin==true){
    document.getElementById('sesion').style.display="none"
    document.getElementById("usuario-registrado").innerHTML=`Bienvenido ${nombreUsuario}`
  }
}
function guardarLoggin(){
  sessionStorage.setItem('logging', JSON.stringify(loggin));
  sessionStorage.setItem('usuario', JSON.stringify(nombreUsuario));
}
function guardarPedidos() {
  sessionStorage.setItem('pedidos', JSON.stringify(pedidos));
  sessionStorage.setItem('descuento', JSON.stringify(descuento));
  
}
function cargarLogging(){
  const loggingGuardado = sessionStorage.getItem('logging');
  const usuarioGuardado = sessionStorage.getItem('usuario')
  
      loggin = JSON.parse(loggingGuardado);
      nombreUsuario = JSON.parse(usuarioGuardado);
       // Actualiza la interfaz con los datos cargados
      
       if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/') ){
        cargarUsuario()
       }
       else{
        confirmarPedido()
       }
       
    
}
// Cargar los pedidos desde localStorage
function cargarPedido() {
  const pedidosGuardados = sessionStorage.getItem('pedidos');
  
  const descuentoGuardado = sessionStorage.getItem('descuento')
  if (pedidosGuardados) {
      pedidos = JSON.parse(pedidosGuardados);
      descuento = JSON.parse(descuentoGuardado);
       // Actualiza la interfaz con los datos cargados
       
       if (window.location.pathname.endsWith("/Pago/pago2.html")){
       cargarPedidos();}
       else{
        
        cargarTotal();
       }
    }
}

const usuarios = [
    { nombre:"Usuario1", email: "usuario1@gmail.com", password: "123456" },
    { nombre: "Usuario2", email: "usuario2@gmail.com", password: "123456" },
  ];
  var pedidos = {
    img:[],
    cantidad:[],
    nombre : [],
    precio : []
};




 let platos = {
     img :[
        './Platos/ramen.jpg', 
        './Platos/panceta.jpg', 
        './Platos/lomo-saltado.jpg',
         './Platos/pulpo-olivo.jpg'
 ],
     nombre: [
         'BATAYAKI RAMEN',
        'PANCETA NIKKEY',
         'LOMO SALTADO',
        'PULPO AL OLIVO'
    ],
     description: [
        'Fideos ramen con salsa de mantequilla picante, acompañado de huevo, hongos, zanahoria y holantao.',
        'Panceta de cerdo cocido a baja temperatura por 8 horas acompañado de puré de papa y gohan.',
         'Lomo Fino, cebolla roja, tomate, ají amarillo, frejol chino, cebolla china, culantro, papa amarilla frita, gohan.',
         'Pulpo, palta, salsa cremosa de olivo, leche de tigre, furikake, chalaquita, crocante de gyoza para dipear.'
    ],
    precio: [
        '45','55','45','32'
    ],
    categoria: [
        'ramen','fondos','fondos','fondos'
    ]
        
    

}

 
    
      


// LOGIN------------------>


if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/') ) {
  let contenido = document.getElementById('platillos');
       let ayuda = ''
      for(let i = 0; i < platos.nombre.length; i++){
        ayuda += `<div id="platillo" class="platillo" data-platillo="${platos.categoria[i]}">
                 <img src="${platos.img[i]}">
                 <div class="textoMenu">
                    <p>${platos.nombre[i]}</p>
                 <p>${platos.description[i]}</p>
                 <p>${platos.precio[i]}$</p>
                 <button onclick="agregarCarrito(${i})">+</button>
               </div>
                </div>`
                
        
      }
 
      
      if(ayuda!=''&& ayuda!=null){
        contenido.innerHTML = ayuda
      }
  cargarLogging()
  sesionBtn.addEventListener("click", function () {
    login.classList.add("open-login"); 
    
});
  // Ejecutar funciones específicas para esta página
  registroBtn.addEventListener("click", function (e) {
    e.preventDefault(); 
    login.classList.remove("open-login"); 
    register.classList.add("open-register"); 
});
  document.addEventListener('DOMContentLoaded', ()=>{
    platillos();
  })
  
  login.addEventListener("click", function (e) {
    if (e.target === login ) {
        login.classList.remove("open-login");
    }

});
register.addEventListener("click", function (e) {
  if (e.target === register ) {
      register.classList.remove("open-register");
  }
});
// Validar login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = loginInputs[0].value.trim();
  const password = loginInputs[1].value.trim();

  // Validaciones
  if (!email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (!esEmailValido(email)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }

  if (!loginCheckbox.checked) {
    alert("Debes aceptar los términos y condiciones.");
    return;
  }

  const usuario = usuarios.find((user) => user.email === email && user.password === password);

  if (usuario) {
    alert(`¡Bienvenido!`);
    login.classList.remove("open-login");
    loginForm.reset(); 
    loggin = true;
    
    nombreUsuario = usuario.nombre
    guardarLoggin()
    document.getElementById('sesion').style.display="none"
    document.getElementById("usuario-registrado").innerHTML=`Bienvenido ${usuario.nombre}`
    
    
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

// Registro de un nuevo usuario
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = registerInputs[0].value.trim();
  const email = registerInputs[1].value.trim();
  const password = registerInputs[2].value.trim();

  
  if (!nombre || !email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (!esEmailValido(email)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }

  if (password.length < 5) {
    alert("La contraseña debe tener al menos 5 caracteres.");
    return;
  }

  if (!registerCheckbox.checked) {
    alert("Debes aceptar los términos y condiciones.");
    return;
  }

  const usuarioExistente = usuarios.find((user) => user.email === email);

  if (usuarioExistente) {
    alert("Este correo ya está registrado, intenta iniciar sesión.");
  } else {
    usuarios.push({ nombre, email, password });
    alert(`Gracias por unirte, ${nombre}!`);
    register.classList.remove("open-register");
    loggin = true;
    nombreUsuario=nombre;
    document.getElementById('sesion').style.display="none"
    document.getElementById("usuario-registrado").innerHTML=`Bienvenido ${nombre}`
    guardarLoggin()
    registerForm.reset(); 
    
  }
});
window.addEventListener('load', actualizarContenido);

// Llamar a la función cada vez que la ventana se redimensiones
window.addEventListener('resize', actualizarContenido);

}





// Cerrar registro al hacer clic fuera del cuadro o en el botón cerrar


const platillos = () => {
    platillosArray = [];
    const platillos = document.querySelectorAll('.platillo')
    
    platillos.forEach(platillo=> platillosArray = [...platillosArray, platillo])
    
    const fondos = platillosArray.filter(fondos => fondos.getAttribute('data-platillo') === 'fondos');
    const makis = platillosArray.filter(makis => makis.getAttribute('data-platillo') === 'makis');
    const postres = platillosArray.filter(postres => postres.getAttribute('data-platillo') === 'postres');
    const ramen = platillosArray.filter(ramen => ramen.getAttribute('data-platillo') === 'ramen');

    mostrarPlatillo(fondos, makis, postres, ramen, platillosArray);
}

const mostrarPlatillo = (fondos, makis, postres, ramen, todos) =>{

    btnFondos.addEventListener('click', () =>{
        limpiar(contenedorPlatillos)
        
        fondos.forEach(fondo=> contenedorPlatillos.appendChild(fondo));
    })
    btnMakis.addEventListener('click', () =>{
        limpiar(contenedorPlatillos)
        
        makis.forEach(maki=> contenedorPlatillos.appendChild(maki));
    })
    btnPostres.addEventListener('click', () =>{
      
        limpiar(contenedorPlatillos)
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    })
    btnRamen.addEventListener('click', () =>{
        limpiar(contenedorPlatillos)
        ramen.forEach(ramens=> contenedorPlatillos.appendChild(ramens));
    })
    btnTodos.addEventListener('click', () =>{
        limpiar(contenedorPlatillos)
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    })
}

const limpiar = (contenedor) => {
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

document.querySelectorAll('.plato img').forEach(img => {
    img.addEventListener('click', function() {
        // Remueve la clase active
        document.querySelectorAll('.plato img').forEach(img => img.classList.remove('active'));
        
        // Añade la clase active
        this.classList.add('active');
    });
});


let precio = document.getElementById('verPedido')
let valor = 0;

function agregarCarrito(i){
    
    
    const carrito = document.getElementById('carrito')
    carrito.style.display='flex'
    const existe = pedidos.nombre.includes(platos.nombre[i]);
    const indice = pedidos.nombre.indexOf(platos.nombre[i]);
    
    
    if(existe){
        pedidos.cantidad[indice]+=1;
     actualizarPedido();
     guardarPedidos()
    }
    else{

    pedidos.img.push(platos.img[i])
    pedidos.cantidad.push(1) 
    pedidos.nombre.push(platos.nombre[i])
    pedidos.precio.push(platos.precio[i])
    actualizarPedido();
    guardarPedidos(); // Guardar cambios
    
}

    
    /*valor = parseInt(valor)+parseInt(pedidos.precio[i]);
    precio.textContent =  valor*/
}

function actualizarPedido(){
    const div = document.getElementById('carrito');
    
    if (window.innerWidth < 1200) {
        let cantidades = 0
        let precios = 0
        for(let i = 0; i < pedidos.cantidad.length;i++){
            cantidades = parseFloat(pedidos.cantidad[i])*pedidos.precio[i]
            precios = parseFloat(precios)+parseFloat(cantidades) 
        }
        
         
      div.innerHTML = `
      <a class="enlaceCarrito" href="./Pago/pago2.html"><button class="pedidos">Ver mi pedido<span class="buttonSpan">S/${precios}</span></button></a>`;
    }else{
    let ayudas = ''
      for(let i = 0; i < pedidos.nombre.length; i++){
        ayudas += `<div  class="pedidos">
                 
                 
                  <p class="cantidadPedido"><button onclick="cambiarPrecio(${i},'-')" class="disminuirPrecio">-</button>${pedidos.cantidad[i]}<button onclick="cambiarPrecio(${i},'+')" class="disminuirPrecio">+</button></p>
                    <p class="nombrePedido">${pedidos.nombre[i]}</p>
                
                 <p class="precioPedido">S/${pedidos.precio[i]*pedidos.cantidad[i]}</p>
                 
               
                </div>`
                
            }
            precio.innerHTML = ayudas
        
      }
      
}

function cambiarPrecio(indice, valor){
    if(valor == "-"){
        if(pedidos.cantidad[indice]!=1){
            pedidos.cantidad[indice]-=1;
            
            actualizarPedido();
        }
        
    }
    else{
        pedidos.cantidad[indice]+=1; 
        
        actualizarPedido();
    }
}


function actualizarContenido() {
    const div = document.getElementById('carrito');
  
    if (window.innerWidth < 1200) {
        actualizarPedido();
    } else {
      div.innerHTML = `
      <h1>Mi pedido</h1>
    <div class="verPedido" id="verPedido">
      
    
      
    </div>
    <a class="enlaceCarrito" href="./Pago/pago2.html"><button onclick="cargarPedidos()"  class="buttonCarrito">Continuar</button></a>
  `;
  precio = document.getElementById('verPedido')
  actualizarPedido()
    }
  }

// FORMULARIO --------------->

function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }



  const lisaPedidos = document.getElementById("articulosCarrito");
  let pedidosCargado = "";
  let total=0;
  const totalPedidos = document.getElementById("total-pedido")
  const subtotalPedidos = document.getElementById("subtotal-pedido")
  function cargarPedidos(){
    total=0
    pedidosCargado = "";
      for(let i =0; i < pedidos.nombre.length; i++){
          total+=pedidos.precio[i]*pedidos.cantidad[i]
          pedidosCargado+=`<tr>
                      <td><img src=".${pedidos.img[i]}" width="10%" height="10%"></td>                
                      <td>${pedidos.nombre[i]}</td>                
                      <td>S/${pedidos.precio[i]}</td>                
                      <td><a class="pedido-enlace" onclick="disminuirCantidad(${i})">-</a> ${pedidos.cantidad[i]} <a onclick="aumentarCantidad(${i})" class="pedido-enlace">+</a></td>                
                      <td>S/${pedidos.precio[i]*pedidos.cantidad[i]}</td>                
                      <td><a class="pedido-enlace" onclick="eliminarPedido(${i})">X</a></td>                
                  </tr>`
      }
  
  lisaPedidos.innerHTML= pedidosCargado
  subtotalPedidos.innerText =  `S/${total}`
  totalPedidos.innerText = `S/${total-descuento}`
  }
  function cargarTotal(){
    total=0
    for(let i =0; i < pedidos.nombre.length; i++){
      total+=pedidos.precio[i]*pedidos.cantidad[i]
  }
  subtotalPedidos.innerText = `S/${total}`
   totalPedidos.innerText = `S/${total-descuento}`
}
  function eliminarPedido(valor){
    pedidos.nombre.splice(valor, 1);
    pedidos.img.splice(valor, 1);
    pedidos.precio.splice(valor, 1);
    pedidos.cantidad.splice(valor, 1);
    
    guardarPedidos();
    cargarPedidos();
  }
function aumentarCantidad(valor){
  pedidos.cantidad[valor]+=1
  guardarPedidos();
    cargarPedidos();
}
function disminuirCantidad(valor){
  if(pedidos.cantidad[valor]>1){
    pedidos.cantidad[valor]-=1
  guardarPedidos();
    cargarPedidos();
  }
  
}
  
  if ( window.location.pathname.endsWith("/Pago/pago2.html")) {
    // Ejecutar funciones específicas para esta página
    document.addEventListener('DOMContentLoaded', ()=>{
      cargarPedido();
      
    })
}
function aplicarDescuento(){
  const codigo = document.getElementById('codigo').value
  
  if(codigosPromo.find((desc) => desc === codigo)){
    descuento = 15
    guardarPedidos()
    cargarPedidos()
  }
  else{
    alert("Codigo invalido")
  }
}
function confirmarPedido(){
  
  if(pedidos.nombre.length>0&&loggin!=null){
    alert("Su pedido ha quedado registrado")
    window.location.href='pago1.html'
  }
  else if(loggin==null){
    alert("Registrese Primero")
  }
  else{
    alert("No ha agregado ningún pedido")
  }
  
}
  
  
  
